const fs = require("fs");
const path = require("path");
// const { exec, spawn } = require("node:child_process");
const child_process = require('child_process');

const utils = require("./utils");

module.exports = {
  generateApp,
};

function generateApp(params) {
  let cmd = "";
  if (params[1]) {
    cmd = params[1].toLowerCase();
    switch (cmd) {
      case "app":
        createApp(params);
        break;
    }
  } else {
    console.log("command missing, please type 'tvgen help' to know more.");
  }
}

function createApp(params) {
  try {
    if (params[2]) {
      const folderName = params[2].toLowerCase();
      const currentDir = process.cwd();
      const completePath = path.join(currentDir, folderName);
      if (!fs.existsSync(completePath)) {
        fs.mkdirSync(completePath);
        createStructure(completePath);
        createPackageJsonFile(completePath, folderName);
        copyWebpackFile(completePath);
        setTimeout(()=>{
          executeModuleInstaller(folderName);
        },2000);
        
      } else {
        console.log(
          "project with same name already exist in current directory."
        );
      }
    } else {
      console.log("project name not specified.");
    }
  } catch (err) {
    console.error(err);
  }
}

function createStructure(currentDir) {
  const srcPath = path.join(currentDir, "src");
  fs.mkdirSync(srcPath);
  const componentsPath = path.join(srcPath, "components");
  fs.mkdirSync(componentsPath);
  const pagesPath = path.join(srcPath, "pages");
  fs.mkdirSync(pagesPath);
  const modulesPath = path.join(srcPath, "modules");
  fs.mkdirSync(modulesPath);
  const platformsPath = path.join(srcPath, "platforms");
  fs.mkdirSync(platformsPath);
  utils.copyFiles(path.join(__dirname,'/primary-files'),path.join(srcPath));
  utils.copyFile(path.join(__dirname,'/build-tools/.babelrc'),path.join(currentDir));
  utils.copyFile(path.join(__dirname,'/build-tools/.gitignore'),path.join(currentDir));
  utils.copyFile(path.join(__dirname,'/build-tools/d.txt'),path.join(srcPath,'dependency.js'));
  utils.copyFile(path.join(__dirname,'/build-tools/sm.txt'),path.join(srcPath,'source-mapper.js'));
}

function createPackageJsonFile(currentDir, appname) {
  const package_target = path.join(__dirname, "build-tools", "package.txt");
  const package_destination = path.join(currentDir, "package.json");
  utils.writeFile(package_target, package_destination, { appname });
}

function copyWebpackFile(currentDir) {
  const webpack_target = path.join(__dirname, "build-tools", "webpack.txt");
  const webpack_destination = path.join(currentDir, "webpack.js");
  const webpack_dev_target = path.join(
    __dirname,
    "build-tools",
    "webpack.dev.txt"
  );
  const webpack__dev_destination = path.join(currentDir, "webpack.dev.js");
  const webpack_prod_target = path.join(
    __dirname,
    "build-tools",
    "webpack.prod.txt"
  );
  const webpack_prod_destination = path.join(currentDir, "webpack.prod.js");
  utils.writeFile(webpack_target, webpack_destination);
  utils.writeFile(webpack_dev_target, webpack__dev_destination);
  utils.writeFile(webpack_prod_target, webpack_prod_destination);
}

function executeModuleInstaller(folderName) {
  try {
    let destination = path.join(process.cwd(),folderName);
    child_process.execSync(`cd ${destination} && npm install`,{stdio:[0,1,2,3,4]});
  } catch (err) {
    console.log(err)
  }
}
