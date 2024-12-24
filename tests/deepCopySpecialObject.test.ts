import { deepCopy } from "../src/index";

describe("객체 깊은 복사 테스트", () => {
  it("Date 객체 깊은 복사", () => {
    const originalDate = new Date();
    const copiedDate = deepCopy(originalDate);

    // 복사한 객체의 기본 값 확인
    expect(copiedDate instanceof Date).toBe(true);
    expect(copiedDate).toEqual(originalDate);
    expect(copiedDate).not.toBe(originalDate);

    // 복사 객체 값 변경 시 원본 객체에 영향 X
    copiedDate.setFullYear(copiedDate.getFullYear() + 1);
    expect(copiedDate.getFullYear()).not.toEqual(originalDate.getFullYear());
    copiedDate.setMonth(copiedDate.getMonth() + 1);
    expect(copiedDate.getMonth()).not.toEqual(originalDate.getMonth());
    copiedDate.setDate(copiedDate.getDate() + 1);
    expect(copiedDate.getDate()).not.toEqual(originalDate.getDate());
    copiedDate.setMilliseconds(copiedDate.getMilliseconds() + 500);
    expect(copiedDate.getMilliseconds()).not.toBe(
      originalDate.getMilliseconds()
    );
    expect(copiedDate.getTime()).not.toBe(originalDate.getTime());
  });

  it("정규표현식 객체 깊은 복사", () => {
    const originalRegEx = /abc/gi;
    const copiedRegEx = deepCopy(originalRegEx);

    expect(copiedRegEx instanceof RegExp).toBe(true);
    expect(copiedRegEx).toEqual(originalRegEx);
    expect(copiedRegEx).not.toBe(originalRegEx);
  });
});
