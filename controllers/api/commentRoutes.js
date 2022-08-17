const router = require('express').Route();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req,res)=>{
    try{
        const commentData = await Comment.findAll({

        })
    }
    catch (err) {
        
    }
})

router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;