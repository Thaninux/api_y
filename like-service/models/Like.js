const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
}, { timestamps: true });

likeSchema.index({ userId: 1, postId: 1 }, { unique: true }); // avoid duplicates

module.exports = mongoose.model('Like', likeSchema);
