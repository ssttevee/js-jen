import jen, { format } from './mod.ts';
import { fromFileUrl } from 'https://deno.land/std/path/mod.ts';

// const output = jen.statements(
//     jen.const.id('x').op('=').lit(4),
//     jen.assert.parentheses(
//         jen.id('x').op('%').lit(2).op('===').lit(0)
//     )
// ).toString();
const output = jen.statements(
    jen.async.function(
        jen.id('f'),
        jen.id('a').op(':').number,
        jen.id('b').op(':').number
    ).block(
        jen.return(jen.id('a').op('*').id('b'))
    ),
    jen.const.id("x").op("=").await(jen.id("f").call(jen.literal(2), jen.literal(3)))
).toString();

const path = fromFileUrl(new URL('sample_gen.ts', import.meta.url));

await Deno.writeTextFile(
    path,
    await format(output)
);