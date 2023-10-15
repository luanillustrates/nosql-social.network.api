const { Thought, Reaction } = require('../models');

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //   get single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select('-__v');
      if (!thought) {
        return res.status(404).json({ message: 'no thought with given ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // update thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(400).json({ message: 'no thought with given ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        res.status(404).json({ message: 'no thought with given ID' });
      }
      await Thought.deleteMany({ _id: { $in: Thought.User } });
      res.json({ message: 'thought deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create reaction
  async createReaction(req, res) {
    try {
      const reaction = await Reaction.create(req.body);
      res.json(reaction);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // delete reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndDelete({
        _id: req.params.reactionId,
      });
      if (!reaction) {
        res.status(404).json({ message: 'no reaction with given ID' });
      }
      await Reaction.deleteMany({ _id: { $in: Reaction.User } });
      res.json({ message: 'reaction deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
