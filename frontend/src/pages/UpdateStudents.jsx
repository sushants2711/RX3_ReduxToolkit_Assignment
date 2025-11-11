import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetAllStatus, updateStudentAsync } from '../features/student/studentSlice';

export const UpdateStudents = () => {

    const dispatch = useDispatch();

    const { id } = useParams();

    const { updateStatus, addError, updateError, students } = useSelector((state) => state.students);

    const [message, setMessage] = useState("Student Data Updated Successfully");

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        grade: "",
        gender: "",
        attendance: "",
        marks: ""
    });

    useEffect(() => {
        const foundStudent = students.find(
            (curr) => curr._id?.toString() === id?.toString()
        );

        if (foundStudent) {
            setFormData({
                name: foundStudent.name || "",
                age: foundStudent.age || "",
                grade: foundStudent.grade || "",
                gender: foundStudent.gender || "",
                attendance: foundStudent.attendance || "",
                marks: foundStudent.marks || "",
            });
        }
    }, [id, students]);
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.attendance || !formData.marks) {
            alert("Attendance and marks are compulsory");
            return;
        }

        dispatch(updateStudentAsync({ id, formData }));
    };

    useEffect(() => {
        setTimeout(() => {
            if (updateStatus === "success") {
                setFormData({
                    name: "",
                    age: "",
                    grade: "",
                    gender: "",
                    attendance: "",
                    marks: ""
                })
                setMessage("");
                dispatch(resetAllStatus());
            };
        }, 2000);
    }, [updateStatus]);

    return (
        <>
            <div className='container mt-4'>

                {updateStatus === "loading" && (
                    <div className='alert alert-warning py-2'>Loading ...</div>
                )}

                {updateStatus === "success" && (
                    <div className="alert alert-success py-2">{message}</div>
                )}

                {updateStatus === "failed" && updateError && (
                    <div className="alert alert-danger py-2">{updateError}</div>
                )}

                <h2 className='mb-4'>Edit Student</h2>
                <div className='p-4 row col-md-3'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" name="name" placeholder='Name' className="form-control" onChange={handleChange} value={formData.name} />
                        </div>
                        <div className="mb-3">
                            <input type="number" name="age" placeholder='Age' className="form-control" onChange={handleChange} value={formData.age} />
                        </div>
                        <div className="mb-3">
                            <input type="text" name="grade" placeholder='Grade' className="form-control" onChange={handleChange} value={formData.grade} />
                        </div>
                        <div className="mb-3 d-flex">
                            <label className="form-label">Gender:</label>
                            <div className="form-check">
                                <input type="radio" name="gender" id="male" value="Male" className="form-check-input ms-1" onChange={handleChange} checked={formData.gender === "Male"} />
                                <label htmlFor="male" className="form-check-label">Male</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" name="gender" id="female" value="Female" className="form-check-input ms-1" onChange={handleChange} checked={formData.gender === "Female"} />
                                <label htmlFor="female" className="form-check-label">Female</label>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <input type="number" name="attendance" placeholder='Attendance' className='form-control' onChange={handleChange} value={formData.attendance} />
                        </div>
                        <div className='mb-3'>
                            <input type="number" name="marks" placeholder='Marks' className='form-control' onChange={handleChange} value={formData.marks} />
                        </div>
                        <button type='submit' className='btn btn-primary mt-2 py-2 px-3'>Update</button>
                    </form>
                </div>
            </div>
        </>
    )
}
