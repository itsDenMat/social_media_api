const { Thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .sort({ createdAt: -1 })
        .then((dbThoughtData) => {
            res.json(dbThoughtData);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Get a single thought using a thought ID
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'Unable to find thought!'});
            }
            res.json(dbThoughtData);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Create a new thought and push it to the user that it is associated with
    createThought(req, res) {
        Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                {
                    _id: req.body.userId
                },
                {
                    $push: { thoughts: dbThoughtData._id }
                },
                {
                    new: true
                }
            );
        }).then((dbUserData) => {
            if(!dbUserData) {
                return res.satus(404).json({ message: 'User ID is not valid!'});
            }
            res.json({ message: 'Sucessfully created thought!' });
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Update a single thought using a thought ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {
                _id: req.params.thoughtId
            },
            {
                $set: req.body
            },
            {
                runValidators: true,
                new: true
            }
        ).then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'Thought not found'});
            }
            res.json(dbThoughtData);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Delete a single thought using a thought ID 
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'Thought not found!'});
            }
            return User.findOneAndUpdate(
                {
                    thoughts: req.params.thoughtId
                },
                {
                    $pull: { thoughts: req.params.thoughtId }
                },
                {
                    new: true
                }
            );
        }).then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({ message: 'Thought created with no user!'});
            }
            res.json({ message: 'Successfully deleted thought!'});
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Create a new reaction on specific thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {
                _id: req.params.thoughtId
            },
            {
                $addToSet: { reactions: req.body }
            },
            {
                runValidators: true,
                new: true
            }
        ).then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'Thought not found!' });
            }
            res.json(dbThoughtData);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Remove a specific reaction using a reaction ID 
    removeReaction(req,res) {
        Thought.findOneAndUpdate(
            {
                _id: req.params.thoughtId
            },
            {
                $pull: { reactions: { reactionId: req.params.reactionId }}
            },
            {
                runValidators: true,
                new: true
            }
        ).then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(400).json({ message: 'Thought not found!'});
            }
            res.json(dbThoughtData);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = thoughtController;