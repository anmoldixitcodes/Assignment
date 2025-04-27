import React,{useState} from 'react';
import { useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate} from 'react-router-dom';
import BlogContent from './BlogContent';
import axios from 'axios'
import '../Css/home.css';
export default function Home() {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([]);
    const userEmail = localStorage.getItem("userEmail");
    const isAdmin = userEmail === "admin@gmail.com";

    useEffect(() => {
      fetch('http://localhost:3001/getBlogs')
        .then(res => res.json())
        .then(data => setBlogs(data))
        .catch(err => console.error(err));
    }, []);

    const handleAdding = () => {
        setShowForm(true);
      };
    const handleSubmit = (event) => {
        event.preventDefault();
        const newBlog = { title, content };
        setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
        axios.post('http://127.0.0.1:3001/AddBlog',{title,content})
        .then(result => console.log(result))
        .catch(err=> console.log(err))
        alert("Blog added successfully...");
        navigate('/Home')
       
      };

      
  return (
    <div>
       <Navbar/> 
       <div className="blog-flex">
        <BlogContent blogs={blogs} setBlogs={setBlogs}/>
      
      </div>
      {isAdmin && 
      <div className='adding'>
        <button className='add' onClick={handleAdding}>Click to add more blogs</button>
        </div>}

        {showForm && (
        <form onSubmit={handleSubmit} className='blog-form'>
          <input 
            type="text" 
            placeholder="Blog Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          <textarea 
            placeholder="Blog Content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
          <button type="submit">Submit Blog</button>
        </form>
      )}

    </div>
  )
}
