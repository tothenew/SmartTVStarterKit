module.exports = {
  showHelp: showHelp,
};

function showHelp() {
    console.table(
        [
            { command: 'tvgen create app app_name', description: 'To create the new application.' }, 
            { command: 'tvgen add platform platform_name', description: 'To add platform capability like: tizen, webos, web.' }, 
            { command: 'tvgen delete platform platform_name', description: 'To remove platform capability like: tizen, webos, web.' }, 
            { command: 'tvgen add component component_name', description: 'To add new component.' }, 
            { command: 'tvgen add fcomponent component_name', description: 'To add new functional component.' }, 
        ]
      );
}
