import React,{useState} from 'react'
import '../Css/blogcontent.css';
import axios from 'axios'
export default function BlogContent({ blogs,setBlogs }) {
  const userEmail = localStorage.getItem("userEmail");
  const isAdmin = userEmail === "admin@gmail.com";

  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:3001/deleteBlog/${id}`)
      .then(response => {
        alert("Blog deleted successfully");
        setBlogs(blogs.filter(blog => blog._id !== id));
      })
      .catch(err => {
        console.log(err);
        alert("Error deleting blog");
      });
    }

    const handleEditClick = (blog) => {
      setEditingBlogId(blog._id);
      setEditTitle(blog.title);
      setEditContent(blog.content);
    };
  
    const handleUpdate = (id) => {
      axios.put(`http://127.0.0.1:3001/updateBlog/${id}`, {
        title: editTitle,
        content: editContent
      })
        .then((response) => {
          alert("Blog updated successfully");
          const updatedBlogs = blogs.map(blog =>
            blog._id === id ? { ...blog, title: editTitle, content: editContent } : blog
          );
          setBlogs(updatedBlogs);
          setEditingBlogId(null); // exit edit mode
        })
        .catch(err => {
          console.log(err);
          alert("Error updating blog");
        });
    };
  

  return (
    
    <div >
      
       {blogs.length === 0 ? (
        <p className="blog-content">No blogs to display</p>
      ) : (
        blogs.map((blog, index) => (
          <div key={index} className="blog-container">
             {editingBlogId === blog._id ? (
              <>
                <input
                  type="text" className="blog-head"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editContent} className="blog-content"
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="buttons">
                <button className='btn' onClick={() => handleUpdate(blog._id)}>Save</button>
                <button className='btn' onClick={() => setEditingBlogId(null)}>Cancel</button>
                </div>
              </>
            ) : (
            <>
            <h2 className="blog-head">{blog.title}</h2>
            <p className="blog-content">{blog.content}</p>
            {isAdmin && (
              <div className="buttons">              
              <button className='btn' onClick={() => handleDelete(blog._id)}>delete</button>
              <button className='btn' onClick={() => handleEditClick(blog)}>Update</button>
              </div>

            )}
            </>
           )}
          </div>
        ))
      )}
      
    </div>
  )
}
