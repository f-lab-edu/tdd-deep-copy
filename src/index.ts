const deepCopy = (obj: any) => {
  let newObj;

  if (obj === null || typeof obj !== "object") {
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
        ? (newObj[key] = newObj[key].map((item: any) =>
            Array.isArray(item) ? deepCopy(item) : item
          ))
        : (newObj[key] = deepCopy(newObj[key]));
    }
  }
  return newObj;
};

export default deepCopy;
