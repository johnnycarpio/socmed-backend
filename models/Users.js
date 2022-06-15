const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (x) => {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(x);
        },
        message: (props) => {
          return `${props.value} is not a valid email address!`;
        }
      }
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thoughts'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'users'
    }]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Users = model('users', userSchema);

module.exports = Users;