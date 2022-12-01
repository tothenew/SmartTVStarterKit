const app = require('./app');
const platform = require('./platform');
const help = require('./help');
const component = require('./component');

module.exports={
    exeCommand: exeCommand
}

function exeCommand(params){
    let cmd = params[0].toLowerCase();
    switch(cmd){
        case 'create':
            app.generateApp(params);
            break;
        case 'add':
            check_add_cmd(params);
            break;
        case 'delete':
            check_delete_cmd(params);
            break;   
        case 'help':
            help.showHelp();
            break;       
    }
}

function check_add_cmd(params){
    switch(params[1]){
      case 'platform':
        platform.addPlatform(params[2]);
        break;
      case 'component':
      case 'fcomponent':
        component.createComponent(params);
        break;  
    }
}

function check_delete_cmd(params){
    switch(params[1]){
      case 'platform':
        platform.addPlatform(params[2]);
        break;
      case 'component':
        break;  
    }
}