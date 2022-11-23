declare const tag: unique symbol;
export interface Expr {
  readonly [tag]: unknown;

  /**
   * use for abstract keyword
   */
  readonly abstract: Expr;

  /**
   * appends the provided `Expr`s verbatim
   */
  add(...exprs: Expr[]): Expr;

  /**
   * use for any keyword
   */
  readonly any: Expr;

  /**
   * appends the provided `Expr`s verbatim
   */
  append(...exprs: Expr[]): Expr;

  /**
   * use for array literals and tuples
   */
  arr(...items: Expr[]): Expr;

  /**
   * use for array literals and tuples
   */
  array(...items: Expr[]): Expr;

  /**
   * use for arrow functions
   */
  arrow(...params: Expr[]): Expr;

  /**
   * use for as keyword
   */
  readonly as: Expr;

  /**
   * use for assert keyword
   */
  readonly assert: Expr;

  /**
   * use for asserts keyword
   */
  readonly asserts: Expr;

  /**
   * use for async keyword
   */
  readonly async: Expr;

  /**
   * use for await expressions
   */
  await(expr: Expr): Expr;

  /**
   * use for bigint keyword
   */
  readonly bigint: Expr;

  /**
   * use for blocks (use `statements` for no braces)
   */
  block(...statements: Expr[]): Expr;

  /**
   * use for boolean keyword
   */
  readonly boolean: Expr;

  /**
   * use for indexes and computed property access
   */
  brackets(expr?: string | number | Expr): Expr;

  /**
   * use for break keyword
   */
  readonly break: Expr;

  /**
   * use for function calls and parameter lists
   */
  call(...exprs: Expr[]): Expr;

  /**
   * use for case statements
   */
  case(expr: Expr): Expr;

  /**
   * use for catch keyword
   */
  readonly catch: Expr;

  /**
   * use for class keyword
   */
  readonly class: Expr;

  /**
   * use for trivia
   */
  comment(text: string | string[]): Expr;

  /**
   * use for indexes and computed property access
   */
  computed(expr?: string | number | Expr): Expr;

  /**
   * use for ternary expressions
   */
  cond(condition: Expr, consequent: Expr, alternate: Expr): Expr;

  /**
   * use for const keyword
   */
  readonly const: Expr;

  /**
   * use for constructor keyword
   */
  readonly ["constructor"]: Expr;

  /**
   * use for continue keyword
   */
  readonly continue: Expr;

  /**
   * use for debugger keyword
   */
  readonly debugger: Expr;

  /**
   * use for declare keyword
   */
  readonly declare: Expr;

  /**
   * use for default keyword
   */
  readonly default: Expr;

  /**
   * use for delete keyword
   */
  readonly delete: Expr;

  /**
   * use for do statements
   */
  do(...body: Expr[]): Expr;

  /**
   * use for property access
   */
  dot(name: string): Expr;

  /**
   * use for else keyword
   */
  readonly else: Expr;

  /**
   * use for enum keyword
   */
  readonly enum: Expr;

  /**
   * use for export keyword
   */
  readonly export: Expr;

  /**
   * use for extends keyword
   */
  readonly extends: Expr;

  /**
   * use for false keyword
   */
  readonly false: Expr;

  /**
   * use for finally keyword
   */
  readonly finally: Expr;

  /**
   * use for for statements
   */
  for(init: Expr, condition: Expr, update: Expr): Expr;

  /**
   * use for from keyword
   */
  readonly from: Expr;

  /**
   * use for function declarations
   */
  function(name: Expr, ...params: Expr[]): Expr;

  /**
   * use for get keyword
   */
  readonly get: Expr;

  /**
   * use for global keyword
   */
  readonly global: Expr;

  /**
   * use for identifiers
   */
  id(name: string): Expr;

  /**
   * use for identifiers
   */
  identifier(name: string): Expr;

  /**
   * use for if statements
   */
  if(condition: Expr): Expr;

  /**
   * use for implements keyword
   */
  readonly implements: Expr;

  /**
   * use for import keyword
   */
  readonly import: Expr;

  /**
   * use for in keyword
   */
  readonly in: Expr;

  /**
   * use for indexes and computed property access
   */
  index(expr?: string | number | Expr): Expr;

  /**
   * use for infer keyword
   */
  readonly infer: Expr;

  /**
   * use for instanceof keyword
   */
  readonly instanceof: Expr;

  /**
   * use for interface keyword
   */
  readonly interface: Expr;

  /**
   * use for intersection types
   */
  intersect(...types: Expr[]): Expr;

  /**
   * use for intersection types
   */
  intersection(...types: Expr[]): Expr;

  /**
   * use for intrinsic keyword
   */
  readonly intrinsic: Expr;

  /**
   * use for is keyword
   */
  readonly is: Expr;

  /**
   * use for keyof keyword
   */
  readonly keyof: Expr;

  /**
   * use for labeled statements
   */
  label(label: Expr): Expr;

  /**
   * use for let keyword
   */
  readonly let: Expr;

  /**
   * use for literals
   */
  lit(
    value: string | number | bigint | boolean | null | undefined | RegExp,
  ): Expr;

  /**
   * use for literals
   */
  literal(
    value: string | number | bigint | boolean | null | undefined | RegExp,
  ): Expr;

  /**
   * use for module keyword
   */
  readonly module: Expr;

  /**
   * use for namespace keyword
   */
  readonly namespace: Expr;

  /**
   * use for never keyword
   */
  readonly never: Expr;

  /**
   * use for new keyword
   */
  readonly ["new"]: Expr;

  /**
   * use for null keyword
   */
  readonly null: Expr;

  /**
   * use for number keyword
   */
  readonly number: Expr;

