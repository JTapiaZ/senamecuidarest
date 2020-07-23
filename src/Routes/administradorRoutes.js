const router = require("express").Router();
const { /* userRegister,*/  userLogin } = require("../utils/Auth");



// //Admin Registration Route
// router.post("/register-admin", async (req, res) => {
//   await userRegister(req.body, "admin", res);
// });


//Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

module.exports = router;
