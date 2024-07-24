import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admindashboard.css';

const AdminDashboard = () => {

  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instructorToDelete, setInstructorToDelete] = useState();
  const [showCourseDeleteModal, setShowCourseDeleteModal] = useState(false);
  const [showInstructorDeleteModal, setShowInstructorDeleteModal] = useState(false);

  useEffect(() => {
    const instructorData = Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      name: `Instructor ${index + 1}`,
      email: `instructor${index + 1}@example.com`,
      courses: Math.floor(Math.random() * 10) + 1,
      students: Math.floor(Math.random() * 300) + 1,
      ratings: (Math.random() * 5).toFixed(1),
    }));

    const courseData = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      title: `Course ${index + 1}`,
      instructor: `Instructor ${Math.floor(Math.random() * 15) + 1}`,
      price: (Math.random() * 100).toFixed(2),
      duration: `${Math.floor(Math.random() * 10) + 1} weeks`,
    }));

    setInstructors(instructorData);
    setCourses(courseData);

    setupInstructorsTable();
    setupCoursesTable();
  }, []);

  const setupInstructorsTable = () => {
    $('#searchInstructors').on('keyup', function () {
      const value = $(this).val().toLowerCase();
      $('#instructorsTable tbody tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  };

  const setupCoursesTable = () => {
    $('#filterCourses').on('change', function () {
      const filter = $(this).val();
      const value = $('#searchCourses').val().toLowerCase();
      $('#coursesTable tbody tr').filter(function () {
        const text = $(this).text().toLowerCase();
        if (filter === 'All') {
          $(this).toggle(text.indexOf(value) > -1);
        } else if (filter === 'By Instructor') {
          $(this).toggle(text.indexOf(value) > -1 && $(this).find('td').eq(2).text().toLowerCase().indexOf(value) > -1);
        } else if (filter === 'By Price') {
          $(this).toggle(text.indexOf(value) > -1 && $(this).find('td').eq(3).text().toLowerCase().indexOf(value) > -1);
        } else if (filter === 'By Duration') {
          $(this).toggle(text.indexOf(value) > -1 && $(this).find('td').eq(4).text().toLowerCase().indexOf(value) > -1);
        }
      });
    });

    $('#searchCourses').on('keyup', function () {
      const value = $(this).val().toLowerCase();
      const filter = $('#filterCourses').val();
      $('#coursesTable tbody tr').filter(function () {
        const text = $(this).text().toLowerCase();
        if (filter === 'All') {
          $(this).toggle(text.indexOf(value) > -1);
        } else if (filter === 'By Instructor') {
          $(this).toggle(text.indexOf(value) > -1 && $(this).find('td').eq(2).text().toLowerCase().indexOf(value) > -1);
        } else if (filter === 'By Price') {
          $(this).toggle(text.indexOf(value) > -1 && $(this).find('td').eq(3).text().toLowerCase().indexOf(value) > -1);
        } else if (filter === 'By Duration') {
          $(this).toggle(text.indexOf(value) > -1 && $(this).find('td').eq(4).text().toLowerCase().indexOf(value) > -1);
        }
      });
    });
  };

  const deleteInstructor = (inst) => {
    setInstructorToDelete(inst);
    setShowInstructorDeleteModal(true);
  };

  const confirmDeleteInstructor = (id) => {
    setInstructors(instructors.filter((ins) => ins.id !== id));
    setShowInstructorDeleteModal(false);
  }


  return (
    <div className='admin-container m-0'>
      <div className='row m-4'>
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h2>Instructors</h2>
          <input 
            type="text" 
            id="searchInstructors" 
            className="form-control w-50" 
            placeholder="Search Instructors" 
            aria-label="Search Instructors" 
          />
        </div>
        <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto', overflowX : 'auto' }}>
          <table id="instructorsTable" className="table table-striped">
            <thead className='sticky-top'>
              <tr>
                <th>S. No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Courses</th>
                <th>Students</th>
                <th>Ratings</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructor, index) => (
                <tr key={index}>
                  <td>{instructor.id}</td>
                  <td>{instructor.name}</td>
                  <td>{instructor.email}</td>
                  <td>{instructor.courses}</td>
                  <td>{instructor.students}</td>
                  <td>{instructor.ratings}</td>
                  <td>
                    <div className="action-buttons d-flex justify-content-between">
                      <button className="btn btn-primary btn-sm">View</button>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteInstructor(instructor)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showInstructorDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm to delete this Instructor</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowInstructorDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <h5>{instructorToDelete.name}</h5>
                <h6>{instructorToDelete.email}</h6>
              </div>
              <div className='modal-footer'>
                <button className='btn btn-secondary' onClick={() => {
                  setInstructorToDelete(null);
                  setShowInstructorDeleteModal(false);
                }}>Cancel</button>
                <button className='btn btn-dark' onClick = {() => confirmDeleteInstructor(instructorToDelete.id)}>Delete</button>
            </div>
          </div>
        </div>
        </div>
      )}
      </div> 
      {showInstructorDeleteModal && <div className="modal-backdrop fade show"></div>}
      </div>
      <div className='row m-4'>
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h2 className='w-auto'>Courses</h2>
          <div className="d-flex align-items-center justify-content-between">
          <input 
              type="text" 
              id="searchCourses" 
              className="form-control me-2"
              style={{ width: '400px' }} 
              placeholder="Search Courses" 
              aria-label="Search Courses" 
            />
            <select id="filterCourses" className="form-select w-auto me-2">
              <option value="All">All</option>
              <option value="By Instructor">By Instructor</option>
              <option value="By Price">By Price</option>
              <option value="By Duration">By Duration</option>
            </select>
            
          </div>
        </div>
        <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table id="coursesTable" className="table table-striped">
            <thead className='sticky-top'>
              <tr>
                <th>S. No</th>
                <th>Title</th>
                <th>Instructor</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.id}</td>
                  <td>{course.title}</td>
                  <td>{course.instructor}</td>
                  <td>{course.price}</td>
                  <td>{course.duration}</td>
                  <td>
                    <div className="action-buttons d-flex justify-content-between">
                      <button className="btn btn-primary btn-sm">View</button>
                      <button className="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;
