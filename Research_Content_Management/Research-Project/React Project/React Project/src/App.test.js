import React from "react";
import {render, fireevent} from '@testing-library/react';
import App, {validateInput} from './App';

describe("login", () =>{
    test("validate function should pass on correct input",() => {
        const text = "text@test.com";
        expect(validateInput(text)).toBe(true);
    });

    test("validate function should not pass on correct input",() => {
        const text = "text"; 
        expect(validateInput(text)).not.toBe(true);
    });

    test("login form should be in the document",() => {
        const component = render(<App/>);
        ///console.log(component);
        const labelNode = component.getByText("Email:");
        expect(labelNode).toBeInTheDocument();
    });

    test("Email field should consist of email address to login",() => {
        const component = render(<App/>);
        const emailInputNode = component.getByLabelText("Email:");
        expect(emailInputNode.getAttribute("Email")).toBe("email");
    });

    test("email input should accept text",() => {
        const {getByLabelText, getByText} = render(<App/>);
        const emailInputNode = getByLabelText("Email:");
        expect(emailInputNode.value).toMatch("");
        fireevent.change(emailInputNode, {target: {value: "testing" }});
        expect(emailInputNode.value).toMatch("testing");

        const errorMessageSignal = getByText("Email not valid");
        expect(errorMessageSignal).toBeInTheDocument();

        fireevent.change(emailInputNode, { target: { value: "testing@" }})

        expect(errorMessageSignal).not.toBeInTheDocument();
    });

    test("should be able to submit form", () => {
        const mockFn = jest.fn();
        const {getByRole} = render(<App handleSubmit={mockFn} />);
        const buttonNode = getByRole("button");
        fireevent.submit(buttonNode);
        expect(mockFn).toHaveBeenCalledTimes();
    });
});