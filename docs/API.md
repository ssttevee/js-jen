# API
## Format
For formatting a typescript code string. This will often be used to convert the stringified
typescript code to a prettier format 
```ts
await format(jen.id("console").dot("log").call(jen.lit("hello world")).toString())
```
Reference: https://deno.land/manual@v1.28.1/tools/formatter.

The format function is essentially a wrapper around the deno fmt command & you can pass in arguments to adjust the
formatting as you would the deno fmt command.

The following sections will contain a small code snippet showing how you may use function to generate TS code.
Please refer to the Typescript official documentation as to what each keyword does

## abstract
```ts
jen.abstract.class.id('Person').block(
    jen.statements(
        jen.property(jen.id('firstName').op("?"), jen.string),
        jen.property(jen.id('lastName').op("?"), jen.string),
        jen.property(jen.id('age').op("?"), jen.number)
    )
);
```
```ts
abstract class Person {
  firstName?: string;
  lastName?: string;
  age?: number;
}
```
## add
## any
```ts
jen.statements(
    jen.const.id('i').op('=').lit(3),
    jen.const.id('j').op('=').id('i').as.any
)
```
```ts
const i = 3;
const j = i as any;
```
## array
```ts
jen.array(jen.lit(1), jen.lit(2), jen.lit(3))
```
```ts
[1, 2, 3];
```
## arrow
```ts
jen.const.id('mult').op('=').arrow(
    jen.id('a').op(":").number, jen.id('b').op(":").number
).block(
    jen.return(jen.id('a').op('*').id('b'))
);
```
```ts
const mult = (a: number, b: number) => {
  return a * b;
};
```
## as
```ts
jen.statements(
    jen.const.id('i').op('=').lit(3),
    jen.const.id('j').op('=').id('i').as.any
)
```
```ts
const i = 3;
const j = i as any;
```
## assert
```ts
jen.statements(
    jen.const.id('x').op('=').lit(4),
    jen.assert.parentheses(
        jen.id('x').op('%').lit(2).op('===').lit(0)
    )
)
```
```ts
const x = 4;
assert(x % 2 === 0);
```
## asserts
## async
```ts
jen.async.function(jen.id("f"),
    jen.id("a").op(":").number,
    jen.id("b").op(":").number
).block(
    jen.return(jen.id('a').op('*').id('b'))
)
```

```ts
async function f(a: number, b: number) {
  return a * b;
}
```
## await
```ts
jen.statements(
    jen.async.function(
        jen.id('f'),
        jen.id('a').op(':').number,
        jen.id('b').op(':').number
    ).block(
        jen.return(jen.id('a').op('*').id('b'))
    ),
    jen.const.id("x").op("=").await(jen.id("f").call(jen.literal(2), jen.literal(3)))
);
```
```ts
async function f(a: number, b: number) {
  return a * b;
}
const x = await f(2, 3);
```
## bigint
## block
## boolean
## brackets
## break
## call
## case
## catch
## class
## const
## constructor
## continue
## debugger
## declare
## default
## delete
## do
## dot
## else
## enum
## export
## extends
## false
## finally
## for
## from
## function
## get
## global
## identifier
## if
## implements
## import
## in
## infer
## instanceof
## interface
## intersection
## intrinsic
## is
## keyof
## label
## let
## literal
## module
## namespace
## never
## "]:
## null
## number
## obj
## object
## of
## operator
## out
## override
## package
## parentheses
## private
## property
## protected
## public
## readonly
## require
## return
## set
## spread
## statements
## static
## string
## super
## switch
## symbol
## ternary
## this
## throw
## trivia
## true
## try
## type
## typeof
## types
## undefined
## union
## unique
## unknown
## var
## void
## while
## with
## yield