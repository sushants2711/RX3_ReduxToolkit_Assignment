import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStudents } from '../features/student/studentSlice';


export const School = () => {

    const { students } = useSelector((state) => state.students);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStudents());
    }, []);

    const totalStudents = students.length;

    const totalAttendance = students.reduce((acc, curr) => acc + (curr.attendance || 0), 0);
    const averageAttendance = totalStudents ? (totalAttendance / totalStudents).toFixed(2) : 0;

    const totalMarks = students.reduce((acc, curr) => acc + (curr.marks || 0), 0);
    const avgMarks = (totalMarks / totalStudents).toFixed(2);

    // sort changes the orignally data that wise
    const topStudents = students.length > 0
        ? [...students].sort((a, b) => Number(b.marks) - Number(a.marks))[0]
        : null;

    return (
        <>
            <div className="container my-3">
                <h1>School View</h1>

                <div className='my-2'>
                    <p>Total Students: {totalStudents}</p>
                    <p>Average Attendance: {averageAttendance}</p>
                    <p>Average Marks: {avgMarks}</p>
                    <p>Top Students: {topStudents ? topStudents.name : 'Loading...'}</p>
                </div>
            </div>
        </>
    )
}
