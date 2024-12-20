import React from "react";
import { ConfirmModelComponent } from "../../../src/components/spaces/ConfirmModelComponent";
import ReactDOM from "react-dom";
import { fireEvent } from "@testing-library/react";
describe("Confirm modal test suite", () => {
  const closeMock = jest.fn();
  let container: HTMLDivElement;
  test("Setup test showing modal", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(
      <ConfirmModelComponent close={closeMock} content={"Some content"} show={true} />,
      container
    );
  });
  test("showing modal text correctly", () => {
    const modalText = container.querySelector("h3");
    expect(modalText!.textContent).toBe("Some content");
  });
  test("modal button action", () => {
    const modalButton = container.querySelector("button");
    fireEvent.click(modalButton!);
    expect(closeMock).toHaveBeenCalled();
  });
  test("teardown test with show", () => {
    document.body.removeChild(container);
    container.remove();
  });
  test("Setup test hiding modal", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(
      <ConfirmModelComponent close={closeMock} content={"Some content"} show={false} />,
      container
    );
  });
  test("hiding modal", () => {
    expect(container).toBeEmptyDOMElement();
  });
});