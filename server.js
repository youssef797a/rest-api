const express = require('express');
const connectDB = require('./connectDB');

require("dotenv").config({path: "./config/.env"})
const app = express();

connectDB()

const PORT = process.env.PORT || 5000;
  // Start the server
app.listen(PORT, err => {
    err ? console.log(err)
        : console.log("Server is running on port " + PORT );
})
app.get('/user', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  app.post('/user', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
    });
  
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  app.put('/user/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  app.delete('/user/:id', async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Start the server
 