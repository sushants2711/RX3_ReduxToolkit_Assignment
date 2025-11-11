import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addStudentAsync, resetAllStatus } from '../features/student/studentSlice';

export const AddStudents = () => {

    const dispatch = useDispatch();

    const { addStatus, addError } = useSelector((state) => state.students);

    const [message, setMessage] = useState("Student added successfully!")

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        grade: "",
        gender: ""
    });

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

        if (!formData.name || !formData.age || !formData.grade || !formData.gender) {
            alert("Please fill all fields");
            return;
        };

        const newStudent = {
            name: formData.name,
            age: formData.age,
            grade: formData.grade,
            gender: formData.gender
        };

        dispatch(addStudentAsync(newStudent))
    };

    useEffect(() => {
        if (addStatus === "success") {
            setTimeout(() => {
                setFormData({
                    name: "",
                    age: "",
                    gender: "",
                    grade: ""
                });
                setMessage("");
                dispatch(resetAllStatus());
            }, 2000);

        };
    }, [addStatus]);

    return (
        <>
            <div className='container mt-4'>

                {addStatus === "loading" && <p className="text-blue-500">Adding student...</p>}

                {addStatus === "success" && <p className="text-green-500">{message}</p>}

                {addStatus === "failed" && <p className="text-red-500">{addError}</p>}

                <h2 className='mb-4'>Add Student</h2>
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
                                <input type="radio" name="gender" id='male' value="Male" className="form-check-input ms-1" onChange={handleChange} checked={formData.gender === "Male"} />
                                <label htmlFor="male" className="form-check-label">Male</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" name="gender" id='female' value="Female" className="form-check-input ms-1" onChange={handleChange} checked={formData.gender === "Female"} />
                                <label htmlFor="female" className="form-check-label">Female</label>
                            </div>
                        </div>
                        <button type='submit'>Add</button>
                    </form>
                </div>
            </div>
        </>
    )
}
