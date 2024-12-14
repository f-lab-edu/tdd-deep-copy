import deepCopy from "../src/index";
import { recursivelyCheckNestedProperties } from "./recursivelyCheckNestedProperties";

describe("배열 깊은 복사 테스트", () => {
  it("원시값 속성만을 가진 배열의 깊은 복사", () => {
    const originalArray = [
      1,
      "John",
      true,
      null,
      undefined,
      Symbol("symbol"),
      -Infinity,
      Infinity,
      NaN,
      BigInt(1234567890),
    ];

    const copiedObject = deepCopy(originalArray);
    expect(copiedObject).toEqual(originalArray); // 원본 배열과 복사된 배열이 동일한 값을 가짐
    expect(copiedObject).not.toBe(originalArray); // 원본 객체와 복사된 객체가 동일한 배열이 아님
  });

  it("중첩 배열 속성이 있는 배열의 깊은 복사", () => {
    const originalArray = [
      1,
      "John",
      true,
      null,
      undefined,
      Symbol("symbol"),
      -Infinity,
      Infinity,
      NaN,
      BigInt(1234567890),
      [1, 2, 3],
      [1, 2, [3, 4, 5]],
      [1, 2, [3, 4, [5, 6, 7]]],
    ];

    const copiedObject = deepCopy(originalArray);
    expect(copiedObject).toEqual(originalArray);
    expect(copiedObject).not.toBe(originalArray);
    recursivelyCheckNestedProperties(originalArray, copiedObject); // 중첩 배열 속성 테스트
  });
});