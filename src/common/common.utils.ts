export const isEmpty = (obj: unknown): boolean =>
  Object.keys(obj).length === 0 && obj.constructor === Object;
