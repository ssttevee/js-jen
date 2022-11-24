import ts from "typescript";
import { format } from "../format.ts";
import * as data from "./common/data.ts";
import { sortedEntryValues } from "./common/util.ts";

const { factory } = ts;

// TODO: document this
// bootstrap:
await Deno.writeTextFile(
  data.jsout,
  await format(
    ts.createPrinter().printList(
      ts.ListFormat.MultiLine,
      factory.createNodeArray([
        factory.createVariableStatement(
          undefined,
          factory.createVariableDeclarationList([
            factory.createVariableDeclaration(
              "p",
              undefined,
              undefined,
              factory.createObjectLiteralExpression(
                sortedEntryValues(
                  [
                    ...data.keywords.map(
                      (
                        [keyword],
                      ): [string, ts.ObjectLiteralElementLike] => [
                        keyword,
                        factory.createPropertyAssignment(
                          data.computedNames.has(keyword)
                            ? factory.createComputedPropertyName(
                              factory.createStringLiteral(keyword),
                            )
                            : factory.createIdentifier(keyword),
                          factory.createObjectLiteralExpression(
                            [factory.createMethodDeclaration(
                              undefined,
                              undefined,
                              factory.createIdentifier("get"),
                              undefined,
                              undefined,
                              [],
                              undefined,
                              factory.createBlock(
                                [factory.createReturnStatement(
                                  factory.createCallExpression(
                                    factory.createIdentifier("extend"),
                                    undefined,
                                    [
                                      factory.createThis(),
                                      factory.createStringLiteral(
                                        keyword,
                                      ),
                                    ],
                                  ),
                                )],
                                true,
                              ),
                            )],
                            true,
                          ),
                        ),
                      ],
                    ),
                    // groups must be after keywords to override conflicting names
                    ...data.groups.map(
                      (
                        [groupName, group],
                      ): [string, ts.ObjectLiteralElementLike] => [
                        groupName,
                        factory.createPropertyAssignment(
                          groupName,
                          factory.createObjectLiteralExpression(
                            [factory.createMethodDeclaration(
                              undefined,
                              undefined,
                              "value",
                              undefined,
                              undefined,
                              (group.parameters ?? []).map(
                                (name, index, parameters) =>
                                  factory.createParameterDeclaration(
                                    undefined,
                                    group.variadic &&
                                      parameters.length === index + 1
                                      ? factory.createToken(
                                        ts.SyntaxKind.DotDotDotToken,
                                      )
                                      : undefined,
                                    name.split(/\??:/)[0],
                                  ),
                              ),
                              undefined,
                              factory.createBlock(
                                [
                                  factory.createReturnStatement(
                                    factory.createCallExpression(
                                      factory.createIdentifier("extend"),
                                      undefined,
                                      [
                                        factory.createThis(),
                                        ...([
                                          group.before &&
                                          factory.createStringLiteral(
                                            group.before +
                                              (group.multi ? "\n" : ""),
                                          ),
                                          ...((group.parameters ?? [])
                                            .flatMap(
                                              (
                                                name,
                                                index,
                                                parameters,
                                              ): Array<
                                                | ts.Expression
                                                | false
                                                | undefined
                                                | ""
                                              > =>
                                                (group.variadic &&
                                                    parameters.length ===
                                                      index + 1)
                                                  ? [
                                                    (group.separator ||
                                                        group.multi)
                                                      ? factory
                                                        .createCallExpression(
                                                          factory
                                                            .createPropertyAccessExpression(
                                                              factory
                                                                .createIdentifier(
                                                                  name
                                                                    .split(
                                                                      /\??:/,
                                                                    )[0],
                                                                ),
                                                              "join",
                                                            ),
                                                          undefined,
                                                          [factory
                                                            .createStringLiteral(
                                                              ` ${
                                                                Array.isArray(
                                                                    group
                                                                      .separator,
                                                                  )
                                                                  ? group
                                                                    .separator[
                                                                      group
                                                                        .separator
                                                                        .length -
                                                                      1
                                                                    ]
                                                                  : group
                                                                    .separator ||
                                                                    ""
                                                              }${
                                                                group.multi
                                                                  ? "\n"
                                                                  : " "
                                                              }`,
                                                            )],
                                                        )
                                                      : factory
                                                        .createSpreadElement(
                                                          factory
                                                            .createIdentifier(
                                                              name.split(
                                                                /\??:/,
                                                              )[0],
                                                            ),
                                                        ),
                                                  ]
                                                  : [
                                                    factory
                                                      .createIdentifier(
                                                        name.split(
                                                          /\??:/,
                                                        )[0],
                                                      ),
                                                    (group.separator ||
                                                      group.multi) &&
                                                    parameters.length !==
                                                      index + 1 &&
                                                    factory
                                                      .createStringLiteral(
                                                        `${
                                                          Array.isArray(
                                                              group.separator,
                                                            )
                                                            ? group
                                                              .separator[index]
                                                            : group.separator ||
                                                              ""
                                                        }${
                                                          group.multi
                                                            ? "\n"
                                                            : ""
                                                        }`,
                                                      ),
                                                  ],
                                            )),
                                          group.after &&
                                          factory.createStringLiteral(
                                            (group.multi ? "\n" : "") +
                                              group.after,
                                          ),
                                        ].filter(
                                          Boolean,
                                        ) as ts.Expression[]),
                                      ],
                                    ),
                                  ),
                                ],
                                true,
                              ),
                            )],
                            true,
                          ),
                        ),
                      ],
                    ),
                    [
                      "literal",
                      factory.createPropertyAssignment(
                        "literal",
                        factory.createObjectLiteralExpression(
                          [factory.createMethodDeclaration(
                            undefined,
                            undefined,
                            factory.createIdentifier("value"),
                            undefined,
                            undefined,
                            [factory.createParameterDeclaration(
                              undefined,
                              undefined,
                              factory.createIdentifier("value"),
                              undefined,
                              undefined,
                              undefined,
                            )],
                            undefined,
                            factory.createBlock(
                              [
                                factory.createIfStatement(
                                  factory.createBinaryExpression(
                                    factory.createIdentifier("value"),
                                    factory.createToken(
                                      ts.SyntaxKind.EqualsEqualsEqualsToken,
                                    ),
                                    factory.createIdentifier("undefined"),
                                  ),
                                  factory.createReturnStatement(
                                    factory.createCallExpression(
                                      factory.createIdentifier("extend"),
                                      undefined,
                                      [
                                        factory.createThis(),
                                        factory.createStringLiteral(
                                          "undefined",
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                factory.createIfStatement(
                                  factory.createBinaryExpression(
                                    factory.createTypeOfExpression(
                                      factory.createIdentifier("value"),
                                    ),
                                    factory.createToken(
                                      ts.SyntaxKind.EqualsEqualsEqualsToken,
                                    ),
                                    factory.createStringLiteral("bigint"),
                                  ),
                                  factory.createReturnStatement(
                                    factory.createCallExpression(
                                      factory.createIdentifier("extend"),
                                      undefined,
                                      [
                                        factory.createThis(),
                                        factory.createBinaryExpression(
                                          factory.createCallExpression(
                                            factory
                                              .createPropertyAccessExpression(
                                                factory.createIdentifier(
                                                  "value",
                                                ),
                                                factory.createIdentifier(
                                                  "toString",
                                                ),
                                              ),
                                            undefined,
                                            [],
                                          ),
                                          factory.createToken(
                                            ts.SyntaxKind.PlusToken,
                                          ),
                                          factory.createStringLiteral("n"),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                factory.createIfStatement(
                                  factory.createBinaryExpression(
                                    factory.createIdentifier("value"),
                                    factory.createToken(
                                      ts.SyntaxKind.InstanceOfKeyword,
                                    ),
                                    factory.createIdentifier("RegExp"),
                                  ),
                                  factory.createReturnStatement(
                                    factory.createCallExpression(
                                      factory.createIdentifier("extend"),
                                      undefined,
                                      [
                                        factory.createThis(),
                                        factory.createCallExpression(
                                          factory
                                            .createPropertyAccessExpression(
                                              factory.createIdentifier("value"),
                                              factory.createIdentifier(
                                                "toString",
                                              ),
                                            ),
                                          undefined,
                                          [],
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                factory.createReturnStatement(
                                  factory.createCallExpression(
                                    factory.createIdentifier("extend"),
                                    undefined,
                                    [
                                      factory.createThis(),
                                      factory.createCallExpression(
                                        factory.createPropertyAccessExpression(
                                          factory.createIdentifier("JSON"),
                                          factory.createIdentifier("stringify"),
                                        ),
                                        undefined,
                                        [factory.createIdentifier("value")],
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                              true,
                            ),
                          )],
                          true,
                        ),
                      ),
                    ],
                    [
                      "brackets",
                      factory.createPropertyAssignment(
                        "brackets",
                        factory.createObjectLiteralExpression(
                          [factory.createMethodDeclaration(
                            undefined,
                            undefined,
                            factory.createIdentifier("value"),
                            undefined,
                            undefined,
                            [factory.createParameterDeclaration(
                              undefined,
                              undefined,
                              factory.createIdentifier("expr"),
                              undefined,
                              undefined,
                              undefined,
                            )],
                            undefined,
                            factory.createBlock(
                              [
                                factory.createReturnStatement(
                                  factory.createCallExpression(
                                    factory.createIdentifier("extend"),
                                    undefined,
                                    [
                                      factory.createThis(),
                                      factory.createStringLiteral("["),
                                      factory.createParenthesizedExpression(
                                        factory.createConditionalExpression(
                                          factory.createBinaryExpression(
                                            factory.createTypeOfExpression(
                                              factory.createIdentifier("expr"),
                                            ),
                                            factory.createToken(
                                              ts.SyntaxKind
                                                .EqualsEqualsEqualsToken,
                                            ),
                                            factory.createStringLiteral(
                                              "object",
                                            ),
                                          ),
                                          factory.createToken(
                                            ts.SyntaxKind.QuestionToken,
                                          ),
                                          factory.createIdentifier("expr"),
                                          factory.createToken(
                                            ts.SyntaxKind.ColonToken,
                                          ),
                                          factory.createCallExpression(
                                            factory
                                              .createPropertyAccessExpression(
                                                factory.createIdentifier(
                                                  "JSON",
                                                ),
                                                factory.createIdentifier(
                                                  "stringify",
                                                ),
                                              ),
                                            undefined,
                                            [factory.createIdentifier("expr")],
                                          ),
                                        ),
                                      ),
                                      factory.createStringLiteral("]"),
                                    ],
                                  ),
                                ),
                              ],
                              true,
                            ),
                          )],
                          true,
                        ),
                      ),
                    ],
                    [
                      "trivia",
                      factory.createPropertyAssignment(
                        "trivia",
                        factory.createObjectLiteralExpression(
                          [factory.createMethodDeclaration(
                            undefined,
                            undefined,
                            factory.createIdentifier("value"),
                            undefined,
                            undefined,
                            [factory.createParameterDeclaration(
                              undefined,
                              undefined,
                              factory.createIdentifier("text"),
                              undefined,
                              undefined,
                              undefined,
                            )],
                            undefined,
                            factory.createBlock(
                              [
                                factory.createReturnStatement(
                                  factory.createCallExpression(
                                    factory.createIdentifier("extend"),
                                    undefined,
                                    [
                                      factory.createThis(),
                                      factory.createStringLiteral("\n"),
                                      factory.createCallExpression(
                                        factory.createIdentifier(
                                          "trivia",
                                        ),
                                        undefined,
                                        [factory.createIdentifier("text")],
                                      ),
                                      factory.createStringLiteral("\n"),
                                    ],
                                  ),
                                ),
                              ],
                              true,
                            ),
                          )],
                          true,
                        ),
                      ),
                    ],
                  ],
                ),
                true,
              ),
            ),
          ], ts.NodeFlags.Const),
        ),
        ...data.groups.flatMap(
          ([groupName, { aliases }]) =>
            (aliases ?? []).map((alias): [string, ts.Statement] => [
              alias,
              factory.createExpressionStatement(
                factory.createAssignment(
                  factory.createPropertyAccessExpression(
                    factory.createIdentifier("p"),
                    factory.createIdentifier(alias),
                  ),
                  factory.createPropertyAccessExpression(
                    factory.createIdentifier("p"),
                    factory.createIdentifier(groupName),
                  ),
                ),
              ),
            ]),
        ).sort(([a], [b]) => a.localeCompare(b)).map(([, node]) => node),
        factory.createVariableStatement(
          undefined,
          factory.createVariableDeclarationList(
            [factory.createVariableDeclaration(
              factory.createIdentifier("extend"),
              undefined,
              undefined,
              factory.createArrowFunction(
                undefined,
                undefined,
                [
                  factory.createParameterDeclaration(
                    undefined,
                    undefined,
                    factory.createIdentifier("expr"),
                  ),
                  factory.createParameterDeclaration(
                    undefined,
                    factory.createToken(ts.SyntaxKind.DotDotDotToken),
                    factory.createIdentifier("extensions"),
                  ),
                ],
                undefined,
                factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                factory.createBlock(
                  [
                    factory.createVariableStatement(
                      undefined,
                      factory.createVariableDeclarationList(
                        [factory.createVariableDeclaration(
                          factory.createIdentifier("code"),
                          undefined,
                          undefined,
                          factory.createBinaryExpression(
                            factory.createParenthesizedExpression(
                              factory.createConditionalExpression(
                                factory.createBinaryExpression(
                                  factory.createIdentifier("expr"),
                                  factory.createToken(
                                    ts.SyntaxKind.AmpersandAmpersandToken,
                                  ),
                                  factory.createCallExpression(
                                    factory.createPropertyAccessExpression(
                                      factory.createIdentifier("Object"),
                                      factory.createIdentifier("hasOwn"),
                                    ),
                                    undefined,
                                    [
                                      factory.createIdentifier("expr"),
                                      factory.createStringLiteral("toString"),
                                    ],
                                  ),
                                ),
                                factory.createToken(
                                  ts.SyntaxKind.QuestionToken,
                                ),
                                factory.createBinaryExpression(
                                  factory.createIdentifier("expr"),
                                  factory.createToken(ts.SyntaxKind.PlusToken),
                                  factory.createStringLiteral(" "),
                                ),
                                factory.createToken(ts.SyntaxKind.ColonToken),
                                factory.createStringLiteral(""),
                              ),
                            ),
                            factory.createToken(ts.SyntaxKind.PlusToken),
                            factory.createCallExpression(
                              factory.createPropertyAccessExpression(
                                factory.createCallExpression(
                                  factory.createPropertyAccessExpression(
                                    factory.createIdentifier("extensions"),
                                    factory.createIdentifier("filter"),
                                  ),
                                  undefined,
                                  [factory.createIdentifier("Boolean")],
                                ),
                                factory.createIdentifier("join"),
                              ),
                              undefined,
                              [factory.createStringLiteral(" ")],
                            ),
                          ),
                        )],
                        ts.NodeFlags.Const,
                      ),
                    ),
                    factory.createReturnStatement(factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        factory.createIdentifier("Object"),
                        factory.createIdentifier("defineProperties"),
                      ),
                      undefined,
                      [
                        factory.createObjectLiteralExpression(
                          [factory.createPropertyAssignment(
                            factory.createIdentifier("toString"),
                            factory.createArrowFunction(
                              undefined,
                              undefined,
                              [],
                              undefined,
                              factory.createToken(
                                ts.SyntaxKind.EqualsGreaterThanToken,
                              ),
                              factory.createIdentifier("code"),
                            ),
                          )],
                          true,
                        ),
                        factory.createIdentifier("p"),
                      ],
                    )),
                  ],
                  true,
                ),
              ),
            )],
            ts.NodeFlags.Const,
          ),
        ),
        factory.createVariableStatement(
          undefined,
          factory.createVariableDeclarationList(
            [factory.createVariableDeclaration(
              factory.createIdentifier("trivia"),
              undefined,
              undefined,
              factory.createArrowFunction(
                undefined,
                undefined,
                [factory.createParameterDeclaration(
                  undefined,
                  undefined,
                  factory.createIdentifier("s"),
                  undefined,
                  undefined,
                  undefined,
                )],
                undefined,
                factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                factory.createConditionalExpression(
                  factory.createParenthesizedExpression(
                    factory.createBinaryExpression(
                      factory.createCallExpression(
                        factory.createPropertyAccessExpression(
                          factory.createIdentifier("Array"),
                          factory.createIdentifier("isArray"),
                        ),
                        undefined,
                        [factory.createIdentifier("s")],
                      ),
                      factory.createToken(ts.SyntaxKind.BarBarToken),
                      factory.createBinaryExpression(
                        factory.createPropertyAccessExpression(
                          factory.createParenthesizedExpression(
                            factory.createBinaryExpression(
                              factory.createIdentifier("s"),
                              factory.createToken(ts.SyntaxKind.EqualsToken),
                              factory.createCallExpression(
                                factory.createPropertyAccessExpression(
                                  factory.createIdentifier("s"),
                                  factory.createIdentifier("split"),
                                ),
                                undefined,
                                [factory.createStringLiteral("\n")],
                              ),
                            ),
                          ),
                          factory.createIdentifier("length"),
                        ),
                        factory.createToken(ts.SyntaxKind.GreaterThanToken),
                        factory.createNumericLiteral("1"),
                      ),
                    ),
                  ),
                  factory.createToken(ts.SyntaxKind.QuestionToken),
                  factory.createBinaryExpression(
                    factory.createBinaryExpression(
                      factory.createStringLiteral("/**\n* "),
                      factory.createToken(ts.SyntaxKind.PlusToken),
                      factory.createCallExpression(
                        factory.createPropertyAccessExpression(
                          factory.createIdentifier("s"),
                          factory.createIdentifier("join"),
                        ),
                        undefined,
                        [factory.createStringLiteral("\n* ")],
                      ),
                    ),
                    factory.createToken(ts.SyntaxKind.PlusToken),
                    factory.createStringLiteral("\n*/"),
                  ),
                  factory.createToken(ts.SyntaxKind.ColonToken),
                  factory.createBinaryExpression(
                    factory.createStringLiteral("// "),
                    factory.createToken(ts.SyntaxKind.PlusToken),
                    factory.createElementAccessExpression(
                      factory.createIdentifier("s"),
                      factory.createNumericLiteral("0"),
                    ),
                  ),
                ),
              ),
            )],
            ts.NodeFlags.Const,
          ),
        ),
        factory.createVariableStatement(
          [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          factory.createVariableDeclarationList([
            factory.createVariableDeclaration(
              "jen",
              undefined,
              undefined,
              factory.createCallExpression(
                factory.createIdentifier("extend"),
                undefined,
                [factory.createObjectLiteralExpression([])],
              ),
            ),
          ], ts.NodeFlags.Const),
        ),
      ]),
      ts.createSourceFile(
        data.jsout,
        "",
        ts.ScriptTarget.Latest,
        false,
        ts.ScriptKind.TS,
      ),
    ),
  ),
);

await Deno.writeTextFile(
  data.dtsout,
  await format(
    ts.createPrinter().printList(
      ts.ListFormat.MultiLine,
      factory.createNodeArray([
        factory.createVariableStatement(
          [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
          factory.createVariableDeclarationList(
            [factory.createVariableDeclaration(
              factory.createIdentifier("tag"),
              undefined,
              factory.createTypeOperatorNode(
                ts.SyntaxKind.UniqueKeyword,
                factory.createKeywordTypeNode(ts.SyntaxKind.SymbolKeyword),
              ),
            )],
            ts.NodeFlags.Const,
          ),
        ),
        factory.createInterfaceDeclaration(
          [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          factory.createIdentifier("Expr"),
          undefined,
          undefined,
          [
            factory.createPropertySignature(
              [factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
              factory.createComputedPropertyName(
                factory.createIdentifier("tag"),
              ),
              undefined,
              factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword),
            ),
            ...sortedEntryValues<ts.PropertySignature | ts.MethodSignature>(
              [
                ...data.keywords.map(
                  ([keyword]): [string, ts.PropertySignature] => [
                    keyword,
                    ts.addSyntheticLeadingComment(
                      factory.createPropertySignature(
                        [factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
                        data.computedNames.has(keyword)
                          ? factory.createComputedPropertyName(
                            factory.createStringLiteral(keyword),
                          )
                          : keyword,
                        undefined,
                        factory.createTypeReferenceNode("Expr"),
                      ),
                      ts.SyntaxKind.MultiLineCommentTrivia,
                      `*\n* use for ${keyword} keyword\n`,
                      true,
                    ),
                  ],
                ),
                // groups must be after keywords to override conflicting names
                ...data.groups.flatMap(
                  ([groupName, group]) =>
                    [groupName, ...(group.aliases ?? [])].map(
                      (name): [string, ts.MethodSignature] => [
                        name,
                        ts.addSyntheticLeadingComment(
                          factory.createMethodSignature(
                            undefined,
                            data.computedNames.has(name)
                              ? factory.createComputedPropertyName(
                                factory.createStringLiteral(name),
                              )
                              : name,
                            undefined,
                            undefined,
                            (group.parameters ?? []).map((name) =>
                              name.split(":")
                            )
                              .map((
                                [name, type],
                              ): [string, ts.TypeReferenceNode, boolean] => [
                                name.replace(/\?$/, ""),
                                factory.createTypeReferenceNode(type || "Expr"),
                                name.endsWith("?"),
                              ]).map(
                                ([name, type, optional], index, parameters) =>
                                  factory.createParameterDeclaration(
                                    undefined,
                                    group.variadic &&
                                      parameters.length === index + 1
                                      ? factory.createToken(
                                        ts.SyntaxKind.DotDotDotToken,
                                      )
                                      : undefined,
                                    name,
                                    optional
                                      ? factory.createToken(
                                        ts.SyntaxKind.QuestionToken,
                                      )
                                      : undefined,
                                    group.variadic &&
                                      parameters.length === index + 1
                                      ? factory.createArrayTypeNode(type)
                                      : type,
                                  ),
                              ),
                            factory.createTypeReferenceNode("Expr"),
                          ),
                          ts.SyntaxKind.MultiLineCommentTrivia,
                          `*\n* ${group.comment}\n`,
                          true,
                        ),
                      ],
                    ),
                ),
                ...data.groupNames("operator").map((
                  name,
                ): [string, ts.MethodSignature] => [
                  name,
                  ts.addSyntheticLeadingComment(
                    factory.createMethodSignature(
                      undefined,
                      name,
                      undefined,
                      undefined,
                      [
                        factory.createParameterDeclaration(
                          undefined,
                          undefined,
                          factory.createIdentifier("op"),
                          undefined,
                          factory.createUnionTypeNode(
                            data.operators.map(([operator]) =>
                              factory.createLiteralTypeNode(
                                factory.createStringLiteral(operator),
                              )
                            ),
                          ),
                        ),
                      ],
                      factory.createTypeReferenceNode("Expr"),
                    ),
                    ts.SyntaxKind.MultiLineCommentTrivia,
                    `*\n* ${data.groupByName("operator").comment}\n`,
                    true,
                  ),
                ]),
              ],
            ),

            factory.createMethodSignature(
              undefined,
              factory.createIdentifier("toString"),
              undefined,
              undefined,
              [],
              factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
            ),
          ],
        ),
        factory.createVariableStatement(
          [
            factory.createModifier(ts.SyntaxKind.ExportKeyword),
            factory.createModifier(ts.SyntaxKind.DeclareKeyword),
          ],
          factory.createVariableDeclarationList(
            [
              factory.createVariableDeclaration(
                "jen",
                undefined,
                factory.createTypeReferenceNode(
                  factory.createIdentifier("Omit"),
                  [
                    factory.createTypeReferenceNode(
                      factory.createIdentifier("Expr"),
                      undefined,
                    ),
                    factory.createTypeQueryNode(
                      factory.createIdentifier("tag"),
                      undefined,
                    ),
                  ],
                ),
              ),
            ],
            ts.NodeFlags.Const,
          ),
        ),
        factory.createModuleDeclaration(
          [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          factory.createIdentifier("jen"),
          factory.createModuleBlock([factory.createExportDeclaration(
            undefined,
            false,
            factory.createNamedExports([factory.createExportSpecifier(
              false,
              undefined,
              factory.createIdentifier("Expr"),
            )]),
            undefined,
            undefined,
          )]),
          ts.NodeFlags.Namespace,
        ),
      ]),
      ts.createSourceFile(
        data.dtsout,
        "",
        ts.ScriptTarget.Latest,
        false,
        ts.ScriptKind.TS,
      ),
    ).replaceAll('/**', '\n/**')
  )
);