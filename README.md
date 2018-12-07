# A Webpack Configuration Template
+ My personal Webpack template, which is updated frequently.

# Supported Features/Tools
+ React
+ React-Router
+ Redux
+ React-Hot-Loader
+ Sass --> CSS
+ Typescript
+ Jest
+ ES6

# Setting up the Application
```zsh
# Clone the repo
cd $name
yarn install
```
# Scripts in Package.json

## dev script
```javascript
// yarn run dev
"dev": "yarn run webpack-dev-server --env.mode development --open --hot --host 0.0.0.0",
```
+ This scripts runs the application in development mode.
+  `--open` will automatically open the application in your default web browser
+ `--hot` is used for hot module replacement. As you edit your SCSS files or React components, the application will be "patched." In other words, the browser won't fully refresh as you develop and only update the current React component or SCSS file you are editing.
+ `--host 0.0.0.0` allows you to open the application via your iPhone, iPad, or any other device connected to the current network.

    + To use, run ifconfig in the terminal:
    ```zsh
    # Run the command ifconfig and look for 'inet'
    # You should see something like: inet 122.134.2.6 (I made up these numbers as an example)
    ifconfig

    # Finally, grab your phone or any other device, open a browser, and enter: http://122.134.2.6:8080

    # Note: 8080 is the current port at which the application is running. Yours might differ so make sure to the enter the correct port your application is running on.
    ```
## prod script
```javascript
// yarn run prod
"prod": "yarn run webpack --env.mode production",
```
+ Bundles our application and outputs three files to a new directory called `build`. This command also minifies your JavaScript and CSS.
    + In there, you'll find three files: `index.html, main.css, and main.js`

## prod:analyze
```javascript
// yarn run prod:analyze
"prod:analyze": "yarn prod --env.presets analyze",
```
+ Does exactly the same thing as `yarn run prod` except it will open a browser window where we can check the size of each file used in our application.
+ This command is great for detecting large files or duplicate modules

## prod:compress
```javascript
// yarn run prod:compress
"prod:compress": "yarn prod --env.presets compress",
```
+ Does exactly the same thing as `yarn run prod`.
+ However, in addition to the three files generated in the `build` directory, this command will also generate 3 compressed files corresponding to: `index.html, main.css, and main.js.`

## test
```javascript
// yarn run test
"test": "jest --coverage",
```
+ Will run all our Jest test in our application and generate a report, which can be accessed in the directory `coverage/lcov-report/index.html`

## test:watch
```javascript
// yarn run test:watch
"test:watch": "jest --watch"
```
+ This command will watch our tests and give us live feedback as we write/update our tests.
