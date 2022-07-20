export default (f: (...args: any[]) => void, ms: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let savedArgs: any[] | null = null;

  const wrapper = (...args: any[]) => {
    if (timer) {
      savedArgs = args;
      return;
    }

    f(...args);

    timer = setTimeout(() => {
      timer = null;
      if (savedArgs) {
        wrapper(...savedArgs);
        savedArgs = null;
      }
    }, ms);
  };

  return wrapper;
};
