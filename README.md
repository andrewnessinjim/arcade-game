# Arcade Game - Udacity Nanodegree Project

This is a learning project which focuses on using ES2015 features efficiently. Check out [this course][1] if you're interesting in learning  web development.

The project is built using [gulp][2]. [Babel][3] is used to transpile the ES2015 code so it can work in browsers that don't support them. [RequireJS][4] is used for ES2015 modules. [Bower][5] is used to pull dependencies that run in the browser. [npm][6] is used to pull dependencies that are needed to setup the gulp pipeline for the project. [eslint][7] is setup to catch errors as you type.

## Playing the game
1) Head over [here][8] to play the game.
2) The objective of the game is to reach the water on the other side of the stone blocks, without colliding with the bugs.
3) Use the up, right, down and left arrow keys to move the player around.
4) You can use the "On Screen Buttons" option on the bottom left corner of the window if you're on a mobile. This will diplay the arrow keys on screen which you can use to play the game.

## Running the game locally on your machine
1) Clone this repository and navigate to the cloned directory on your machine. This will be the project's root directory.

2) Ensure you have [node and npm][9] installed. node version used is `v8.10.0` and npm version is `5.6.0`.

3) Run the below command to install global utilities
`npm install -g bower`
`npm install -g gulp-cli`
`npm install -g live-server`

4) Run the below commands from the root directory to download all the dependencies:
`npm install`
`bower install`

5) Run the below command from the root directory to build and watch the project:
`gulp dev`

6) You should see a directory called `dev_dist` generated in your root directory. Navigate to this directory and run the below command:
`live-server`
You should see a message like this:
```$ live-server
Serving "<path-to-project>/arcade-game/dev_dist" at http://127.0.0.1:8080
Ready for changes
```

7) You can now play the game by visiting http://127.0.0.1:8080 in your browser.

### Optional: Setting up eslint in vscode
1) Install the [eslint][10] plugin for vscode.
2) Hit `F1` and select `ESLint:Enable ESLint`.
3) You should now see errors being listed in the `PROBLEMS` tab and also markers in your project files when you don't conform to the rules needed by the project.

Feel free to drop me an email at andrewnessinjim@yahoo.com if you're stuck anywhere or if you find the instructions insufficient :)

[1]: https://in.udacity.com/course/front-end-web-developer-nanodegree--nd001
[2]: https://gulpjs.com/
[3]: http://babeljs.io/
[4]: https://requirejs.org/
[5]: https://bower.io/
[6]: https://www.npmjs.com/
[7]: https://eslint.org/
[8]: https://andrewnessinjim.github.io/arcade-game/dist/index.html
[9]: https://nodejs.org/en/download/
[10]: https://github.com/Microsoft/vscode-eslint