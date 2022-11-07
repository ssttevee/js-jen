import type { JSONSchema4 } from "https://unpkg.com/@types/json-schema@7.0.11/index.d.ts";
import ts from "typescript";
import rootSchema from "https://raw.githubusercontent.com/ssttevee/tstree-json-schema/v5.41.0/ast-spec.json" assert {
  type: "json",
};

/**
 * NOTE: this is an internal value in the TypeScript compiler
 *
 * @see https://github.com/microsoft/TypeScript/blob/0d0a79371471d627ae298a145f8009b05cbccb72/src/compiler/scanner.ts#L81
 */
export const keywords = Object.entries(
  (ts as any).textToKeywordObj as Record<string, ts.SyntaxKind>,
).map(([keyword, syntaxKind]) => [keyword, ts.SyntaxKind[syntaxKind]]);

function schemaProperties(schema: JSONSchema4): Record<string, JSONSchema4> {
  if (schema.allOf) {
    return Object.fromEntries(
      schema.allOf
        .map(schemaProperties)
        .flatMap<[string, JSONSchema4]>(Object.entries),
    );
  }

  if (schema.$ref) {
    const name = schema.$ref.match(/#\/definitions\/(.*)/)?.[1];
    if (!name) {
      throw new Error(`Invalid $ref: ${JSON.stringify(schema.$ref)}`);
    }
    const referencedSchema =
      (rootSchema.definitions as Partial<Record<string, JSONSchema4>>)[name];
    if (!referencedSchema) {
      throw new Error(
        `Could not find definition for ${JSON.stringify(schema.$ref)}`,
      );
    }

    return schemaProperties(referencedSchema);
  }

  return schema.properties ?? {};
}

export const operators = Object.entries(
  schemaProperties(
    rootSchema.definitions.PunctuatorTokenToText as JSONSchema4,
  ),
).flatMap(
  ([name, schema]) =>
    ((schema.enum ?? []) as string[]).map((value) => [value, name]),
);

export interface Group {
  /** alternate names */
  aliases?: string[];

  /** comment appended to name */
  comment: string;

  /** is the parameter variadic? */
  variadic?: boolean;

  /** opening tokens */
  before?: string;

  /** closing tokens */
  after?: string;

  /** separator token */
  separator?: string | string[];

  /** items are always on multiple lines */
  multi?: boolean;

  /** parameter names */
  parameters?: string[];
}

export const computedNames = new Set(["new", "constructor"]);

const groupsObj: Record<string, Group> = {
  parentheses: {
    comment: "use for grouping",
    aliases: ["parens"],
    before: "(",
    after: ")",
    parameters: ["expr"],
  },
  call: {
    comment: "use for function calls and parameter lists",
    aliases: ["params"],
    variadic: true,
    separator: ",",
    before: "(",
    after: ")",
    parameters: ["exprs"],
  },
  brackets: {
    comment: "use for indexes and computed property access",
    aliases: ["index", "computed"],
    before: "[",
    after: "]",
    parameters: ["expr?:string | number | Expr"],
  },
  array: {
    comment: "use for array literals and tuples",
    aliases: ["arr", "tuple"],
    variadic: true,
    separator: ",",
    before: "[",
    after: "]",
    parameters: ["items"],
  },
  block: {
    comment: "use for blocks (use `statements` for no braces)",
    variadic: true,
    before: "{",
    after: ";\n}",
    separator: ";",
    multi: true,
    parameters: ["statements"],
  },
  obj: {
    comment: "use for object literals and import/export specifiers",
    variadic: true,
    before: "{",
    after: "}",
    separator: ",",
    parameters: ["properties"],
  },
  types: {
    comment: "use for type parameters",
    variadic: true,
    before: "<",
    after: ">",
    separator: ",",
    parameters: ["types"],
  },
  label: {
    comment: "use for labeled statements",
    after: ":",
    parameters: ["label"],
  },
  switch: {
    comment: "use for switch statements",
    before: "switch (",
    after: ")",
    parameters: ["expr"],
  },
  case: {
    comment: "use for case statements",
    before: "case",
    after: ":",
    parameters: ["expr"],
  },
  await: {
    comment: "use for await expressions",
    before: "await",
    parameters: ["expr"],
  },
  statements: {
    comment: "use for statements without braces (use `block` for braces)",
    separator: ";",
    after: ";",
    variadic: true,
    multi: true,
    parameters: ["statements"],
  },
  operator: {
    comment: "use for arbitrary operators",
    aliases: ["op"],
    parameters: ["op"],
  },
  identifier: {
    comment: "use for identifiers",
    aliases: ["id"],
    parameters: ["name:string"],
  },
  literal: {
    comment: "use for literals",
    aliases: ["lit"],
    parameters: [
      "value:string | number | bigint | boolean | null | undefined | RegExp",
    ],
  },
  property: {
    comment: "use for object properties and type annotations",
    aliases: ["prop"],
    separator: ":",
    parameters: ["name:string | Expr", "valueOrType"],
  },
  dot: {
    comment: "use for property access",
    before: ".",
    parameters: ["name:string"],
  },
  spread: {
    comment: "use for spread elements",
    before: "...",
    parameters: ["expr"],
  },
  if: {
    comment: "use for if statements",
    before: "if (",
    after: ")",
    parameters: ["condition"],
  },
  for: {
    comment: "use for for statements",
    before: "for (",
    after: ")",
    parameters: ["init", "condition", "update"],
  },
  while: {
    comment: "use for while statements",
    before: "while (",
    after: ")",
    parameters: ["condition"],
  },
  do: {
    comment: "use for do statements",
    variadic: true,
    separator: ";",
    before: "do {",
    after: "}",
    multi: true,
    parameters: ["body"],
  },
  typeof: {
    comment: "use for typeof expressions",
    before: "typeof",
    parameters: ["value:Expr"],
  },
  return: {
    comment: "use for return statements",
    before: "return",
    parameters: ["value?:Expr"],
  },
  ternary: {
    comment: "use for ternary expressions",
    aliases: ["cond"],
    separator: ["?", ":"],
    parameters: ["condition", "consequent", "alternate"],
  },
  arrow: {
    comment: "use for arrow functions",
    before: "(",
    after: ") =>",
    variadic: true,
    separator: ",",
    parameters: ["params"],
  },
  function: {
    comment: "use for function declarations",
    before: "function",
    after: ")",
    variadic: true,
    separator: ["(", ","],
    parameters: ["name", "params"],
  },
  union: {
    comment: "use for union types",
    variadic: true,
    separator: "|",
    parameters: ["types"],
  },
  intersection: {
    comment: "use for intersection types",
    aliases: ["intersect"],
    variadic: true,
    separator: "|",
    parameters: ["types"],
  },
  trivia: {
    comment: "use for trivia",
    aliases: ["comment"],
    parameters: ["text:string | string[]"],
  },
  add: {
    comment: "appends the provided `Expr`s verbatim",
    aliases: ["append"],
    variadic: true,
    parameters: ["exprs"],
  },
};

export function groupByName(name: keyof typeof groupsObj): Group {
  return groupsObj[name];
}

export function groupNames(name: keyof typeof groupsObj): string[] {
  return [name, ...(groupsObj[name].aliases ?? [])];
}

export const groups = Object.entries(groupsObj);

export const jsout = new URL("../../expr_gen.js", import.meta.url).pathname;
export const dtsout = new URL("../../expr_gen.d.ts", import.meta.url).pathname;
