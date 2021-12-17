const router = require("express").Router();
const adminController = require("../controllers/adminController");
const restrict = require("../middlewares/restrict");

// endpoint signup & signin
router.get("/register", adminController.viewSignUp);
router.post("/register", adminController.signUp);
router.get("/signin", adminController.viewSignIn);
router.post("/signin", adminController.signIn);

// endpoint dashboard
router.get("/dashboard", restrict, adminController.viewDashboard);
router.get("/user", adminController.viewUSer);
router.post("/user", adminController.addUser);
router.get("/user/edit/:id", adminController.viewEditUser);
router.post("/user/edit/:id", adminController.editUser);
router.delete("/user/:id", adminController.deleteUser);

module.exports = router;

