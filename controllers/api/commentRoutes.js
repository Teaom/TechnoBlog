const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      console.log("making a comment")
      const newComment = await Comment.create({
        ...req.body,
        userId: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.get('/:id', withAuth, async (req, res) => {
    try {
      const comments = await Comment.findAll({
        postId:req.params.id,
      });
 
      
     const cleanComments = comments.map((comment) => comment.get({ plain: true }));
     
     console.log('comments testing', cleanComments)
      res.render('singlePost', { 
        cleanComments,
      });
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });



module.exports = router;