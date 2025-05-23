export type Args<F> = F extends (...args: infer T) => unknown ? T : unknown;
