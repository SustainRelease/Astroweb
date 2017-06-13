var adminTools = require("../adminTools");

if (process.argv.length != 7) {
  console.error("Invalid input arguments (Requires [userEmail,name,description,imgPath,href])");
  return 0;
}

return adminTools.createProject(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6]);
