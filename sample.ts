import jen, { format } from "./mod.ts";
import { fromFileUrl } from 'https://deno.land/std/path/mod.ts';

const output = jen.statements(
    jen.const.id('x').op('=').lit(4),
    jen.assert.parentheses(
        jen.id('x').op('%').lit(2).op('===').lit(0)
    )
).toString();

const path = fromFileUrl(new URL("sample_gen.ts", import.meta.url))

await Deno.writeTextFile(
    path,
    await format(output)
);