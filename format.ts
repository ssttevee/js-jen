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
): Promise<string> {
  const p = Deno.run({
    cmd: [Deno.execPath(), "fmt", "-"],
    stdin: "piped",
    stdout: "piped",
  });
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
