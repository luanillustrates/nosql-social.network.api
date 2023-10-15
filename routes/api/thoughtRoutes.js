const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// get and post thoughts route
router.route('/').get(getThoughts).post(createThought);

// get, put and delete thought by id route
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// post reaction route
router.route('/:thoughtId/reactions').post(createReaction);

// delete reaction by id route
router.route('/:thoughId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
