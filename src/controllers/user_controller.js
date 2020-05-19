/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
import dotenv from 'dotenv';
import jwt from 'jwt-simple';
import User from '../models/user_model';

dotenv.config({ silent: true });

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

// export const createUser = (req, res) => {
//   const user = new User();
//   user.email = req.body.email;
//   user.password = req.body.password;

//   user.save()
//     .then((result) => {
//       res.send({ token: tokenForUser(user) });
//     })
//     .catch((error) => {
//       res.status(503).send('did not create a user');
//     });
// };


export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  console.log('signup function called');
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  // eslint-disable-next-line quote-props
  User.find({ 'email': email })
    .then((result) => {
      if (result.length !== 0) {
        return res.status(502).send('User already exists with this email');
      } else {
        const user = new User();
        user.email = email;
        user.password = password;
        console.log('bout to sAVE THIS mans');
        console.log(user);
        user.save()
          .then(() => {
            console.log('.save.then');
            res.send({ token: tokenForUser(user) });
          })
          .catch((error) => {
            console.log('.save.catch');
            res.status(500).json({ error });
          });
        // createUser(req, res);
        console.log('neither');
      }
    })
    .catch((error) => {
      return res.status(505).send('ah an error');
    });
    console.log('made it to end of catches');

    // .then((result) => {
    //   return res.status(420).send('This account already exists');
    // })
    // .catch(() => {
    //   const user = new User();
    //   user.email = email;
    //   user.password = password;

    //   user.save()
    //     .then((result) => {
    //       res.json(result);
    //       res.send({ token: tokenForUser(req.user) });
    //     })
    //     .catch((error) => {
    //       res.status(501).json({ error });
    //     });
    // });
};
