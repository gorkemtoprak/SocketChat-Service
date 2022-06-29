const { validateJWT } = require("../middlewares/jwt_validate");
const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate_fields");
const { createUser, getUsers } = require("../controllers/userController");

const router = Router();

router.get("/", validateJWT, getUsers);

router.post(
    "/",
    [
        check("name", "Please enter your name").not().isEmpty(),
        check("email", "Please enter your email").isEmail(),
        check("password", "Please enter your password").not().isEmpty(),
        validateFields,
    ],
    createUser
);

module.exports = router;