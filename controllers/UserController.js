const { Users, Thoughts } = require('../models');

const UserController = {
  getAllUsers(req, res) { 
    Users.find({}).populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
    .then(userData =>  { 
      console.log(userData);
      res.status(200).json(userData);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  },
  getUserById({ params }, res) {
    Users.findOne({_id: params.id }).populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
    .then(userData => {
      if(!userData) {
        res.status(404).json({message: 'No user found!'});
      }
      console.log(userData);
      res.status(200).json(userData);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  },
  createUser({ body }, res) {
    Users.create(body).then(userData => {
      res.status(200).json(userData);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  },
  updateUser({ params, body }, res) {
    Users.findOneAndUpdate({
      _id: params.id
    },
    body,
    {
      new: true, runValidator: true
    })
    .then(userData => {
      if(!userData) {
        res.status(404).json({ message: 'User not found!'});
      }
      res.status(200).json(userData);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  },
  deleteUser({ params }, res) {
    Users.findByIdAndDelete({
      _id: params.id
    })
    .then(userData => {
      try{
        userData.thoughts.forEach(thought => {
          Thoughts.findOneAndDelete({
            _id: thought
          })
          .then(thoughtData => {
            if(!thoughtData) {
              res.status(500).json({ message: 'Error Deleting User!' });
              return;
            }
          })
          .catch(error => {
            res.status(500).json(error);
          })
        });
        res.status(200).json(userData);
      } catch(err) {
        console.log(err);
        res.status(500).json(error);
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
  },
  addFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.userId },
      {$push: { friends: params.friendId }},
      {new: true }
    )
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'User not found!' });
        return;
      }
      res.status(200).json(userData)
    })
    .catch(error => {
      res.status(400).json(error);
    });
  },
  deleteFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId }},
      { new : true }
    )
    .then(userData => {
      if(!userData) {
        res.status(404).json({ message: 'User note found!'});
        return;
      }
      res.status(200).json(userData);
    })
    .catch(error => {
      res.status(400).json(error);
    });
  }
}

module.exports = UserController;