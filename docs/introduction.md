# Introduction
## What is deno-jen?
Inspired by https://github.com/dave/jennifer, this project is a code generator for typescript.
You can output typescript code using our API.

Here is a sample of something you may write:
```ts
...
// import deno file URL
import { fromFileUrl } from 'https://deno.land/std/path/mod.ts';

// use deno jen to create typescript
const output = jen.statements(
    // const i = 3;
    jen.const.id("i").op("=").literal(3),
    // const j = 3;
    jen.const.id("j").op("=").literal(3),
    // if (i === j) {
    //     console.log("hello world");
    // }
    jen.if(jen.id("i").operator('===').id("j")).block(
        jen.id("console").dot("log").call(jen.literal("hello world"))
    )
).toString(); // <--- convert from the jen namespace type to a string to output

const path = fromFileUrl(new URL("sample_gen.ts", import.meta.url))

await Deno.writeTextFile(
    path,
    await format(output) // <--- format the output for writing to a file
);
```

// TODO: write about format: https://deno.land/manual@v1.28.1/tools/formatter