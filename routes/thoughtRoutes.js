const router = require('express').Router();
const User = require('../models/User');
const Thought  = require('../models/Thought');

router.get("/", async (req, res) =>{
    const allThoughts = await Thought.findOne({});
    res.json(allThoughts);
});

router.get("/:id", async (req, res) =>{
    const oneThought = await Thought.findById(req.params.id);
    res.json(oneThought);
});

router.post("/", async (req, res) =>{
    const newThought = await Thought.create(req.body);
    const updateUser = await User.findOneAndUpdate(
        {where: {username: req.body.username}}, 
        { $push: { thoughts: newThought._id } },
        { new: true }
    );
    res.json(updateUser);
});

router.put("/", async (req, res) => {
    const updateThought = await Thought.findByIdUpdate(req.params.id, req.body);
    res.json(updateThought)
});

router.delete("/", async (req, res) => {
    const removeThought = await Thought.findByIdAndDelete(req.params.id);
    res.json(removeThought);
});

router.post("/:thoughtId/reactions", async (req, res) =>{
    const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { new: true }
    )
    res.json(thought);
});

router.delete("/:thoughtId/reactions", async (req, res) =>{
    const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
    )
    res.json(thought);
});

module.exports = router;
