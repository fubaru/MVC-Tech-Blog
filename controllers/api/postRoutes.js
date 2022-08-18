const express = require('express');
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const { route } = require('../homeRoutes');

router.get('/', async, (req,res) => {
  try{
    const postData = await Post.findAll({
      include: [
        User,
        Comment
      ]
    });

    res.json(postData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async, (req,res) => {
  try{
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        Comment
      ]
    });

    res.json(postData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      description: req.body.description,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async, (req,res) => {
  try{
    const updatePost = await Post.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    res.json(updatePost);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
