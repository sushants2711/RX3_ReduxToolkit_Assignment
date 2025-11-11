import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteStudentAsync, fetchStudents, resetAllStatus } from '../features/student/studentSlice';

export const StudentDetaills = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { id } = useParams();

    const { status, error, students, deleteStatus } = useSelector((state) => state.students);

    useEffect(() => {
        dispatch(fetchStudents());
    }, [id]);

    const findStudent = students.find((curr) => curr._id.toString() === id.toString());

    const handleEdit = (id) => {
        navigate(`/update/students/${id}`)
    };

    const handleDelete = (id) => {
        dispatch(deleteStudentAsync(id));
    };

    useEffect(() => {
        if (deleteStatus === "success") {
            resetAllStatus();
            navigate("/");
        }
    }, [deleteStatus]);

    return (
        <>
            <div className='container my-5'>
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

                <div>
                    <h1>Student Detail</h1>
                    <p>Name: {findStudent?.name}</p>
                    <p>Age: {findStudent?.age}</p>
                    <p>Grade: {findStudent?.grade}</p>
                    {
                        findStudent?.attendance && <p>Attendance: {findStudent.attendance}</p>
                    }
                    {
                        findStudent?.marks && <p>Marks: {findStudent.marks}</p>
                    }
                    <div>
                        <button className='btn btn-warning text-decoration-underline text-primary p-2' onClick={() => handleEdit(findStudent._id)}>Edit Details</button>
                        <button className='btn btn-danger p-2 ms-2' onClick={() => handleDelete(findStudent._id)}>Delete</button>
                    </div>
                </div>

            </div>
        </>
    )
}
