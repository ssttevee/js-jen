# jennifer-js

Jennifer is a code generator for typescript. Inspired by
https://github.com/dave/jennifer.

```
import jen from "jennifer-js";
import format from "jennifer-js/format";

format(jen.id("console").dot("log").call(jen.lit("hello world")).toString())

# yields

console.log("hello world")
```

It is not necessary to format the output to be valid, but tokens are generously
spaced out which make for visually displeasing code.

> See the "[stage-2](scripts/generate.ts)" self-generator for a comprehensive
> example.
