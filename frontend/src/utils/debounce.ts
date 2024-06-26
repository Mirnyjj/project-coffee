// export const debounce = <F extends (...args: unknown[]) => unknown>(func: F, waitFor: number) => {
//     let timeout: ReturnType<typeof setTimeout> | null = null;
  
//     const debounced = (...args: Parameters<F>) => {
//       if (timeout !== null) {
//         clearTimeout(timeout);
//         timeout = null;
//       }
//       timeout = setTimeout(() => func(...args), waitFor);
//     };
  
//     return debounced as (...args: Parameters<F>) => ReturnType<F>;
//   };

export const debounce = <T extends (...args: boolean[]) => ReturnType<T>>(
  callback: T,
  timeout: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(...args)
    }, timeout)
  }
}