const express = require("express");
const { getUserById,
  userLogin,
  createUser,
  updateUserRating,
  updateUserTimeSetting,
  refreshToken
} = require("../controllers/user.controllers");
const authenticateToken = require("../middleware/auth.middleware")

const router = express.Router();

router.post("/login", userLogin);
router.post("/register" , createUser);
router.post("/refresh-token", refreshToken);

router.get("/:userId", authenticateToken,  getUserById);
router.put("/:userId/rating", authenticateToken,  updateUserRating);
router.put("/:userId/time", authenticateToken, updateUserTimeSetting);

module.exports = router;
