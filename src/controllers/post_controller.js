/* eslint-disable linebreak-style */
import Post from '../models/post_model';

export const createPost = (req, res) => {
  // res.send('post should be created and returned');
  // making post
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.coverUrl = req.body.coverUrl;

  // saving post
  post.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
  Post.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const updatePost = (req, res) => {
  const fields = req.body;
  Post.findByIdAndUpdate(req.params.id, fields, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
