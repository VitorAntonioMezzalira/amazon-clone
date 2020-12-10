import express from 'express';
import User from '../models/userModel';
import { getToken } from '../utils'

const router = express.Router();

router.post('/signin', async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });
  if(signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(user)
    })
  } else {
    res.status(401).send({ msg: 'Invalid Email or Password' });
  }
})

router.get('/createadmin', async (req, res) => {
  try {
    console.log('aaa')
    const user = new User({
      name: 'Vitor',
      email: 'vitorlokko123@hotmail.com',
      password: '12345',
      isAdmin: true
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  };
});

export default router;
