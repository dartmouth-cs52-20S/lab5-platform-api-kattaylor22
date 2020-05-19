/* eslint-disable linebreak-style */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable consistent-return */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

// create a PostSchema with a title field
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

userSchema.pre('save', function beforeYourModelSave(next) {
  const user = this;
  console.log('in gensalt');
  //   if (!user.isModified(process.env.AUTH_SECRET)) return next;

  // eslint-disable-next-line global-require
  //   const bcrypt = require('bcryptjs');
  console.log('before gensalt');
  bcrypt.genSalt(10, function (err, salt) {
    console.log('gen salt');
    if (err) return next(err);

    // hash password using salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override password with hashed password
      user.password = hash;
      return next();
    });
  });
  console.log('bottom o barrel');
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  const user = this;
  bcrypt.compare(candidatePassword, user.password, (err, res) => {
    if (err) return callback(err);
    else {
      return callback(null, res);
    }
  });
};

// create PostModel class from schema
const UserModel = mongoose.model('User', userSchema);

export default UserModel;
