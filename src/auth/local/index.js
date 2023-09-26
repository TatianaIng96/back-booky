const express = require("express");

const { loginHandler, activateAccountHandler } = require("./local.controller");

const router = express.Router();

router.post("/login", loginHandler);
router.get("/activate-account/:token", activateAccountHandler);

module.exports = router;
