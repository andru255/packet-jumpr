const Easing = {
  linear: (
    time: number,
    begin: number,
    change: number,
    duration: number
  ): number => {
    const diff = change - begin;
    const f = time / duration;
    if (diff > time) {
      return begin + diff * f;
    }
    if (diff < -time) {
      return begin - (begin - change) * f;
    }
    return change;
  },
};
export default Easing;
