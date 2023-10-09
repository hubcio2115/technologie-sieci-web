async function parralel(
  fun1: (value?: number) => Promise<number>,
  fun2: (value: number) => Promise<number>,
  cb: (arr: number[]) => void,
) {
  const res = await Promise.all([fun1(), fun2(3)]);

  return cb(res);
}

parralel(
  async () => 3,
  async (num) => num + 1,
  (res) => console.log(res),
);
