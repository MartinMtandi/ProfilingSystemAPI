const {createUser, getUserById, getUsers, updateUser, deleteUser, login } = require("./userController");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/register", checkToken, createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserById);
router.patch("/", checkToken, updateUser);
router.delete("/", checkToken, deleteUser);
router.post("/login", login);

module.exports = router;