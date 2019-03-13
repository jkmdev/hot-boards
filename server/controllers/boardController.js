import db from './../models';

const mongoose = require('mongoose');

const boardController = {};

// create new board
boardController.post = (req, res) => {

    const { title, description, _id } = req.body;
    
    const board = new db.Board({
        _id: new mongoose.Types.ObjectId(),
        title,
        description
    });

    board.save()
        .then((newBoard) => {

            if (board) {
                const response = {
                    message: "'New board created with title '" + newBoard.title + "'",
                    boardInfo: newBoard,
                    request: {
                        type: 'GET',
                        description: 'GET_THIS_BOARD',
                        url: `${process.env.REACT_APP}/boards/${newBoard.title}`
                    }
                }
                res.status(201).json(response);
            } else {
                res.status(404).json("No valid entry found for provided ID");
            }

    }).catch((err) => {
        res.status(500).json({
            message: err,
        })
    });

};

// get all board contents
boardController.get = (req, res) => {

    const title = req.params.boardTitle;

    db.Board.findOne({title: title})
        .populate('creator')
        .populate('members')
        .populate({ 
            path: 'posts',
            select: 'title content owner dateCreated score comments', 
            options: { 
                sort: { 
                    'dateCreated': 1
                }
            },
            populate: {
                path: 'owner'
            }
        })
        .exec()
        .then(board => {
            if (board) {
                const response = {
                    message: "Board with title '" + title + "' retrieved.",
                    postCount: board.posts.length,
                    memberCount: board.members.length,
                    boardInfo: board,
                    request: {
                        type: 'PATCH',
                        description: 'UPDATE_THIS_BOARD',
                        url: `${process.env.REACT_APP}/boards/${board.title}`
                    }
                }
                res.status(200).json(response);
            } else {
                res.status(404).json("No valid entry found for provided ID");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

// update board description
boardController.patch = (req, res) => {

    const title = req.params.boardTitle;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    db.Board.update({ title: title}, { $set: updateOps })
        .exec()
        .then(board => {
            if (board) {
                const response = {
                    message: "Board with title '" + board.title + "' updated.",
                    boardInfo: board,
                    request: {
                        type: 'GET',
                        description: 'GET_THIS_BOARD',
                        url: `${process.env.REACT_APP}/boards/${board.title}`
                    }
                }
                res.status(200).json(response);
            } else {
                res.status(404).json("No valid entry found for provided ID");
            }
        })
        .catch(err => {
            res.status(500).json(err);
            console.log(err);
        });

}

// submit post to board
boardController.submit = (req, res) => {

    const boardTitle = req.params.boardTitle;
    const { title, content } = req.body;

    const post = new db.Post({
        title,
        content,
        boardTitle
    });

    db.Board.update(
            { title: boardTitle},
            { $push: { posts: post }}
        )
        .exec()
        .then(board => {
            console.log(board);
            if (board.n) {
                const response = {
                    message: "Board with title '" + boardTitle + "' posts updated.",
                    boardInfo: board,
                    request: {
                        type: 'GET',
                        description: 'GET_THIS_BOARD',
                        url: `${process.env.REACT_APP}/boards/${board.title}`
                    }
                }
                res.status(200).json(response);
                post.save();
            } else {
                res.status(404).json("Board with title '" + boardTitle + "' does not exist.");
            }
        })
        .catch(err => {
            res.status(500).json(err);
            console.log(err);
        });

}

export default boardController;
