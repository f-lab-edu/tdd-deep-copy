import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.test.ts"], // 테스트 파일 경로 지정
};

export default config;
