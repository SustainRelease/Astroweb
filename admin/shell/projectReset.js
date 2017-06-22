var adminTools = require("../adminTools");

var db = adminTools.setUpMongo("astroweb", true);
return adminTools.createUser("robbiemuir7@gmail.com", "Robbie", "Ab/Ab351",function () {
  adminTools.createUser("chelsea@gmail.com", "Chelsea", "chelsea", function () {
    adminTools.createProject ("chelsea@gmail.com", "Revolt",
    "Revolt is a new company working with Mexican designers to bring ethically-made clothing to France.",
    "revolt.png", "/revolt", function () {
      adminTools.createProject("public", "Dylan", "We are all very concerned about Dylan.",
      "dylan.jpg", "https://www.facebook.com/dylanturney");
    });
  });
});
