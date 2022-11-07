import jen, { format } from "../mod.ts";
import * as data from "./common/data.ts";
import { sortedEntryValues } from "./common/util.ts";

await Deno.writeTextFile(
  data.jsout,
  await format(
    jen.statements(
      jen.const.id("p").op("=").obj(
        ...sortedEntryValues([
          ...data.keywords.map(([keyword]): [string, jen.Expr] => [
            keyword,
            jen.prop(
              (data.computedNames.has(keyword) ? jen.index : jen.id)(keyword),
              jen.obj(
                jen.id("get").params().block(
                  jen.return(
                    jen.id("extend").params(jen.this, jen.lit(keyword)),
                  ),
                ),
              ),
            ),
          ]),
          ...data.groups.map(([groupName, group]): [string, jen.Expr] => [
            groupName,
            jen.prop(
              jen.id(groupName),
              jen.obj(
                jen.id("value").params(
                  ...(group.parameters ?? []).map(
                    (paramName, index, parameters) =>
                      (group.variadic && parameters.length === index + 1
                        ? jen.op("...")
                        : jen).id(paramName.split(/\??:/)[0]),
                  ),
                ).block(
                  jen.return().id("extend").params(
                    jen.this,
                    ...([
                      group.before &&
                      jen.lit(group.before + (group.multi ? "\n" : "")),
                      ...((group.parameters ?? []).flatMap(
                        (
                          paramName,
                          index,
                          params,
                        ): Array<jen.Expr | false | undefined | ""> => {
                          let expr = jen.id(paramName.split(/\??:/)[0]);
                          const separator = (group.separator || group.multi) &&
                              (Array.isArray(group.separator)
                                ? group
                                  .separator[
                                    Math.min(
                                      index,
                                      group.separator.length - 1,
                                    )
                                  ]
                                : group.separator) || "";
                          if (group.variadic && params.length === index + 1) {
                            if (separator) {
                              expr = expr.dot("join").params(
                                jen.lit(
                                  " " + separator + (group.multi ? "\n" : " "),
                                ),
                              );
                            } else {
                              expr = jen.spread(expr);
                            }

                            return [expr];
                          }

                          if (params.length === index + 1 || !separator) {
                            return [expr];
                          }

                          return [
                            expr,
                            jen.lit(separator),
                          ];
                        },
                      )),
                      group.after &&
                      jen.lit((group.multi ? "\n" : "") + group.after),
                    ].filter(Boolean) as jen.Expr[]),
                  ),
                ),
              ),
            ),
          ]),
          [
            "literal",
            jen.prop(
              jen.id("literal"),
              jen.obj(
                jen.id("value").params(jen.id("value")).block(
                  jen.if(jen.id("value").op("===").undefined).block(
                    jen.return(
                      jen.id("extend").params(jen.this, jen.lit("undefined")),
                    ),
                  ),
                  jen.if(jen.typeof(jen.id("value")).op("===").lit("bigint"))
                    .block(
                      jen.return(
                        jen.id("extend").params(
                          jen.this,
                          jen.id("value").dot("toString").params().op("+").lit(
                            "n",
                          ),
                        ),
                      ),
                    ),
                  jen.if(jen.id("value").instanceof.id("RegExp")).block(
                    jen.return(
                      jen.id("extend").params(
                        jen.this,
                        jen.id("value").dot("toString").params(),
                      ),
                    ),
                  ),
                  jen.return(
                    jen.id("extend").params(
                      jen.this,
                      jen.id("JSON").dot("stringify").params(jen.id("value")),
                    ),
                  ),
                ),
              ),
            ),
          ],
          [
            "brackets",
            jen.prop(
              jen.id("brackets"),
              jen.obj(
                jen.id("value").params(jen.id("expr")).block(
                  jen.return(
                    jen.id("extend").params(
                      jen.this,
                      jen.lit("["),
                      jen.cond(
                        jen.typeof(jen.id("expr")).op("===").lit("object"),
                        jen.id("expr"),
                        jen.id("JSON").dot("stringify").params(jen.id("expr")),
                      ),
                      jen.lit("]"),
                    ),
                  ),
                ),
              ),
            ),
          ],
          [
            "trivia",
            jen.prop(
              jen.id("trivia"),
              jen.obj(
                jen.id("value").params(jen.id("text")).block(
                  jen.return(
                    jen.id("extend").params(
                      jen.this,
                      jen.lit("\n"),
                      jen.id("trivia").call(jen.id("text")),
                      jen.lit("\n"),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ]),
      ),
      ...sortedEntryValues(
        data.groups.flatMap(
          ([groupName, { aliases }]) =>
            (aliases ?? []).map((alias): [string, jen.Expr] => [
              alias,
              jen.id("p").dot(alias).op("=").id("p").dot(groupName),
            ]),
        ),
      ),
      jen.const.id("extend").op("=").arrow(
        jen.id("expr"),
        jen.op("...").id("extensions"),
      ).block(
        jen.const.id("code").op("=").parens(
          jen.ternary(
            jen.id("expr").op("&&").id("Object").dot("hasOwn").params(
              jen.id("expr"),
              jen.lit("toString"),
            ),
            jen.id("expr").op("+").lit(" "),
            jen.lit(""),
          ),
        ).op("+").id("extensions").dot("filter").params(jen.id("Boolean"))
          .dot("join").params(jen.lit(" ")),
        jen.return(
          jen.id("Object").dot("defineProperties").params(
            jen.obj(
              jen.prop(
                "toString",
                jen.arrow().id("code"),
              ),
            ),
            jen.id("p"),
          ),
        ),
      ),
      jen.const.id("trivia").op("=").arrow(jen.id("s")).cond(
        jen.parens(
          jen.id("Array").dot("isArray").params(jen.id("s")).op("||").parens(
            jen.id("s").op("=").id("s").dot("split").params(jen.lit("\n")),
          ).dot("length").op(">").lit(1),
        ),
        jen.lit("/**\n* ").op("+").id("s").dot("join").params(jen.lit("\n* "))
          .op("+").lit("\n*/"),
        jen.lit("// ").op("+").id("s").index(0),
      ),
      jen.export.const.id("jen").op("=").id("extend").params(jen.obj()),
    ).toString(),
    true,
  ),
);

await Deno.writeTextFile(
  data.dtsout,
  await format(
    jen.statements(
      jen.declare.const.prop("tag", jen.unique.symbol),
      jen.export.interface.id("Expr").block(
        jen.readonly.prop(jen.computed(jen.id("tag")), jen.unknown),
        ...sortedEntryValues<jen.Expr>([
          ...data.keywords.map(
            ([keyword]): [string, jen.Expr] => [
              keyword,
              jen.comment([`use for ${keyword} keyword`]).readonly.prop(
                (data.computedNames.has(keyword) ? jen.index : jen.id)(
                  keyword,
                ),
                jen.id("Expr"),
              ),
            ],
          ),
          // groups must be after keywords to override conflicting names
          ...data.groups.flatMap(
            ([groupName, group]) =>
              [groupName, ...(group.aliases ?? [])].map(
                (name): [string, jen.Expr] => [
                  name,
                  jen.comment([group.comment]).append(
                    (data.computedNames.has(name) ? jen.index : jen.id)(name),
                  )
                    .params(
                      ...(group.parameters ?? []).map((name) => name.split(":"))
                        .map((
                          [name, type],
                        ): [string, jen.Expr, boolean] => [
                          name.replace(/\?$/, ""),
                          jen.id(type || "Expr"),
                          name.endsWith("?"),
                        ]).map(
                          ([name, type, optional], index, parameters) =>
                            ((group.variadic &&
                                parameters.length === index + 1)
                              ? jen.op("...")
                              : jen).prop(
                                jen.id(name).add(
                                  ...optional ? [jen.op("?")] : [],
                                ),
                                type.append(
                                  ...group.variadic &&
                                      parameters.length === index + 1
                                    ? [jen.array()]
                                    : [],
                                ),
                              ),
                        ),
                    ).op(":").id("Expr"),
                ],
              ),
          ),
          ...data.groupNames("operator").map((
            name,
          ): [string, jen.Expr] => [
            name,
            jen.comment([data.groupByName("operator").comment]).id(name).params(
              jen.prop(
                "op",
                jen.union(
                  ...data.operators.map(([operator]) => jen.lit(operator)),
                ),
              ),
            ).op(":").id("Expr"),
          ]),
        ]),
        jen.id("toString").params().op(":").string,
      ),
      jen.export.declare.const.prop(
        "jen",
        jen.id("Omit").types(jen.id("Expr"), jen.typeof(jen.id("tag"))),
      ),
      jen.export.namespace.id("jen").block(
        jen.export.obj(
          jen.id("Expr"),
        ),
      ),
    ).toString(),
    true,
  ),
);
