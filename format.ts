import { readAll } from "https://deno.land/std@0.155.0/streams/conversion.ts";

export class FormatError extends Error {
  constructor(
    public readonly origError: any,
    public readonly unformatted: string,
  ) {
    super(origError.message || origError);

    if (origError.stack) {
      this.stack = origError.stack;
    }
  }
}

export async function format(
  js: string,
  returnUnformatted = false,
  useTabs = false,
  lineWidth = 80,
  indentWidth = 2,
  singleQuote = false,
  proseWrap: "always" | "never" | "preserve" = "always"
): Promise<string> {
  const options = [
    `--options-line-width=${ lineWidth }`,
    `--options-indent-width=${ indentWidth }`,
    `--options-prose-wrap=${ proseWrap }`
  ];

  if (useTabs) {
    options.push("--options-use-tabs");
  }

  if (singleQuote) {
    options.push("--options-single-quote");
  }

  const p = Deno.run(
    {
      cmd: [
        Deno.execPath(),
        "fmt",
        "-",
        ...options
      ],
      stdin: "piped",
      stdout: "piped"
    }
  );
  try {
    p.stdin.write(new TextEncoder().encode(js));
    p.stdin.close();
    return new TextDecoder().decode(await readAll(p.stdout));
  } catch (err) {
    const fmterr = new FormatError(err, js);
    if (returnUnformatted) {
      console.warn(fmterr);
      return js;
    }
    throw fmterr;
  } finally {
    p.stdout.close();
    p.close();
  }
}