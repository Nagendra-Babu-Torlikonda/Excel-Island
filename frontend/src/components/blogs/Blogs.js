import React from 'react';
import { useState, useEffect } from 'react';
import './blogs.css';
import Blog1 from '../../images/gallery1.jpg';
import Blog2 from '../../images/galllery2.jpg';
import Blog3 from '../../images/gallery5.jpg';
import Blog4 from '../../images/gallery6.jpg';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
  const user = useSelector((state) => state.user.value);
  const [showModal, setShowModal] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const navigate = useNavigate();
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })

  const onAddBlogSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formValues = Object.fromEntries(data.entries());
    const formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('image', formValues.image);
    formData.append('content', formValues.content);
    formData.append('userId', user.userId);

    try{
      const response = await axios.post("/addBlog", formData)
      if(response.status === 200){
        setShowModal(false);
        alert("blog posted successfully");
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try{
        const response = await axios.get("/blogs/getAll");
        if(response.status === 200){
          setAllBlogs(response.data);
        }
      }catch(error){
        console.log(error);
      }
    }
    fetchBlogs();
  })

  return (
    <div className="container my-5">
      <div className='row d-flex justify-content-between mb-4 mx-3'>
      <h1 className="text-center w-auto">Blogs</h1>
      {(user.userName && user.userRole !== 'ROLE_STUDENT') && (
        <button className='btn btn-dark w-auto' onClick={() => setShowModal(true)}>Add Blog</button>
      )}
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Blog</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onAddBlogSubmit} method='post'>
                  <div className="mb-3">
                    <label htmlFor="imageUpload" className="form-label">
                      Upload Image
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="imageUpload"
                      name="image"
                      accept="image/*"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                      Content
                    </label>
                    <textarea
                      className="form-control"
                      id="content"
                      name="content"
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-auto">
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showModal && <div className="modal-backdrop fade show"></div>}

      <div className="row d-flex justify-content-md-around justify-content-center">
          {allBlogs.length !== 0 ? (
            allBlogs.map((blog) => (
              <div className="col-lg-4 col-md-6 mb-4" key={blog.id} style={{cursor : "pointer"}} onClick={() => navigate("/viewBlog", { state: { blog, allBlogs } })}>
              <div className="card h-100 d-flex flex-md-column flex-row">
              <img src={`/uploads/blogs/${blog.image}`} alt='Blog Image' className='col-md-12 col-4 img-fluid custom-img' />
                <div className="card-body">
                  <h5 className="card-title one-line-heading">{blog.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {blog.author}
                  </h6>
                  <p className="card-text two-line-heading">{blog.content}</p>
                  <p className='card-subtitle mt-2'>{formatter.format(new Date(blog.date))}</p>
                </div>
              </div>
            </div>
            ))
          ) : (
            <div><h2 className='text-center'>No blogs available</h2></div>
          )}
      </div>
    </div>
  )
}

export default Blogs