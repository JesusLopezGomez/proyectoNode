const express = require("express");
const router = express.Router();

const { validateJWT } = require("../middlewares/validateJwt");
const { renew } = require("../controllers/renew");

router.route("/").get([
    validateJWT,
],renew);

module.exports = router;
