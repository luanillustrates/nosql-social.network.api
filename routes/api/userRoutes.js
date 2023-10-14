const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// get and post for user route
router.route('/').get(getUser).post(createUser);

// get, put and delete for userid route
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// post and delete friend/id route
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;