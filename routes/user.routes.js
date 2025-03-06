

const express = require('express');
const {
    getUserById,
    createUser,
    updateUserRating,
    updateUserTimeSetting,
  } = require("../controllers/user.controllers");

const router = express.Router();

router.get("/:userId", getUserById);
router.post("/", createUser);
router.put("/:userId/rating", updateUserRating);
router.put("/:userId/time", updateUserTimeSetting);




module.exports = router;