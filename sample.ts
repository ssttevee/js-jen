import jen, { format } from "./mod.ts";
import { fromFileUrl } from 'https://deno.land/std/path/mod.ts';

const output = jen.statements(
    jen.const.id("i").op("=").literal(3),
    jen.const.id("j").op("=").literal(3),
    jen.if(jen.id("i").operator('===').id("j")).block(
        jen.id("console").dot("log").call(jen.literal("hello world"))
    )
).toString();

console.log(output);

const path = fromFileUrl(new URL("sample_gen.ts", import.meta.url))

console.log(path);

await Deno.writeTextFile(
    path,
    await format(output)
);