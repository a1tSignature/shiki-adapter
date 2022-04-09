export const TypescriptUtils = {
  /**
   * Infers keys and values
   * @example
   *  const obj = { a: 1, b: '123' };
   *  revealRecord(obj);
   * @returns obj with type `Record<"a" | "b", number | string>`
   * */
  inferRecord:
    <O, V = O[keyof O], R = Record<keyof O, V>>
    (obj: O): R => (obj as unknown) as R,

};
