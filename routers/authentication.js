const { Router } = require("express");
const { check } = require("express-validator");
const { createSession, renewToken } = require("../controllers/authController");
const { validateFields } = require("../middlewares/validate_fields");
const { validateJWT } = require("../middlewares/jwt_validate");

const router = Router();

router.post(
    "/",
    [
        check("email", "Please fill the email").isEmail(),
        check("password", "Please fill the password").not().isEmpty(),
        validateFields,
    ],
    createSession
);
router.get("/renew", validateJWT, renewToken);

module.exports = router;