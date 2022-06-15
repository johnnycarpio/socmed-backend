const { Thoughts, User } = require('../models');

const thoughtsController = {
  getThoughts(req, res) {
    Thoughts.find({})
    .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .then(thoughtsData => {
        res.status(200).json(thoughtsData);
    })
    .catch(error => {
        res.status(400).json(error);
    });
  },
  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
    .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .then(thoughtsData => {
      if (!thoughtsData) {
          res.status(404).json({ message: 'No thought found at this id' });
          return;
      }
      res.status(200).json(thoughtsData);
    })
    .catch(error => {
        res.status(400).json(error);
    });
  },
  createThoughts({ body }, res) {
    Thoughts.create(body)
    .then(({ username, _id }) => {
      return User.findOneAndUpdate(
          { username: username },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true }
      )
    })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found at this id!' });
        return;
      }
      res.status(200).json(userData);
    })
    .catch(error => {
        res.status(400).json(error);
    });
  },
  updateThoughts({ body, params }, res) {
  Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(thoughtsData => {
      if (!thoughtsData) {
        res.status(404).json({ message: 'No thought found at this id!' })
      }
      res.status(200).json(thoughtsData);
    })
    .catch(error => {
        res.status(400).json(error);
    })
},
  deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
    .then(({ username }) => {
      return User.findOneAndUpdate(
        { username: username },
        { $pull: { thoughts: params.id } },
        { new: true }
      )
    })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'Thought not found!' });
        return;
      }
      res.status(200).json(userData);
    })
    .catch(error => {
        res.status(400).json(error);
    })
  },
  createReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then(thoughtsData => {
      if (!thoughtsData) {
          res.status(404).json({ message: 'Thought not found!' });
          return;
      }
      res.status(200).json(thoughtsData);
    })
    .catch(error => {
        res.status(400).json(error);
    });
  },
  removeReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(thoughtsData => {
      if (!thoughtsData) {
        res.status(404).json({ message: 'Thought not found!' });
        return;
      }
      res.status(200).json(thoughtsData);
    })
    .catch(error => {
      res.status(400).json(error);
    });
  }
};

module.exports = thoughtsController;