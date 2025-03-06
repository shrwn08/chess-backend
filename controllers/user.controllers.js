const User = require("../models/user.models");

const getUserById = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message : "User not found"});
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({error : "Error fetching user"})
    }
};

const createUser = async (req, res) => {
    try {
        const {username} = req.body;

        const existingUser = await User.findOne({username});

        if(existingUser) return res.status(400).json({message : "username already exists"});

        const newUser = await User.create({username});

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({error : "Error creating user"})
    }
};


const updateUserRating = async (req, res) => {
    try {
        const {userId} = req.params;
        const {rating} = req.body;

        const user = await User.findByIdAndUpdate(userId, {rating}, {new : true});

        if(!user){
            return res.status(404).json({message : "User not found"});
        }

        res.json(user)
    } catch (error) {
        res.status(500).json(user)
    }
};


const updateUserTimeSetting = async (req, res ) => {
    try {
        const {userId} = req.params;

        const {timeEnabled} = req.body;

        const user = await User.findByIdAndUpdate(
            userId, {timeEnabled}, {new : true}
        );
        if(!user) return res.status(404).json({message : "User not found"})

            res.json(user);
    } catch (error) {
        res.status(500).json({error : "Error updating user time setting"})
    }
};

module.exports = {
    getUserById, createUser, updateUserRating, updateUserTimeSetting
}