const router = require("express").Router();
const {  /*userRegister,*/  userLogin } = require("../utils/AuthSeguridad");



// //Admin Registration Route
// router.post("/register-seguridad", async (req, res) => {
//   await userRegister(req.body, "security", res);
// });


//Admin Login Route
router.post("/login-seguridad", async (req, res) => {
  await userLogin(req.body, "security", res);
});

module.exports = router;
