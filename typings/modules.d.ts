declare module '*.html' {
  const value: string;
  export default value;
}

declare module 'merge-change' {
  type Patch = import('../types').Patch;

  interface MergeChange {
    // Патч первого объекта с его мутацией
    patch<A>(first: A, ...values: Patch<A>[]): A;

    // Создание нового объекта на основе первого слиянием в глубину остальных
    merge<A>(first: A, ...values: Patch<A>[]): A;
    merge<A>(...values: A[] | Patch<A>[]): A;

    // Иммутабельное слияние объектов. Если есть изменения, то возвращается новый объект (иммутабельость на всю глубину слияния)
    update<A>(first: A, ...values: Patch<A>[]): A;
  }

  const mc: MergeChange;
  export default mc;
}
