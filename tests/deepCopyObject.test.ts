import deepCopy from "../src/index";

describe("객체 깊은 복사 테스트", () => {
  it("중첩 객체 속성이 없는 일반 객체의 깊은 복사", () => {
    // 원본 객체
    const originalObject = {
      name: "John",
      age: 30,
      city: "New York",
    };

    const copiedObject = deepCopy(originalObject);
    expect(copiedObject).toEqual(originalObject); // 원본 객체와 복사된 객체가 동일한 값을 가짐
    expect(copiedObject).not.toBe(originalObject); // 원본 객체와 복사된 객체가 동일한 객체가 아님
  });

  it("중첩 객체 속성이 있는 객체의 깊은 복사", () => {
    // 원본 객체
    const originalObject = {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "New York",
        country: "USA",
      },
    };

    const copiedObject = deepCopy(originalObject);
    expect(copiedObject).toEqual(originalObject); // 원본 객체와 복사된 객체가 동일한 값을 가짐
    expect(copiedObject).not.toBe(originalObject); // 원본 객체와 복사된 객체가 동일한 객체가 아님
    recursivelyCheckNestedProperties(originalObject, copiedObject);
  });
});

const recursivelyCheckNestedProperties = (
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
    }
  }
};
