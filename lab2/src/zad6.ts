async function oneAfterAnother<T>(
  fun1: () => Promise<T>,
  fun2: (num: T) => Promise<T>,
  cb: (res: T) => void,
) {
  const res = await fun2(await fun1());

  return cb(res);
}

oneAfterAnother(
  async () => 3,
  async (num) => num + 1,
  (num) => console.log(num),
);
