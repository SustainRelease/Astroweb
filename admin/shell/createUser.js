var adminTools = require("../adminTools");

if (process.argv.length != 5) {
  console.error("Invalid input arguments (Requires [email,name,password])");
  return 0;
}

return adminTools.createUser(process.argv[2], process.argv[3], process.argv[4]);
