import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewBlog = () => {
    const { state } = useLocation();
  const { blog, allBlogs } = state || {};
  const navigate = useNavigate();
  console.log(allBlogs);

  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });

  return (
    <div className='container m-3'>
        <div className='row'>
            <div className='col-8'>
                <h1>{blog.title}</h1>
                <div className='d-flex justify-content-between my-3 mx-5'>
                    <h6 className='w-auto me-4'>{formatter.format(new Date(blog.date))}</h6>
                    <h6 className='w-auto me-4'>By {blog.author}</h6>
                </div>
                <div className='border col-8 mx-auto'>
                    <img src={`/uploads/blogs/${blog.image}`} alt={blog.title} className='w-100 mx-auto'/>
                </div>       
                <p className='mt-4 text-justify'>{blog.content}</p>
            </div>
            <div className='col-4 border p-2'>
                <h3 className='text-center'>All Blogs</h3>
                <ul className='list-group'>
                    {allBlogs.map((blog) => (
                        <li className='list-group-item d-flex align-items-center border-bottom' style={{cursor : "pointer"}} key={blog.id} onClick={() => navigate("/viewBlog", { state: { blog, allBlogs } })}>{blog.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default ViewBlog;