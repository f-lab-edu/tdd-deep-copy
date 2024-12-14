const deepCopy = (obj: any) => {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (typeof newObj[key] === "object" && newObj[key] !== null) {
      Array.isArray(newObj[key])
        ? (newObj[key] = [...newObj[key]])
        : (newObj[key] = deepCopy(newObj[key]));
    }
  }
  return newObj;
};

export default deepCopy;
