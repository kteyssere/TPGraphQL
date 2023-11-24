const User = require("../models/user");
const Post = require("../models/post");

module.exports = {
  addUser: async ({ name, email }) => {
    const user = new User({
      name, 
      email
    });

    const usr = await User.find({email : email});
    
    if(usr.length >  0){
      throw new Error("Cet email est déjà pris");
    }

    const newUser = await user.save();
    return newUser;
  },

  updateUser: async ({ id, name, email }) => {
    const result = await User.findOneAndUpdate({_id: id}, {
      name,
      email
    }, {new: true});
    return result;
  },

  deleteUser: async ({ id }) => {
    const result = await User.findOneAndDelete({_id: id});
    return result;
  },

  users: async () => {
    const result = await User.find();
    return result;
  },

  user: async ({ id }) => {
    const usersFetched = await User.findById(id);
    return usersFetched;
  },

  usersByName: async ({ name }) => {
    const result = await User.find({name: { $regex: '.*' + name + '.*', $options: 'i' }});
    return result;
  },

  addFriend: async ({ currentUserID, friendID }) => {
    const friend = await User.findById(friendID);
    const currentUser = await User.findById(currentUserID);

    if(currentUser.friends.includes(friendID)){
      throw new Error("Vous etes déjà amis avec "+friend.name);
    }

    if(currentUserID == friendID){
      throw new Error("Les ids doivent etres distinct");
    }

    currentUser.friends.push(friend);
    currentUser.save();

    friend.friends.push(currentUser);
    friend.save();

    return currentUser;
  },

  deleteFriend: async ({ currentUserID, friendID }) => {
    const friend = await User.findById(friendID);
    const currentUser = await User.findById(currentUserID);

    if(!currentUser.friends.includes(friendID)){
      throw new Error("Vous n'etes pas amis avec "+friend.name);
    }

    if(currentUserID == friendID){
      throw new Error("Les ids doivent etres distinct");
    }

    currentUser.friends.pull(friend);
    currentUser.save();

    friend.friends.pull(currentUser);
    friend.save();

    return currentUser;
  },

  addPost: async ({ title, content, author }) => {
    const post = new Post({
      title, 
      content,
      author
    });

    await User.findOneAndUpdate({_id: author}, {
      $push: { posts: post }
    });

    const newPost = await post.save();
    return newPost;
  },

  updatePost: async ({ id, title, content }) => {
    const result = await Post.findOneAndUpdate({_id: id}, {
      title,
      content
    }, {new: true});
    return result;
  },

  deletePost: async ({ id }) => {
    const result = await Post.findOneAndDelete({_id: id});
    return result;
  },

  posts: async () => {
    const result = await Post.find();
    return result;
  },

  post: async  ({ id }) => {
    const post = Post.find({_id : id});
    return post;
  },
};
  