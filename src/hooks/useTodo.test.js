import { renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useTodo } from "./useTodo";
import { act } from "react-dom/test-utils";

describe("【アプリテスト】useAppTest", () => {
  describe("【関数テスト】onChangeAddInputValue", () => {
    test("【正常系】addInputValueが更新できること", () => {
      const expectValue = "テスト";
      const eventObject = {
        target: {
          value: expectValue,
        },
      };
      const { result } = renderHook(() => useTodo());
      expect(result.current[0].addInputValue).toBe("");
      act(() => result.current[1].onChangeAddInputValue(eventObject));
      expect(result.current[0].addInputValue).toBe(expectValue);
    });
  });
});
