const express = require("express");
const router = express.Router();
const controller = require("../Controllers/controller");

router.post("/AddEmployee", controller.AddEmployee);
router.put("/UpdateEmployee/:id", controller.updateEmployee);
router.delete("/DeleteEmployee/:id", controller.deleteEmployee);

module.exports = router;
