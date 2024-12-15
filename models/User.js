const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  weight: { type: Number, required: false },
  days: [{ type: Schema.Types.ObjectId, ref: 'Day' }]
});

module.exports = mongoose.model('User', UserSchema);
