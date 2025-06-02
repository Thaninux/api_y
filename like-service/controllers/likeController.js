
const Like = require('../models/Like');

exports.likePost = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const like = new Like({ userId, postId });
    await like.save();
    res.status(201).json({ message: 'Post liked' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Déjà liké' });
    }
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.unlikePost = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const result = await Like.findOneAndDelete({ userId, postId });
    if (result) {
      res.status(200).json({ message: 'Like supprimé' });
    } else {
      res.status(404).json({ message: 'Like non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.getLikesByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const count = await Like.countDocuments({ postId });
    res.status(200).json({ postId, likes: count });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
