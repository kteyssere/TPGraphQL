const mongoose = require("mongoose");
const post = require("./post").postSchema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    posts: {
        type: [post],
        required: false,
      },

    friends: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);