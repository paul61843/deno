export const pipe =
  (...fns: Function[]) =>
  (x: any) =>
    fns.reduce((v, f) => f(v), x);

export const asyncPipe =
  (...fns: Function[]) =>
  (x: any) =>
    fns.reduce(async (y, f) => f(await y), x);

export const find = (fn: any) => (value: any[]) => {
  return value.find(fn);
};
