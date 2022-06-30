const { Router } = require("express");
const { getChat } = require("../controllers/messageController");
const { validateJWT } = require("../middlewares/jwt_validate");

const router = Router();

router.get("/:from", validateJWT, getChat);

module.exports = router;
