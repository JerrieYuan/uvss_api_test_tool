# UVSS API Test Tool

## Description

A Web App for you to test the UVSS API. The App uses the following libraries and frameworks:

* [React](https://facebook.github.io/react/)
* [React-bootstrap](https://react-bootstrap.github.io/)
* [Bootstrap](http://getbootstrap.com/) (Theme: [Flaty](http://bootswatch.com/flatly/))
* [JQuery](http://jquery.com/)
* [Electron](https://electron.atom.io/)

## Build

* Install `node`, `npm` and install `create-react-app` via `npm`.
``` shell
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm install -g create-react-app
sudo npm install -g react-scripts
```
You may need to set proxy if you are in China, or use `cnpm` instead of `npm`. 
The `cnpm` is provided by taobao.
Refer to [npm.taobao.org](https://npm.taobao.org) to learn how to install it.

----

* Install all of the dependencies.
``` shell
cd uvss_api_test_tool
npm install 
```

----

* Install the Electron
Visit [https://electron.atom.io/](https://electron.atom.io/) , download and install the electron.  
Add the install dir to the enviroment value PATH, so that you can run `electron` in the command line.  

----

* Test the program in development mode
``` shell
npm test
```
The command will run the code in debug mode.

----

* Build the program
  * Build the src
  ``` shell
  npm run build
  ```
  The target will be in the target directory `build/`.

  * Run the target
  ```shell
  cd build
  electron .
  ```