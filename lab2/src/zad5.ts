function groupMap<T>(
  arr: T[],
  key: (value: T) => boolean,
  fun: (value: T) => T,
) {
  return arr.reduce(
    (acc: { true: T[]; false: T[] }, el) => {
      if (key(el)) {
        acc.true.push(fun(el));
      } else {
        acc.false.push(fun(el));
      }

      return acc;
    },
    { true: [], false: [] },
  );
}

console.log(
  groupMap(
    [3, 2, 4, 4, 3],
    (n) => n % 2 === 0,
    (n) => n + 1,
  ),
);
