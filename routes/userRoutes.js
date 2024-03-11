const router = require('express').Router();
const User  = require('../models/User');

router.get("/", async (req, res) =>{
    const allUsers = await User.find({});
    res.json(allUsers);
});

router.get("/:id", async (req, res) =>{
    const oneUser = await User.findById(req.params.id);
    res.json(oneUser);
});

router.post("/", async (req, res) =>{
    const newUser = await User.create(req.body);
    res.json(newUser);
});

router.put("/", async (req, res) =>{
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(updateUser)
});

router.delete("/", async (req, res) =>{
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.json(deleteUser);
});

router.post("/:userId/friends/:friendId", async (req, res) => {
    const updateFriend = await User.findByIdUpdate(
        req.params.userId, 
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
    );
    res.json(updateFriend);

router.delete("/:userId/friends/:friendId"), async (req, res) => {
    const removeFriend = await User.findByIdAndUpdate(
        req.params.userId,
        {$pull: { friends: req.params.friendId} },
        { new: true }
    );
    res.json(removeFriend)
}
});