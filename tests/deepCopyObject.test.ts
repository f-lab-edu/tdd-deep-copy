import deepCopy from "../src/index";
import { recursivelyCheckNestedProperties } from "./recursivelyCheckNestedProperties";

describe("객체 깊은 복사 테스트", () => {
  it("원시값 속성만을 가진 객체의 깊은 복사", () => {
    const originalObject = {
      name: "John",
      age: 30,
      city: "New York",
      married: false,
      children: null,
      symbol: Symbol("symbol"),
      undefinedValue: undefined,
      notInfinity: -Infinity,
      infinity: Infinity,
      notANumber: NaN,
      bigInt: BigInt(1234567890),
    };

    const copiedObject = deepCopy(originalObject);
    expect(copiedObject).toEqual(originalObject); // 원본 객체와 복사된 객체가 동일한 값을 가짐
    expect(copiedObject).not.toBe(originalObject); // 원본 객체와 복사된 객체가 동일한 객체가 아님
  });

  it("중첩 객체 속성이 있는 객체의 깊은 복사", () => {
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
    expect(copiedObject).toEqual(originalObject);
    expect(copiedObject).not.toBe(originalObject);
    recursivelyCheckNestedProperties(originalObject, copiedObject); // 중첩 객체 속성 테스트
  });

  it("빈 객체 깊은 복사", () => {
    const originalObject = {};

    const copiedObject = deepCopy(originalObject);
    expect(copiedObject).toEqual(originalObject);
    expect(copiedObject).not.toBe(originalObject);
  });

  it("2차 이상 중첩 객체 속성이 있는 객체의 깊은 복사", () => {
    const originalObject = {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "New York",
        country: "USA",
      },
      career: {
        first: {
          company: "ABC Inc",
          position: "Software Engineer",
          years: 5,
        },
        second: {
          company: "DEF Inc",
          position: {
            title: "Senior Software Engineer",
            level: 3,
          },
          years: 3,
        },
      },
    };

    const copiedObject = deepCopy(originalObject);
    expect(copiedObject).toEqual(originalObject);
    expect(copiedObject).not.toBe(originalObject);
    recursivelyCheckNestedProperties(originalObject, copiedObject);
  });

  it("배열 포함된 객체의 깊은 복사", () => {
    const originalObject = {
      name: "John",
      age: 30,
      city: "New York",
      hobbies: ["reading", "music", "traveling"],
    };

    const copiedObject = deepCopy(originalObject);
    expect(copiedObject).toEqual(originalObject);
    expect(copiedObject).not.toBe(originalObject);
    recursivelyCheckNestedProperties(originalObject, copiedObject);
  });
});
