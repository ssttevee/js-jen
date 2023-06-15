import dprint from "dprint-node";

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

export function format(
  js: string,
  returnUnformatted = false,
): string {
  try {
    return dprint.format("code.ts", js);
  } catch (err) {
    const fmterr = new FormatError(err, js);
    if (returnUnformatted) {
      console.warn(fmterr);
      return js;
    }
    throw fmterr;
  }
}

export default format;
