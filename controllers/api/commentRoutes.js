const express = require('express');
const router = require('express').Route();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res)=>{
    try{
        const commentData = await Comment.findAll({
          include: [
            User,
            Post
          ]
        });

        res.json(commentData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req,res) => {
  try{
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        User,
        Post
      ]
    });

    res.json(commentData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req,res) => {
  try {
    const newComment = await Comment.create({
      body: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.session.post_id
    });

    res.json(newComment);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req,res) => {
  try {
    const updateComment = await Comment.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    
    res.json(updateComment);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req,res) => {
  try{ 
    const delComment = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json(delComment);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;