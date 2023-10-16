const { User, Thoughts } = require('../models');

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //   get single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findOne({
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
      const thought = await Thoughts.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'no user with given ID' });
      }
      res.json('thought successfully created');
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // update thought
  async updateThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
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
      const thought = await Thoughts.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: 'no thought with given ID' });
      }
      await Thoughts.deleteMany({ _id: { $in: Thoughts.User } });
      res.json({ message: 'thought deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create reaction
  async createReaction(req, res) {
    try {
      const reaction = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true }
      );
      res.json(reaction);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // delete reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!reaction) {
        res.status(404).json({ message: 'no reaction with given ID' });
      }
      res.status(200).json({ message: 'reaction deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
