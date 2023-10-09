function defFun(func: <T>(a: T, b: T) => T, types: string[]) {
  return {
    func,
    typeConstr: types,
  };
}

function appFun<T extends ReturnType<typeof defFun>>(
  { func, typeConstr: [typeA, typeB] }: T,
  [a, b]: Parameters<T["func"]>,
) {
  try {
    const areTypesCorrect = typeof a === typeA && typeof b === typeB;

    if (areTypesCorrect) {
      return func(a, b);
    } else {
      throw new Error("Wrong types of arguments.");
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
  }
}
