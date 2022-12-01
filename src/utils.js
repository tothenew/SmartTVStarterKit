const fs = require("fs");
const path = require("path");

module.exports = {
  randomCode: randomString,
  copyFolder: copyFolderRecursiveSync,
  copyFile: copyFileSync,
  copyFiles:copyFilesSync,
  writeFile: writeFile,
  writeDataToFile:writeDataToFile,
  createDirectory:createDirectory
};

function randomString(length, chars) {
  var length = 10;
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

function copyFolderRecursiveSync(source, target) {
  var files = [];

  // Check if folder needs to be created or integrated
  var targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  // Copy script
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

function copyFilesSync(source, target) {
  var files = [];
  // Copy script
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
        copyFileSync(curSource, target);
    });
  }
}

function copyFileSync(source, target) {
  var targetFile = target;
  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }
  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function writeFile(source, target, replacibleObj) {
  fs.readFile(source, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    if (replacibleObj) {
      for (var key in replacibleObj) {
        let regex = `/${key}/g`;
        data = data.replace(new RegExp(key, "g"), replacibleObj[key]);
      }
    }

    fs.writeFile(target, data, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
}

function writeDataToFile(data, target) {
  fs.writeFile(target, data, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function createDirectory(dirPath){
  try{
  fs.mkdirSync(dirPath);
  }catch(err){}
}

function addSourceMapper(){

}

function addDependency(){
    
}

