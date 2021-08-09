# QBook

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Currently there are 9 basic tests.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Time log

Time log is available in TIMELOG.MD file.

## Project folder structure

There are three main folders `data-access`,`feature`,`utils`.

### Data access

Data access folder is for services and its data models(interfaces) which are contacting backend for getting data.

### Feature

Feature folder is for feature components that can be shared in the project.

Each component is dependent on things that it needs and every component can be standalone component.

#### Comment feature

Comment feature is feature that shows comments depending on postId that is passed to this component by client component.

#### Posts feature

Posts feature is main feature in this project. It has three subfolders `post`,`post-details` and `post-overview`. This feature is dependent on comments feature.

`post` folder contains post component that shows posts depending on observable that you pass to it.

`post-details` folder contains post details component that shows post details depending on state that is set on runtime. If state is not set, user is redirected to error page.

`post-overview` folder contains post overview component. In this folder there is main logic for this feature. It contains container and presentation folders. Container component delegates data and logic to presentation components that only show/search data.

### Utils

Utils folder is for util components that can be shared in the project.

#### State management

State management class is class that provides state for saving data on runtime. Data can be access through whole project by injecting state class to client component. State management is actually BehaviorSubject that contains data.
