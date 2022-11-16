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
    });

});

//Dashboard Form Testing
describe("dashboard", () =>{
    test("dashboard should display on correct login",() => {
        const text = "text@test.com";
        expect(validateInput(text)).toBe(true);
    });

    test("upload form should be in the document",() => {
        const component = render(<App/>);
        ///console.log(component);
        const labelNode = component.getByText("Upload:");
        expect(labelNode).toBeInTheDocument();
    });

    test("search form should be in the document",() => {
        const component = render(<App/>);
        ///console.log(component);
        const labelNode = component.getByText("Search:");
        expect(labelNode).toBeInTheDocument();
    });

    test("user should be able to logout", () => {
        const mockFn = jest.fn();
        const {getByRole} = render(<App handleSubmit={mockFn} />);
        const buttonNode = getByRole("logout");
        fireevent.submit(buttonNode);
        expect(mockFn).toHaveBeenCalledTimes();
    });

    test("user details should appear on the header of the page", () => {
        const pName = "Research Content Management";
        const username = component.getByText("username");
        const email = component.getByText("email");
        expect(pName,username,email).toBeInTheDocument();
    });
});

//Upload Form Testing
describe("upload", () =>{
    test("upload should display on correct login",() => {
        const text = "text@test.com";
        expect(validateInput(text)).toBe(true);
    });

    test("upload details should appear on the page", () => {
        const topic = component.getByText("topic");
        const yearOfPublishing = component.getByText("year");
        const title = component.getByText("title");
        const technique = component.getByText("technique");
        const uploadPaper = component.getByText("uploadPaper");
        expect(topic,yearOfPublishing,title,technique,uploadPaper).toBeInTheDocument();
    });

    // topic for the paper, 
    // year of publishing for the paper, 
    // title of the paper, 
    // and finally technique of the paper by 

    test("upload paper should consist of mandatory year and technique feild",() => {
        const {getByLabelText, getByText} = render(<App/>);
        const yearInputNode = getByLabelText("Year");
        expect( yearInputNode.value).toMatch(notNull);
        fireevent.change( yearInputNode, {target: {value: 2000}});
        expect( yearInputNode.value).toMatch(value.length == 2000);

        const errorMessageSignal = getByText("Year should not be empty");
        expect(errorMessageSignal).toBeInTheDocument();

        fireevent.change(yearInputNode, { target: { value: "test" }})

        expect(errorMessageSignal).not.toBeInTheDocument();

        const {getByLabelText1, getByText1} = render(<App/>);
        const techniqueInputNode = getByLabelText1("Technique");
        expect( techniqueInputNode.value).toMatch(notNull);
        fireevent.change( techniqueInputNode, {target: {value: "testing"}});
        expect( techniqueInputNode.value).toMatch(value.length == "testing");

        const errorMessageSignal1 = getByText1("Technique should not be empty");
        expect(errorMessageSignal1).toBeInTheDocument();

        fireevent.change(techniqueInputNode, { target: { value: 1000 }})

        expect(errorMessageSignal).not.toBeInTheDocument();

    });

    test("should be able to submit form", () => {
        const mockFn = jest.fn();
        const {getByRole} = render(<App handleSubmit={mockFn} />);
        const buttonNode = getByRole("upload");
        fireevent.submit(buttonNode);
        expect(mockFn).toHaveBeenCalledTimes();
    });

});

  //Search Form Testing
  describe("search", () =>{
    test("upload should display on correct login",() => {
        const text = "text@test.com";
        expect(validateInput(text)).toBe(true);
    });

    test("search details should appear on the page", () => {
        const topic = component.getByText("topic");
        const yearOfPublishing = component.getByText("year");
        const title = component.getByText("title");
        const technique = component.getByText("technique");
        const viewPdf = component.getByText("viewPdf");
        expect(topic,yearOfPublishing,title,technique,viewPdf).toBeInTheDocument();
    });

    test("should be able to get pdf form", () => {
        const mockFn = jest.fn();
        const {getByRole} = render(<App handleSubmit={mockFn} />);
        const buttonNode = getByRole("view pdf");
        fireevent.submit(buttonNode);
        expect(mockFn).toHaveBeenCalledTimes();
    });

});

  //Comments Form Testing
  describe("comment", () =>{
    test("should be able to get added comments for pdf form", () => {
        const mockFn = jest.fn();
        const {getByRole} = render(<App handleSubmit={mockFn} />);
        const buttonNode = getByRole("view comments");
        fireevent.submit(buttonNode);
        expect(mockFn).toHaveBeenCalledTimes();
    });

    test("should be able to add comments to pdf form", () => {
        const mockFn = jest.fn();
        const {getByRole} = render(<App handleSubmit={mockFn} />);
        const buttonNode = getByRole("add comments");
        fireevent.submit(buttonNode);
        expect(mockFn).toHaveBeenCalledTimes();
    });

    test("date details should appear on the page", () => {
        const time = component.getByText("time");
        const date = component.getByText("date");
        const year = component.getByText("year");
        expect(time,date,year).toBeInTheDocument();
    });

  });

