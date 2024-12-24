export const deepCopy = (obj: any) => {
  let newObj;

  if (obj instanceof Date) {
    return new Date(obj);
  } else if (obj instanceof RegExp) {
    return new RegExp(obj);
  } else if (obj instanceof Set) {
    return new Set(obj);
  } else if (obj instanceof Map) {
    return new Map(obj);
  } else if (obj === null || typeof obj !== "object") {
    newObj = obj;
  } else if (Array.isArray(obj)) {
    // 배열
    newObj = [...obj];
  } else if (typeof obj === "object" && obj !== null) {
    // 객체
    newObj = { ...obj };
  }

  for (const key in newObj) {
    if (typeof newObj[key] === "object" && newObj[key] !== null) {
      Array.isArray(newObj[key])
        ? (newObj[key] = newObj[key].map((item: any) => deepCopy(item)))
        : (newObj[key] = deepCopy(newObj[key]));
    }
  }
  return newObj;
};
