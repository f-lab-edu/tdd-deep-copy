export const deepCopy = (obj: any, seen = new WeakMap()) => {
  if (obj instanceof WeakMap || obj instanceof WeakSet) {
    throw new Error("WeakSet, WeakMap은 복사할 수 없습니다.");
  } else if (obj instanceof Date) {
    return new Date(obj);
  } else if (obj instanceof RegExp) {
    return new RegExp(obj);
  } else if (obj instanceof Set) {
    return new Set(obj);
  } else if (obj instanceof Map) {
    return new Map(obj);
  } else if (obj instanceof Function) {
    const newFunc = (...args: any) => obj(...args);
    Object.assign(newFunc, obj);
    return newFunc;
  } else if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (seen.has(obj)) {
    return seen.get(obj);
  }

  let newObj;

  if (obj instanceof Array) {
    // 배열
    newObj = [...obj];
  } else if (obj instanceof Object) {
    // 객체
    newObj = { ...obj };
  }

  seen.set(obj, newObj);

  for (const key in newObj) {
    if (typeof newObj[key] === "object" && newObj[key] !== null) {
      newObj[key] = deepCopy(newObj[key], seen);
    }
  }
  return newObj;
};
