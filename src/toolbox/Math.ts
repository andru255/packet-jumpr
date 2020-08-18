export const Random = {
  int: (min, max): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  fromArray: (values: number[]): number => {
    return values[Math.floor(Random.int(0, values.length - 1))];
  },
};
