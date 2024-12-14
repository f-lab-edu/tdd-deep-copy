export const recursivelyCheckNestedProperties = (
  originalObject: any,
  copiedObject: any
) => {
  for (const key in originalObject) {
    if (
      typeof originalObject[key] === "object" &&
      originalObject[key] !== null
    ) {
      expect(copiedObject[key]).toEqual(originalObject[key]);
      expect(copiedObject[key]).not.toBe(originalObject[key]);
      recursivelyCheckNestedProperties(originalObject[key], copiedObject[key]);
    }
  }
};
