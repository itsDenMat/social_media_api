const router = require('express').Router();
// Import all objects from user-controller.js
const { getUsers, getOneUser, createNewUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/user-controller');

// API route to GET all and POST
router.route("/")
.get(getUsers)
.post(createNewUser);

// API route to GET one user, PUT and DELETE by user ID
router.route("/:userId")
.get(getOneUser)
.put(updateUser)
.delete(deleteUser);

// API route to POST and DELETE by friend ID
router.route("/:userId/friends/:friendId")
.post(addFriend)
.delete(removeFriend);

module.exports = router;