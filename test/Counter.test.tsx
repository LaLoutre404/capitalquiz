import { it, describe, expect, assert, vi } from "vitest";
import { setup } from "./utils";
import { Counter } from "../src/Counter";
import ReactDOM from "react-dom/client";
import { act } from "@testing-library/react";
import React from "react";

describe("Counter", () => {
  it("should increment when clicking on increment button", async () => {
    // On créer un container
    const container = document.createElement("div");
    document.body.append(container);

    act(() => {
      // On fait comme dans une vrai application :
      // On créer une `root` React puis on rend notre component React à l'intérieur
      const root = ReactDOM.createRoot(container);
      root.render(<Counter />);
    });

    console.log(document.body.innerHTML);

  });
});
