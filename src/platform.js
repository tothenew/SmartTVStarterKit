const fs = require("fs");
const path = require('path');
const utils = require('./utils');

module.exports={
    addPlatform: addPlatform
}

function addPlatform(platform){
    switch(platform){
        case 'tizen':
            add_tizen(platform);
            break;
        case 'webos':
            add_webos(platform);
            break;
        case 'web':
            add_web(platform);
            break;         
    }
}

function add_tizen(platform){
    const currentDir = process.cwd();
    const destinationPath = path.join(currentDir, 'src/platforms');
    const sourcePath = path.join(__dirname, 'platforms',platform);
    utils.copyFolder(sourcePath,destinationPath);
    let package_id=utils.randomCode();
    let app_name= path.basename(process.cwd());
    let configSource = path.join(destinationPath,platform,'config.xml');
    let projectSource = path.join(destinationPath,platform,'.project');
    utils.writeFile(configSource,configSource,{app_name,package_id});    
    utils.writeFile(projectSource,projectSource,{app_name});    
}

function add_webos(platform){
    const currentDir = process.cwd();
    const destinationPath = path.join(currentDir, 'src/platforms');
    const sourcePath = path.join(__dirname, 'platforms',platform);
    utils.copyFolder(sourcePath,destinationPath);
    let app_name= path.basename(process.cwd());
    let configSource = path.join(destinationPath,platform,'appinfo.json');
    let projectSource = path.join(destinationPath,platform,'.project');
    utils.writeFile(configSource,configSource,{app_name});    
    utils.writeFile(projectSource,projectSource,{app_name});     
}

function add_web(platform){
    const currentDir = process.cwd();
    const destinationPath = path.join(currentDir, 'src/platforms');
    const sourcePath = path.join(__dirname, 'platforms',platform);
    utils.copyFolder(sourcePath,destinationPath);
}