  /**
   * use for object literals and import/export specifiers
   */
  obj(...properties: Expr[]): Expr;

  /**
   * use for object keyword
   */
  readonly object: Expr;

  /**
   * use for of keyword
   */
  readonly of: Expr;

  /**
   * use for arbitrary operators
   */
  op(
    op:
      | "="
      | "+="
      | "-="
      | "*="
      | "**="
      | "/="
      | "%="
      | "<<="
      | ">>="
      | ">>>="
      | "&="
      | "|="
      | "||="
      | "&&="
      | "??="
      | "^="
      | "{"
      | "}"
      | "("
      | ")"
      | "["
      | "]"
      | "."
      | "..."
      | ";"
      | ","
      | "?."
      | "<"
      | "</"
      | ">"
      | "<="
      | ">="
      | "=="
      | "!="
      | "==="
      | "!=="
      | "=>"
      | "+"
      | "-"
      | "*"
      | "**"
      | "/"
      | "%"
      | "++"
      | "--"
      | "<<"
      | ">>"
      | ">>>"
      | "&"
      | "|"
      | "^"
      | "!"
      | "~"
      | "&&"
      | "||"
      | "?"
      | ":"
      | "@"
      | "??"
      | "`"
      | "#",
  ): Expr;

  /**
   * use for arbitrary operators
   */
  operator(
    op:
      | "="
      | "+="
      | "-="
      | "*="
      | "**="
      | "/="
      | "%="
      | "<<="
      | ">>="
      | ">>>="
      | "&="
      | "|="
      | "||="
      | "&&="
      | "??="
      | "^="
      | "{"
      | "}"
      | "("
      | ")"
      | "["
      | "]"
      | "."
      | "..."
      | ";"
      | ","
      | "?."
      | "<"
      | "</"
      | ">"
      | "<="
      | ">="
      | "=="
      | "!="
      | "==="
      | "!=="
      | "=>"
      | "+"
      | "-"
      | "*"
      | "**"
      | "/"
      | "%"
      | "++"
      | "--"
      | "<<"
      | ">>"
      | ">>>"
      | "&"
      | "|"
      | "^"
      | "!"
      | "~"
      | "&&"
      | "||"
      | "?"
      | ":"
      | "@"
      | "??"
      | "`"
      | "#",
  ): Expr;

  /**
   * use for out keyword
   */
  readonly out: Expr;

  /**
   * use for override keyword
   */
  readonly override: Expr;

  /**
   * use for package keyword
   */
  readonly package: Expr;

  /**
   * use for function calls and parameter lists
   */
  params(...exprs: Expr[]): Expr;

  /**
   * use for grouping
   */
  parens(expr: Expr): Expr;

  /**
   * use for grouping
   */
  parentheses(expr: Expr): Expr;

  /**
   * use for private keyword
   */
  readonly private: Expr;

  /**
   * use for object properties and type annotations
   */
  prop(name: string | Expr, valueOrType: Expr): Expr;

  /**
   * use for object properties and type annotations
   */
  property(name: string | Expr, valueOrType: Expr): Expr;

  /**
   * use for protected keyword
   */
  readonly protected: Expr;

  /**
   * use for public keyword
   */
  readonly public: Expr;

  /**
   * use for readonly keyword
   */
  readonly readonly: Expr;

  /**
   * use for require keyword
   */
  readonly require: Expr;

  /**
   * use for return statements
   */
  return(value?: Expr): Expr;

  /**
   * use for set keyword
   */
  readonly set: Expr;

  /**
   * use for spread elements
   */
  spread(expr: Expr): Expr;

  /**
   * use for statements without braces (use `block` for braces)
   */
  statements(...statements: Expr[]): Expr;

  /**
   * use for static keyword
   */
  readonly static: Expr;

  /**
   * use for string keyword
   */
  readonly string: Expr;

  /**
   * use for super keyword
   */
  readonly super: Expr;

  /**
   * use for switch statements
   */
  switch(expr: Expr): Expr;

  /**
   * use for symbol keyword
   */
  readonly symbol: Expr;

  /**
   * use for ternary expressions
   */
  ternary(condition: Expr, consequent: Expr, alternate: Expr): Expr;

  /**
   * use for this keyword
   */
  readonly this: Expr;

  /**
   * use for throw keyword
   */
  readonly throw: Expr;

  /**
   * use for trivia
   */
  trivia(text: string | string[]): Expr;

  /**
   * use for true keyword
   */
  readonly true: Expr;

  /**
   * use for try keyword
   */
  readonly try: Expr;

  /**
   * use for array literals and tuples
   */
  tuple(...items: Expr[]): Expr;

  /**
   * use for type keyword
   */
  readonly type: Expr;

  /**
   * use for typeof expressions
   */
  typeof(value: Expr): Expr;

  /**
   * use for type parameters
   */
  types(...types: Expr[]): Expr;

  /**
   * use for undefined keyword
   */
  readonly undefined: Expr;

  /**
   * use for union types
   */
  union(...types: Expr[]): Expr;

  /**
   * use for unique keyword
   */
  readonly unique: Expr;

  /**
   * use for unknown keyword
   */
  readonly unknown: Expr;

  /**
   * use for var keyword
   */
  readonly var: Expr;

  /**
   * use for void keyword
   */
  readonly void: Expr;

  /**
   * use for while statements
   */
  while(condition: Expr): Expr;

  /**
   * use for with keyword
   */
  readonly with: Expr;

  /**
   * use for yield keyword
   */
  readonly yield: Expr;
  toString(): string;
}
export declare const jen: Omit<Expr, typeof tag>;
export namespace jen {
  export { Expr };
}