const { json } = require('express');
const { User, Thought } = require('../models');

const userController = {
    getUsers(req,res) {
        User.find()
        .select('-__v')
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({ message: 'User ID is not valid!'});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    createNewUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            {
                _id: req.params.userId,
            },
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true,
            }
        )
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({ message: 'User ID is not valid!' });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
// Delete user
// Add friend
// Remove friend

};