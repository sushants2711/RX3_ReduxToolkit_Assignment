import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents } from '../features/student/studentSlice';
import { useNavigate } from 'react-router-dom';

export const Students = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { students, status, error } = useSelector((state) => state.students);

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    const handleNavigate = () => {
        navigate("/add/students");
    };

    const handleClick = (id) => {
        navigate(`/student-details/${id}`);
    };

    return (
        <div className="container my-5">
            <h1 className="mb-3 text-primary">Students View</h1>

            <div className='mb-4'>
                <button onClick={handleNavigate} className='btn btn-warning text-primary text-decoration-underline'>Add Student</button>
            </div>

            {status === "loading" && (
                <div className="alert alert-info" role="alert">
                    Loading...
                </div>
            )}

            {status === "failed" && error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {status === "success" && students.length > 0 && (
                <div>
                    <h2 className='ms-3'>Student List</h2>
                    <ul>
                        {
                            students.map((curr) => (
                                <li key={curr._id} className='text-decoration-underline text-primary fs-5' onClick={() => handleClick(curr._id)} style={{ cursor: "pointer" }}> {curr.name} (Age: {curr.age})</li>
                            ))
                        }
                    </ul>
                </div>
            )}

            {status === "success" && students.length === 0 && (
                <div className="alert alert-warning" role="alert">
                    No students found.
                </div>
            )}
        </div>
    );
};
