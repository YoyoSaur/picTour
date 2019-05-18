const readline = require('readline');
const fs = require('fs');

var controller = {
  method: null,
  path: null,
  validation: `{}`,
  middleware: `[]`,
  controller: `async(req, res, next) => { res.json({hello: 'hello'} )}`
};
async function setupController(controller) {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  // get the method
  method = async () => {
    return new Promise((resolve) => {
      rl.question('What REST Method? ', (method) => {
        resolve(method)
      });
    })
  }
  // get the path
  path = async () => {
    return new Promise((resolve) => {
      rl.question('What is the path? ', (path) => {
        resolve(path)
      });
    })
  }
  // get the route, errors on invalid route file
  whichRoute = async () => {
    return new Promise((resolve) => {
      rl.question('What route? ', (route) => {
        resolve(route)
      });
    })
  }
  controller.method = await method();
  controller.path = await path();
  route = await whichRoute();
  let file_path = `routes/${route}.js`;
  console.log(`Adding controller to route/${route}`);
  var read = fs.readFileSync(file_path, 'utf8');
  var splitted = read.split('\n]');
  splitted[1] = `,
  {
    method: '${controller.method}',
    path: '${controller.path}',
    validation: ${controller.validation},
    middleware: ${controller.middleware},
    controller: ${controller.controller}
  }
]`;
  var controllerString = splitted.join('');
  fs.writeFileSync(file_path, controllerString);
  rl.close();
}

setupController(controller)