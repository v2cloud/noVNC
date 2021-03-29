# Bundling noVNC version 1.2.0

```sh
cd prebuild
# install dependencies
npm install
# bundle noVNC
npm run build
```

## the noVNC bundle is stored in **dist** folder

1. gulpfile: copy and process noVNC source code to **src** folder
2. index.js: is the entry point of webpack, use to import css and js files to **vnc.html** file
3. webpack.config.js: bundle **src** folder to **dist** folder