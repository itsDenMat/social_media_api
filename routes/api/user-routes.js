const router = require('express').Router();
const { getUsers, getOneUser, createNewUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/user-controller');

router.route("/").get(getUsers).post(createNewUser);

router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;