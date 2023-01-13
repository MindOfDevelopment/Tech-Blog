const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const comments = Comment.findAll({});
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const comments = Comment.findAll({ where: { id: req.params.id } });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const newComment = await Comment.update(
      {
        text: req.body.text,
      },
      { where: { id: req.params.id } }
    );

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const comment = Comment.destroy({ where: { id: req.params.id } });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
