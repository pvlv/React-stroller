import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Strollable, StrollableContainer } from "../src";

describe("Strollable", () => {
  it("should render correctly", () => {
    const { container } = render(<Strollable />);

    expect(container).toMatchSnapshot();
  });
});

describe("StrollableContainer", () => {
  it("should render correctly", () => {
    const { container } = render(
      <StrollableContainer>child</StrollableContainer>
    );

    expect(container).toMatchSnapshot();
  });

  it("should handle scroll", () => {
    const mockOnScroll = jest.fn();
    const { getByTestId } = render(
      <StrollableContainer onScroll={mockOnScroll}>child</StrollableContainer>
    );

    const scrollableElement = getByTestId("scrollable");
    fireEvent.scroll(scrollableElement);

    expect(mockOnScroll).toHaveBeenCalledTimes(1);
  });
});