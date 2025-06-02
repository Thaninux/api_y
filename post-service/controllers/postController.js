const Post = require('../models/Post');

// Ajouter un post
exports.createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ message: 'userId et content sont requis' });
    }

    const newPost = await Post.create({ userId, content });

    res.status(201).json({ message: 'Post créé avec succès', post: newPost });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Récupérer tous les posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); 
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Mettre à jour un post par ID
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { content },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    res.status(200).json({ message: 'Post mis à jour', post: updatedPost });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Supprimer un post par ID
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    res.status(200).json({ message: 'Post supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
