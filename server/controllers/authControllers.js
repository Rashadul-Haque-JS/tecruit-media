
const db = require('../lowdbHandler.js');
const jwt = require('jsonwebtoken');
const secretKey = 'techies'; 
const bcrypt = require("bcryptjs");

//Signup controller
const signup = (req, res) => {
    try {
      const { email, password,type } = req.body;
  
      const existingUser = db.get('users').find({ email }).value();
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
  
      const newUser = { email, password: bcrypt.hashSync(password, 10), id: Date.now(),type };
  
      db.get('users').push(newUser).write();
  
      // Create a JWT token for the newly registered user
      const token = jwt.sign({ email: newUser.email }, secretKey, { expiresIn: '1h' });
  
      return res.status(201).json({ message: 'Signup successful', token }); 
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

// Login controller
const login = (req, res) => {
  const { email, password } = req.body;
  const storedUser = db.get('users').find({ email }).value();
  if (!storedUser) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  bcrypt.compare(password, storedUser.password, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result) {
      const payload = { email: storedUser.email };
      const token = jwt.sign(payload, secretKey, { expiresIn:'1h' });
      return res.status(200).json({ message: 'Authentication successful', token });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  });
};
  
const getUser = (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const tokenParts = authorizationHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const token = tokenParts[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const email = decoded.email;

    // Fetch the user's information
    const user = db.get('users').find({ email }).value();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const authUser = {email:user.email, id:user.id,type:user.type}

    return res.status(200).json(authUser);
  });
};


const updateUser = (req, res) => {
    const token = req.headers.authorization;
  
    
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const email = decoded.email;
      const user = db.get('users').find({ email }).value();
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (req.body.name) {
        user.name = req.body.name;
      }
  
      if (req.body.age) {
        user.age = req.body.age;
      }
  
      db.get('users').find({ email }).assign(user).write();
  
      return res.status(200).json(user);
    });
  };

const deleteUser = (req, res) => {
    const token = req.headers.authorization;
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const email = decoded.email;
  
      const user = db.get('users').find({ email }).value();
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      db.get('users').remove({ email }).write();
  
      return res.status(204).json();
    });
  };

module.exports = { signup,login,getUser,deleteUser,updateUser };