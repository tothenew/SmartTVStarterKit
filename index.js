#!/usr/bin/env node
const path = require('path');
const fs   = require('fs');
const src = require('./src');
const cwd = process.cwd();
const cmd=process.argv.slice(2);

try{
  if(cmd && cmd.length>0){
     src.exeCommand(cmd);
  }else{
      console.log("Invalid command.\nType 'tvgen help' to know more about commands. ");
  }
}catch(e){
  console.log(e);
}