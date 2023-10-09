async function oneAfterAnother<T>(
  arr: Array<() => Promise<T>>,
  cb: (value: T[]) => T,
) {
  const res = [];
  for (const func of arr) {
    res.push(await func());
  }

  return cb(res);
}

console.log(
  await oneAfterAnother([async () => 3, async () => 1], (num) =>
    num.reduce((acc, value) => acc + value, 0),
  ),
);
