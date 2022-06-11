const router = require('express').Router();
const {
  createThought,
  addReaction,
  removeReaction,
  deleteThought,
  getSingleThought,
  updateThought,
  getThoughts
} = require('../../controllers/thought-controller');

// /api/thoughts
router
 .route('/')
 .get(getThoughts)
 .post(createThought);

 // /api/thoughts/:id
 router
  .route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);


// /api/thoughts/<thoughtId>
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/<thoughtId>/<reactionId>
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


module.exports = router;
