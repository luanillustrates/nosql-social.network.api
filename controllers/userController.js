const { User, Thoughts } = require('../models');

module.exports = {
  // get user
  async getUser(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // get single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        '-__v'
      );
      if (!user) {
        return res.status(404).json({ message: 'no user with given ID' });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'no user with given ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete user and associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'no user with given ID' });
      }
      await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'user and thoughts deleted' });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // add friend
  async addFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!friend) {
        return res.status(404).json({ message: 'no user with given ID' });
      }
      return res.status(200).json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete friend
  async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!friend) {
        return res
          .status(404)
          .json({ message: 'no user found with given friend' });
      }
      res.json(friend);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
