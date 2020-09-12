const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment, Campground } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', withAuth, (req, res) => {
//     Campground.findAll({
//         where: {
//             user_id: req.session.user_id
//         },
//         attributes: [
//             'id',
//             'campground_name',
//             'location',
//             'user_id'
//         ],
//     })
//         .then(campgroundData => {
//             let campgrounds = campgroundData.map(campground => campground.get({ plain: true }));
//             res.render('dashboard', { campgrounds, loggedIn: true });
//         })

//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

router.get('/', withAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
        },
        attributes: { exclude: ['password']},
        include: [
            {
                model: Post,
                attributes: [
                    'id',
                    'title',
                    'post_body',
                    'created_at',
                ],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Comment,
                        attributes: [
                            'id',
                            'comment_text',
                            'post_id',
                            'user_id',
                            'created_at'
                        ],
                        include: {
                            model: User,
                            attributes: ['username']
                        }
                    }
                ]
            },
            {
                model: Campground,
                attributes: [
                    'id',
                    'campground_name',
                    'location',
                    'user_id'
                ],
            }
        ]
    })
    .then(userData => {
        console.log(userData);
        let userInfo = userData.get({ plain: true });
        res.render('dashboard', { userInfo, loggedIn: true });
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})


// see personal reviews created
// router.get('/', withAuth, (req, res) => {
//     Post.findAll({
//         where: {
//             user_id: req.session.user_id
//         },
//         attributes: [
//             'id',
//             'title',
//             'post_body',
//             'created_at'
//         ],
//         include: [
//             {
//                 model: User,
//                 attributes: ['username']
//             },
//             {
//                 model: Comment,
//                 attributes: [
//                     'id',
//                     'comment_text',
//                     'post_id',
//                     'user_id',
//                     'created_at'
//                 ],
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                 }
//             }
//         ]
//     })
//         .then(postData => {
//             const posts = postData.map(post => post.get({ plain: true }));
//             res.render('dashboard', { posts, loggedIn: true });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });



// get single post to edit
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'post_body',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(data => {
            const post = data.get({ plain: true });
            res.render('edit-post', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;