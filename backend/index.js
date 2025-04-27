const express = require('express');
const mongoose = require('mongoose')
const BlogModel =require('./models/blogs')
const UserModel =require('./models/Users')


const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/Blog_Project");

app.post('/Register',(req,res) => {
    console.log("hello")
    UserModel.create(req.body)
    .then(users=> res.json(users))
    .catch(err=> res.json(err))
})

app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    UserModel.findOne({email: email})
    .then(user =>{
        if(user) {
            if(user.password===password){
                res.json({ message: "Success", email: user.email });
            } else {
                res.json("The Password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    }) 
})

app.post('/AddBlog',(req,res) => {
    console.log("hello")
    BlogModel.create(req.body)
    .then(users=> res.json(users))
    .catch(err=> res.json(err))
})

app.get('/getBlogs', (req, res) => {
    BlogModel.find()
      .then(blogs => res.json(blogs))
      .catch(err => res.status(500).json({ error: err.message }));
  });

// Delete a blog by its id
app.delete('/deleteBlog/:id', (req, res) => {
    const { id } = req.params;

    BlogModel.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.json({ message: "Blog deleted successfully" });
            } else {
                res.status(404).json({ message: "Blog not found" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/updateBlog/:id', async (req, res) => {
    try {
      const { title, content } = req.body;
      const updated = await BlogModel.findByIdAndUpdate(req.params.id, { title, content }, { new: true });

      res.json(updated);
    } catch (err) {
      res.status(500).send('Error updating blog');
    }
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});