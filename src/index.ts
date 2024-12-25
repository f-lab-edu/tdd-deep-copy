export const deepCopy = <T>(obj: T, seen = new WeakMap()): T => {
  if (obj instanceof WeakMap || obj instanceof WeakSet) {
    throw new Error("WeakSet, WeakMap은 복사할 수 없습니다.");
  } else if (obj instanceof Date) {
    return new Date(obj) as T;
  } else if (obj instanceof RegExp) {
    return new RegExp(obj) as T;
  } else if (obj instanceof Set) {
    return new Set(obj) as T;
  } else if (obj instanceof Map) {
    return new Map(obj) as T;
  } else if (obj instanceof Function) {
    const newFuncStr = obj.toString();
    const newFunc = new Function("return " + newFuncStr)();
    Object.assign(newFunc, obj);

    return newFunc as T;
  } else if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (seen.has(obj)) {
    return seen.get(obj);
  }

  let newObj: any;

  if (obj instanceof Array) {
    // 배열
    newObj = [...obj];
  } else if (obj instanceof Object) {
    // 객체, 클래스
    newObj = Object.assign(Object.create(obj.constructor.prototype), obj);
  }

  seen.set(obj, newObj);

  for (const key in newObj) {
    newObj[key] = deepCopy(newObj[key], seen);
  }
  return newObj as T;
};
