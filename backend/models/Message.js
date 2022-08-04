const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  destinataire: { type: String, required: true },
  message: { type: String, required: true },
  imageUrl: { type: String },
});

module.exports = mongoose.model('Message', messageSchema);
