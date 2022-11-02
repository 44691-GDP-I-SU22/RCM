import React from "react";
import {render, fireevent} from '@testing-library/react';
import App, {validateInput} from './App';

/// login form testing
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


///Register form testing
describe("register", () =>{
    test("validate function should pass on correct input",() => {
        const text = "text@test.com";
        expect(validateInput(text)).toBe(true);
    });

    test("validate function should not pass on correct input",() => {
        const text = "text"; 
        expect(validateInput(text)).not.toBe(true);
    });

    test("register form should be in the document",() => {
        const component = render(<App/>);
        ///console.log(component);
        const labelNode = component.getByText("Email:");
        expect(labelNode).toBeInTheDocument();
    });

    test("Email field should consist of email address to register",() => {
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

    test("password should be of minimum 6 characters in length for registering",() => {
        const {getByLabelText, getByText} = render(<App/>);
        const passwordInputNode = getByLabelText("Password:");
        expect(passwordInputNode.value).toMatch("");
        fireevent.change(passwordInputNode, {target: {value: "testing" }});
        expect(passwordInputNode.value).toMatch(value.length == 6);

        const errorMessageSignal = getByText("Password not valid");
        expect(errorMessageSignal).toBeInTheDocument();

        fireevent.change(passwordInputNode, { target: { value: "test" }})

        expect(errorMessageSignal).not.toBeInTheDocument();
    })

});