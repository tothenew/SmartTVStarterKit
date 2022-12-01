const path = require("path");
const utils = require("./utils");

module.exports = {
  createComponent
};

function createComponent(params) {
   console.log(params);
   switch(params[1]){
     case 'component':
        createClassComponent(params[2]);
        break;
     case 'fcomponent':
        createFunctionalComponent(params[2]);
        break;   
   }
}

function createClassComponent(componentName) {
    if (componentName) {
        componentName =
          componentName.charAt(0).toUpperCase() + componentName.slice(1);
        let component = `
        import React from 'react';
    
        class ${componentName} extends React.Component {
            render() {
                return <div>Welcome to ${componentName}</div>;
              }
        }
        export default ${componentName};`;
        const componentPath = path.join(
          process.cwd(),
          "src",
          "components",
          `${componentName}`
        );
        utils.createDirectory(componentPath);
        utils.writeDataToFile(
          component,
          path.join(componentPath, `${componentName}.js`)
        );
      } else {
      }
}

function createFunctionalComponent(componentName) {
  if (componentName) {
    componentName =
      componentName.charAt(0).toUpperCase() + componentName.slice(1);
    let component = `
    import React from 'react';

    const ${componentName}=(props)=>{
    return (
        <div>Welcome to ${componentName}</div>
        );
    }
    export default ${componentName};`;
    const componentPath = path.join(
      process.cwd(),
      "src",
      "components",
      `${componentName}`
    );
    utils.createDirectory(componentPath);
    utils.writeDataToFile(
      component,
      path.join(componentPath, `${componentName}.js`)
    );
  } else {
  }
}

