async function parralel(
  arr: Array<() => Promise<number>>,
  cb: (arr: number[]) => void,
) {
  const res = await Promise.all(arr.map((func) => func()));

  return cb(res);
}

parralel([async () => 3, async () => 1], (res) => console.log(res));
