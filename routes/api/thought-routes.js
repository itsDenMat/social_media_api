const router = require('express').Router();
// Import all objects from thought-controller.js
const { getThoughts, getOneThought, createThought, updateThought, deleteThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

// API route to GET all and POST thoughts
router.route("/")
.get(getThoughts)
.post(createThought);

// API route to GET one thought, PUT and DELETE by thought ID
router.route("/:thoughtId")
.get(getOneThought)
.put(updateThought)
.delete(deleteThought);

// API route to POST new reaction
router.route("/:thoughtId/reactions")
.post(addReaction);

// API route to DELETE reaction by reaction ID
router.route("/:thoughtId/reactions/:reactionId")
.delete(removeReaction);

module.exports = router;