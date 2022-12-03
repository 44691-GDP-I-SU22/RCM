# Research Content Management

## Steps to create and run the application

#### 1.1. Creating a new React project

•	A new React project can be created by using command “npx create-react-app my-app” where my-app is your app name.

•	Developer can use any IDE for developing a react application.

•	After the above command is executed successfully a basic react application will be created.

### 1.2. Managing package.json

•	Developer needs to have an idea of how package.json plays an important role in developing an application.

•	Package.json consists of metadata where the file includes all the details of application that includes application name, version, dependencies installed and their version and debugging dependencies.

### 1.3. Adding components
	
•	Components are building blocks for react component. A react application can have many components where developer writes clean and efficient code in a component and embed the component to main file.

•	There are 2 types of components in react js. One is functional component and the other is class component.

### 1.4. Adding database to react application
	
•	To our react application we had chosen Firebase as primary database where our application has authentication, storage and managing the users.

•	To make firebase in sync with react application, developer needs to create a project in firebase and choose the application which he/she needs to develop so that firebase provides a snippet code which is ready to use.

•	We use the provided snippet by firebase in our react application by creating a new .js extension file.

•	By using above file we can import firebase functionalities to our react application.

### 1.5. Embedding components to App.js
	
•	All the components which were created in react application needs to embed in main file i.e., App.js so that whenever react application is run index.js renders App.js in strict mode and all the components in App.js will be displayed when application is run. 

### 1.6. Running the react application

•	After adding all the components to App.js the application needs to be run on the server side.

•	React application can be run on the server side using command “npm start” and the application can be viewed on localhost:3000.

•	In order to run the application some of the dependencies need to be installed and they can be installed by running the below commands in VS code terminal.

1.	npm install react-scripts –save
2.	npm install -S react-router-dom
3.	npm install --save react-firebase-hooks
