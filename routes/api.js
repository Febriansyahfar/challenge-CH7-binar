const router = require("express").Router();
const apiController = require("../controllers/apiController");
const restrict = require("../middlewares/restrict-jwt");
const token = require("../middlewares/check-token");

router.post("/v1/register", apiController.signUp);
router.post("/v1/login", token, apiController.signIn);
router.get("/v1/whoami", restrict, apiController.whoAmi);

router.post("/generate/:id", apiController.createRoom);
router.get("/generate/:id", apiController.viewDataRoom);
router.post("/room_id", apiController.joinRoom);
router.post("/fight", apiController.battleGame);
router.get("/result", apiController.getResult);

module.exports = router;