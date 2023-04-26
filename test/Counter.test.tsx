import { it, describe, expect, assert, vi } from "vitest";
import { setup } from "./utils";
import { Counter } from "../src/Counter";
import ReactDOM from "react-dom/client";
import { act } from "@testing-library/react";
import React from "react";

describe("Counter", () => {
  it("should increment when clicking on increment button", async () => {

    const container = document.createElement("div");
    document.body.append(container);

    act(() => {

      const root = ReactDOM.createRoot(container);
      root.render(<Counter />);
    });

    console.log(document.body.innerHTML);

  });
});
