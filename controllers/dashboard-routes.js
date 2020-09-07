const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const checkAuth = require('../utils/auth');


//get's all of the logged in user's posts
router.get('/', checkAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        }
        //needs the model information
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get's the single id post the user wants to edit
router.get('/edit/:id', checkAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
        //needs the model information
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = dbPostData.get({ plain: true });

            res.render('edit-post', {
                post,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;