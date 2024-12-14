const deepCopy = (obj: any) => {
  const newObj = { ...obj };
  return newObj;
};

export default deepCopy;
