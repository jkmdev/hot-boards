import db from '../models';

const postController = {};

postController.get = (req, res) => {
  const { postId } = req.params;

  db.Post.findOne({ _id: postId })
    .populate('owner')
    .populate('comments')
    .exec()
    .then((post) => {
      if (post) {
        const response = {
          message: `Post with id '${postId}' retrieved.`,
          commentCount: post.comments.length,
          postInfo: post,
        };
        res.status(200).json(response);
      } else {
        res.status(404).json('No valid entry found for provided ID');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

postController.respond = (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  const comment = new db.Comment({
    postId,
    text,
  });

  db.Post.update(
    { _id: postId },
    { $push: { comments: comment } },
  )
    .exec()
    .then((post) => {
      console.log(post);
      if (post.n) {
        const response = {
          message: `Post with id=${postId} updated.`,
          postInfo: post,
          request: {
            type: 'GET',
            description: 'GET_THIS_POST',
            url: `${process.env.REACT_APP}/posts/${postId}`,
          },
        };
        res.status(200).json(response);
      } else {
        res.status(404).json(`Couldn't find post where id=${postId}`);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
};

export default postController;
