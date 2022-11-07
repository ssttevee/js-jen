const p = {
  abstract: {
    get() {
      return extend(this, "abstract");
    },
  },
  add: {
    value(...exprs) {
      return extend(this, ...exprs);
    },
  },
  any: {
    get() {
      return extend(this, "any");
    },
  },
  array: {
    value(...items) {
      return extend(this, "[", items.join(" , "), "]");
    },
  },
  arrow: {
    value(...params) {
      return extend(this, "(", params.join(" , "), ") =>");
    },
  },
  as: {
    get() {
      return extend(this, "as");
    },
  },
  assert: {
    get() {
      return extend(this, "assert");
    },
  },
  asserts: {
    get() {
      return extend(this, "asserts");
    },
  },
  async: {
    get() {
      return extend(this, "async");
    },
  },
  await: {
    value(expr) {
      return extend(this, "await", expr);
    },
  },
  bigint: {
    get() {
      return extend(this, "bigint");
    },
  },
  block: {
    value(...statements) {
      return extend(this, "{\n", statements.join(" ;\n"), "\n;\n}");
    },
  },
  boolean: {
    get() {
      return extend(this, "boolean");
    },
  },
  brackets: {
    value(expr) {
      return extend(
        this,
        "[",
        typeof expr === "object" ? expr : JSON.stringify(expr),
        "]",
      );
    },
  },
  break: {
    get() {
      return extend(this, "break");
    },
  },
  call: {
    value(...exprs) {
      return extend(this, "(", exprs.join(" , "), ")");
    },
  },
  case: {
    value(expr) {
      return extend(this, "case", expr, ":");
    },
  },
  catch: {
    get() {
      return extend(this, "catch");
    },
  },
  class: {
    get() {
      return extend(this, "class");
    },
  },
  const: {
    get() {
      return extend(this, "const");
    },
  },
  ["constructor"]: {
    get() {
      return extend(this, "constructor");
    },
  },
  continue: {
    get() {
      return extend(this, "continue");
    },
  },
  debugger: {
    get() {
      return extend(this, "debugger");
    },
  },
  declare: {
    get() {
      return extend(this, "declare");
    },
  },
  default: {
    get() {
      return extend(this, "default");
    },
  },
  delete: {
    get() {
      return extend(this, "delete");
    },
  },
  do: {
    value(...body) {
      return extend(this, "do {\n", body.join(" ;\n"), "\n}");
    },
  },
  dot: {
    value(name) {
      return extend(this, ".", name);
    },
  },
  else: {
    get() {
      return extend(this, "else");
    },
  },
  enum: {
    get() {
      return extend(this, "enum");
    },
  },
  export: {
    get() {
      return extend(this, "export");
    },
  },
  extends: {
    get() {
      return extend(this, "extends");
    },
  },
  false: {
    get() {
      return extend(this, "false");
    },
  },
  finally: {
    get() {
      return extend(this, "finally");
    },
  },
  for: {
    value(init, condition, update) {
      return extend(this, "for (", init, condition, update, ")");
    },
  },
  from: {
    get() {
      return extend(this, "from");
    },
  },
  function: {
    value(name, ...params) {
      return extend(this, "function", name, "(", params.join(" , "), ")");
    },
  },
  get: {
    get() {
      return extend(this, "get");
    },
  },
  global: {
    get() {
      return extend(this, "global");
    },
  },
  identifier: {
    value(name) {
      return extend(this, name);
    },
  },
  if: {
    value(condition) {
      return extend(this, "if (", condition, ")");
    },
  },
  implements: {
    get() {
      return extend(this, "implements");
    },
  },
  import: {
    get() {
      return extend(this, "import");
    },
  },
  in: {
    get() {
      return extend(this, "in");
    },
  },
  infer: {
    get() {
      return extend(this, "infer");
    },
  },
  instanceof: {
    get() {
      return extend(this, "instanceof");
    },
  },
  interface: {
    get() {
      return extend(this, "interface");
    },
  },
  intersection: {
    value(...types) {
      return extend(this, types.join(" | "));
    },
  },
  intrinsic: {
    get() {
      return extend(this, "intrinsic");
    },
  },
  is: {
    get() {
      return extend(this, "is");
    },
  },
  keyof: {
    get() {
      return extend(this, "keyof");
    },
  },
  label: {
    value(label) {
      return extend(this, label, ":");
    },
  },
  let: {
    get() {
      return extend(this, "let");
    },
  },
  literal: {
    value(value) {
      if (value === undefined) {
        return extend(this, "undefined");
      }
      if (typeof value === "bigint") {
        return extend(this, value.toString() + "n");
      }
      if (value instanceof RegExp) {
        return extend(this, value.toString());
      }
      return extend(this, JSON.stringify(value));
    },
  },
  module: {
    get() {
      return extend(this, "module");
    },
  },
  namespace: {
    get() {
      return extend(this, "namespace");
    },
  },
  never: {
    get() {
      return extend(this, "never");
    },
  },
  ["new"]: {
    get() {
      return extend(this, "new");
    },
  },
  null: {
    get() {
      return extend(this, "null");
    },
  },
  number: {
    get() {
      return extend(this, "number");
    },
  },
  obj: {
    value(...properties) {
      return extend(this, "{", properties.join(" , "), "}");
    },
  },
  object: {
    get() {
      return extend(this, "object");
    },
  },
  of: {
    get() {
      return extend(this, "of");
    },
  },
  operator: {
    value(op) {
      return extend(this, op);
    },
  },
  out: {
    get() {
      return extend(this, "out");
    },
  },
  override: {
    get() {
      return extend(this, "override");
    },
  },
  package: {
    get() {
      return extend(this, "package");
    },
  },
  parentheses: {
    value(expr) {
      return extend(this, "(", expr, ")");
    },
  },
  private: {
    get() {
      return extend(this, "private");
    },
  },
  property: {
    value(name, valueOrType) {
      return extend(this, name, ":", valueOrType);
    },
  },
  protected: {
    get() {
      return extend(this, "protected");
    },
  },
  public: {
    get() {
      return extend(this, "public");
    },
  },
  readonly: {
    get() {
      return extend(this, "readonly");
    },
  },
  require: {
    get() {
      return extend(this, "require");
    },
  },
  return: {
    value(value) {
      return extend(this, "return", value);
    },
  },
  set: {
    get() {
      return extend(this, "set");
    },
  },
  spread: {
    value(expr) {
      return extend(this, "...", expr);
    },
  },
  statements: {
    value(...statements) {
      return extend(this, statements.join(" ;\n"), "\n;");
    },
  },
  static: {
    get() {
      return extend(this, "static");
    },
  },
  string: {
    get() {
      return extend(this, "string");
    },
  },
  super: {
    get() {
      return extend(this, "super");
    },
  },
  switch: {
    value(expr) {
      return extend(this, "switch (", expr, ")");
    },
  },
  symbol: {
    get() {
      return extend(this, "symbol");
    },
  },
  ternary: {
    value(condition, consequent, alternate) {
      return extend(this, condition, "?", consequent, ":", alternate);
    },
  },
  this: {
    get() {
      return extend(this, "this");
    },
  },
  throw: {
    get() {
      return extend(this, "throw");
    },
  },
  trivia: {
    value(text) {
      return extend(this, "\n", trivia(text), "\n");
    },
  },
  true: {
    get() {
      return extend(this, "true");
    },
  },
  try: {
    get() {
      return extend(this, "try");
    },
  },
  type: {
    get() {
      return extend(this, "type");
    },
  },
  typeof: {
    value(value) {
      return extend(this, "typeof", value);
    },
  },
  types: {
    value(...types) {
      return extend(this, "<", types.join(" , "), ">");
    },
  },
  undefined: {
    get() {
      return extend(this, "undefined");
    },
  },
  union: {
    value(...types) {
      return extend(this, types.join(" | "));
    },
  },
  unique: {
    get() {
      return extend(this, "unique");
    },
  },
  unknown: {
    get() {
      return extend(this, "unknown");
    },
  },
  var: {
    get() {
      return extend(this, "var");
    },
  },
  void: {
    get() {
      return extend(this, "void");
    },
  },
  while: {
    value(condition) {
      return extend(this, "while (", condition, ")");
    },
  },
  with: {
    get() {
      return extend(this, "with");
    },
  },
  yield: {
    get() {
      return extend(this, "yield");
    },
  },
};
p.append = p.add;
p.arr = p.array;
p.comment = p.trivia;
p.computed = p.brackets;
p.cond = p.ternary;
p.id = p.identifier;
p.index = p.brackets;
p.intersect = p.intersection;
p.lit = p.literal;
p.op = p.operator;
p.params = p.call;
p.parens = p.parentheses;
p.prop = p.property;
p.tuple = p.array;
const extend = (expr, ...extensions) => {
  const code = (expr && Object.hasOwn(expr, "toString") ? expr + " " : "") +
    extensions.filter(Boolean).join(" ");
  return Object.defineProperties({
    toString: () => code,
  }, p);
};
const trivia = (s) =>
  (Array.isArray(s) || (s = s.split("\n")).length > 1)
    ? "/**\n* " + s.join("\n* ") + "\n*/"
    : "// " + s[0];
export const jen = extend({});
