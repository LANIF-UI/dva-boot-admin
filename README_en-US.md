English | [简体中文](./README.md)

<p align="center">
    <img alt="dva-boot-admin" src="https://user-images.githubusercontent.com/1697158/49214902-8f888180-f402-11e8-8207-84d5cdf9d9bf.png" width="140">
</p>
<h1 align="center">DVA Boot Admin</h1>
<h3 align="center">:lemon: :tangerine: :cherries: :cake: :grapes: :watermelon: :strawberry: :corn: :peach: :melon:</h3>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg">
  <img src="https://img.shields.io/badge/developing%20with-DVA%20BOOT%20ADMIN-2077ff.svg">
</p>

Based on the most mature technology system of the React ecosystem, an out-of-the-box back-end management system is built. The framework contains some unique custom components, as well as many third-party components that have been well-received and well-known. We hope that people who use it can quickly and stably develop robust, beautiful and easy-to-use web applications.


[GitHub](https://github.com/LANIF-UI/dva-boot-admin) |
[Gitee](https://gitee.com/wiqi/dva-boot-admin)

![](https://ucarecdn.com/b296e689-19fd-46f5-863e-40c0d4ba7a61/1.jpg)

## Table of Contents
* [Feature](#feature)
* [Project Structure](#structure)
* [Usage](#usage)
* [Document](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/index.md)
  - [Get Start](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/start.md)
  - [Configuration](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/config.md)
  - [Use ModelEnhance](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/modelEnhance.md)
  - [Use PageHelper](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/pageHelper.md)
  - [Components](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/components.md)
  - [API Mock](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/mock.md)
  - [Building for Production](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/build.md)
  - [FAQs](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/faqs.md)
* [Gallery](#gallery)
* [CHANGELOG](https://github.com/LANIF-UI/dva-boot-admin/blob/master/CHANGELOG.md)
* [End](#end)

## Feature
- **Encapsulate the data flow of the dva framework**,Simple requests can be defined without being defined in model and service.
- **Encapsulated api mock**,Can develop front-end functions independently of the background.
- **Encapsulated paging request**,Simplify and standardize paging logic.
- **Encapsulated fetch**,The best fetch tools.
- **Routing on demand loading**,First screen loading super fast.
- **Wrapped antd component**,Expanded many useful widgets.
- **Fractal project structure**,No need to distract other modules during development, to achieve minimum coupling.
- Build**2.09 MB**after gzip,less than **1 MB** general.
- Base on [dva-boot](https://github.com/LANIF-UI/dva-boot)
- Global exception handling, global request interception
- **Code autoconfiguration tool**[dva-boot-desktop](https://github.com/LANIF-UI/dva-boot-desktop)，coming soon:tada:

## Structure
```
.
├── public                   # Static public assets (not imported anywhere in source code)
├── templates                # Template file prepared for code generation
├── src                      # Application source code
│   ├── index.js             # Main HTML page container for app
│   ├── config.js            # Global configuration
│   ├── components           # Global Reusable Components
│   ├── layouts              # Components that dictate major page structure
│   │   ├── BasicLayout      # Basic page structure,configured in the route
│   │   └── OtherLayout      # Other layout,
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Main Route configured and async split points
│   │   ├── Home             # Fractal route
│   │   │   ├── index.js     # Route definitions and async split points
│   │   │   ├── assets       # Assets required to render components
│   │   │   ├── components   # Presentational React Components
│   │   │   ├── model        # dva model
│   │   │   ├── service      # dva service
│   │   │   └── routes **    # Fractal sub-routes (** optional)
│   │   └── Login            # Fractal route
│   │       ├── index.js     # Route definitions and async split points
│   │       ├── assets       # Assets required to render components
│   │       ├── components   # Presentational React Components
│   │       ├── model        # dva model
│   │       ├── service      # dva service
│   │       └── routes **    # Fractal sub-routes (** optional)
│   ├── utils                # Tools 
│   └── assets               # Global assets 
│           ├── fonts        # Fonts & Icons
│           ├── images       # Common Images
│           └── styles       # Global styles
```

## Usage

``` javascript
$ git clone https://github.com/LANIF-UI/dva-boot-admin.git
$ cd dva-boot-admin
// Installation
$ yarn
// Serves your app and open localhost:3000
$ yarn start
// Builds the application
$ yarn build
// Builds the application of graphical analysis
$ yarn build --analyze
```

## Compatibility

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- | 
| >= IE10 | last 2 versions | last 2 versions | last 2 versions | last 2 versions

## End

Welcome everyone to ask questions and PR

Group QQ 820881369 :penguin:

# Gallery

![](https://ucarecdn.com/7602439b-fa79-4a57-a2f1-c4448710c1c2/14.jpg)
![](https://ucarecdn.com/4de73808-81bf-4fe9-a6a7-fb21000f0e56/banner.gif)
![](https://ucarecdn.com/f1f5cb8f-5209-4b91-beaf-e9c0e3e3737f/111.gif)
![](https://ucarecdn.com/fcfdbd3f-3d43-4a1e-a090-10038f92e1a6/13.jpg)
![](https://ucarecdn.com/6f9862ab-d9e6-4bda-9c6f-9b6a608ccc2a/12.jpg)
![](https://ucarecdn.com/fd93aad7-7963-4cbb-9ffd-4a09c44ee0a0/11.jpg)
![](https://ucarecdn.com/5440ec1c-f524-46ab-826b-742f20476ddf/15.jpg)
![](https://ucarecdn.com/2f35d9c3-d5e8-4519-bfbc-a0ee310e6817/2.jpg)
![](https://ucarecdn.com/eaef12d9-c878-4311-a539-cf53fd461280/3.jpg)
![](https://ucarecdn.com/e44e4383-d49c-46a6-a708-dbc5078d33f4/4.jpg)
![](https://ucarecdn.com/bef74a5c-fc05-4dcb-8512-7429971110c1/6.jpg)
![](https://ucarecdn.com/55cdf8da-37e0-4f19-b24f-00f00eddf5e1/5.jpg)
![](https://ucarecdn.com/890cae0d-dcde-48b4-9434-19e5fee2c883/9.jpg)
![](https://ucarecdn.com/54014eec-406b-437f-9356-f466a1a868ab/7.jpg)
![](https://ucarecdn.com/4e8c9b75-11df-4108-8437-bdb2627e3ebc/8.jpg)
![](https://ucarecdn.com/7831ce59-f412-4109-a75c-2b9f86b78c43/10.jpg)
![](https://ucarecdn.com/4cbe9623-30ef-4410-9740-9e03c2f4a84e/mobile1.gif)
