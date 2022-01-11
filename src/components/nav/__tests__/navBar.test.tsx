import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router";
import { NavBar } from "../navBar";
import React from "react";

jest.mock("../mobileDropdownButton", () => ({
  MobileDropdownButton: (props: {
    open: boolean;
    handleToggle: VoidFunction;
  }) => (
    <button onClick={props.handleToggle} data-testid="test-button">
      {props.open ? "open" : "closed"}
    </button>
  ),
}));

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("navBar.", () => {
  it("uses the button to change the state", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    expect(button).not.toBeNull();

    expect(button).toHaveTextContent("closed");
    button.click();
    expect(button).toHaveTextContent("open");
    button.click();
    expect(button).toHaveTextContent("closed");
  });
});
