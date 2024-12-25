import { deepCopy } from "../src/index";

describe("객체 깊은 복사 테스트", () => {
  it("Date 객체 깊은 복사", () => {
    const originalDate = new Date();
    const copiedDate = deepCopy(originalDate);

    expect(copiedDate instanceof Date).toBe(true);
    expect(copiedDate).toEqual(originalDate);
    expect(copiedDate).not.toBe(originalDate);

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

  it("Set 객체 깊은 복사", () => {
    const originalSet = new Set([1, 2, 3, 4, 5]);
    const copiedSet = deepCopy(originalSet);

    expect(copiedSet instanceof Set).toBe(true);
    expect(copiedSet).toEqual(originalSet);
    expect(copiedSet).not.toBe(originalSet);

    copiedSet.add(6);
    copiedSet.delete(4);
    expect(originalSet.has(6)).toBe(false);
    expect(originalSet.has(4)).toBe(true);
  });

  it("Map 객체 깊은 복사", () => {
    const originalMap = new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
    const copiedMap = deepCopy(originalMap);

    expect(copiedMap instanceof Map).toBe(true);
    expect(copiedMap).toEqual(originalMap);
    expect(copiedMap).not.toBe(originalMap);

    copiedMap.set("d", 4);
    copiedMap.delete("b");
    copiedMap.set("c", 5);
    expect(originalMap.has("d")).toBe(false);
    expect(originalMap.get("b")).toBe(2);
    expect(originalMap.get("c")).not.toBe(5);
  });

  it("WeakMap, WeakSet 복사 시도 시에는 에러 발생", () => {
    const originalWeakMap = new WeakMap();
    const originalWeakSet = new WeakSet();

    expect(() => deepCopy(originalWeakMap)).toThrow(
      Error("WeakSet, WeakMap은 복사할 수 없습니다.")
    );
    expect(() => deepCopy(originalWeakSet)).toThrow(
      Error("WeakSet, WeakMap은 복사할 수 없습니다.")
    );
  });

  it("함수 깊은 복사", () => {
    function original(a: any) {
      return a;
    }
    original.prop = "prop";
    const copy = deepCopy(original);

    // 객체
    expect(copy).not.toBe(original);

    // 속성 추가, 변경
    original.prop = "변경된 prop";
    original.prop2 = "prop2";
    expect(copy.prop).toBe("prop");
    expect(copy.prop2).toBeUndefined();

    // 동작
    expect(copy(1)).toEqual(original(1));
  });

  it("순환 참조 깊은 복사", () => {
    const original: any = {};
    original.self = original;
    original.parent = { child: original };
    const copied = deepCopy(original);

    expect(copied).toEqual(original);
    expect(copied).not.toBe(original);
    expect(copied.self).toBe(copied);
    expect(copied.parent.child).toBe(copied);
  });

  it("class 깊은 복사", () => {
    class MyClass {
      constructor(public name: string, public age: number) {}
      testMethod(a: any) {
        return a;
      }
    }

    const original = new MyClass("John", 30);
    const copied = deepCopy(original);

    expect(copied instanceof MyClass).toBe(true);
    expect(copied).toEqual(original);
    expect(copied).not.toBe(original);

    copied.name = "Jane";
    expect(original.name).toBe("John");
  });
});
