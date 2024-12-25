export const recursivelyCheckNestedProperties = (
  originalObject: any,
  copiedObject: any,
  seen = new WeakMap()
) => {
  if (seen.has(originalObject)) {
    expect(seen.get(originalObject)).toBe(copiedObject);
    return;
  }

  seen.set(originalObject, copiedObject);

  for (const key in originalObject) {
    if (typeof originalObject[key] === "function") {
      expect(copiedObject[key].toString()).toBe(originalObject[key].toString()); // fail
    } else if (
      typeof originalObject[key] === "object" &&
      originalObject[key] !== null
    ) {
      expect(copiedObject[key]).not.toBe(originalObject[key]);
      recursivelyCheckNestedProperties(
        originalObject[key],
        copiedObject[key],
        seen
      );
    } else {
      expect(copiedObject[key]).toBe(originalObject[key]);
    }
  }
};
