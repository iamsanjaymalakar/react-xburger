[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/iamsanjaymalakar/react-xburger/">
    <img src="src/assets/images/burger_logo.png" alt="Logo" width="60" height="50">
  </a>

  <h3 align="center">xBurger</h3>

  <p align="center">
    Online burger ordering app created with React.
    <br />
    <a href="https://react-xburger.web.app/">View Demo</a>
    <br>
    <a href="https://react-xburger.web.app/">https://react-xburger.web.app/</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://ecommerce99.herokuapp.com/)

This was created while learning React.js from a Udemy course (React - The Complete Guide (incl Hooks, React Router, Redux).

I have learned:
* React JSX
* Class and function components
* Lifecycle methods
* React Router
* React Hooks
* Redux
* Jest
* Enzyme

### Built With
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [React Router](https://reactrouter.com/)

## Getting Started

### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key for Firebase authentication.
2. Clone the repo
   ```sh
   git clone https://github.com/iamsanjaymalakar/react-xburger.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Setup your firebase authentication API key in file `src/store/actions/auth.js`.
   ```JS
   const API_KEY = 'FIREBASE_AUTH_API_KEY';
   ```
5.  Setup your firebase database URL in `src/axios-orders.js`/. Store a JSON in your database with key `ingredients`.
    ```JS
    "ingredients" = {
        "bacon":0,
        "cheese":0,
        "meat":1,
        "salad":0
    }
    ```
6. Firebase database rules: 
    ```JS
    {
    "rules": {
        "ingredients": {
            ".read": "true",
            ".write": "true"
        },
        "orders": {
            ".read": "auth != null",
            ".write": "auth != null",
            ".indexOn" : ["userId"]
        }
    }
    ```
5. Run the project using npm.
   ```sh
   npm start
   ``` 



<br>



<!-- CONTACT -->
## Contact

Sanjay Malakar - [@19malakar](https://twitter.com/19malakar) - iamsanjaymalakar@gmail.com

Project Link: [https://github.com/iamsanjaymalakar/react-xburger](https://github.com/iamsanjaymalakar/react-xburger)

<br>

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Udemy React course by Maximilian Schwarzmüller](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)


[contributors-shield]: https://img.shields.io/github/contributors/iamsanjaymalakar/react-xburger.svg?style=for-the-badge
[contributors-url]: https://github.com/iamsanjaymalakar/react-xburger/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/iamsanjaymalakar/react-xburger.svg?style=for-the-badge
[forks-url]: https://github.com/iamsanjaymalakar/react-xburger/network/members
[stars-shield]: https://img.shields.io/github/stars/iamsanjaymalakar/react-xburger.svg?style=for-the-badge
[stars-url]: https://github.com/iamsanjaymalakar/react-xburger/stargazers
[issues-shield]: https://img.shields.io/github/issues/iamsanjaymalakar/react-xburger.svg?style=for-the-badge
[issues-url]: https://github.com/iamsanjaymalakar/react-xburger/issues
[license-shield]: https://img.shields.io/github/license/iamsanjaymalakar/react-xburger.svg?style=for-the-badge
[license-url]: https://github.com/iamsanjaymalakar/react-xburgerblob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/sanjaymalakar/
[product-screenshot]: src/assets/images/demo.png
