import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, setFilter, setSortBy } from '../features/student/studentSlice';

export const Classes = () => {
    const { students, filter, sortBy } = useSelector((state) => state.students);
    console.log(filter);
    console.log(sortBy);
    console.log(students)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStudents());
    }, []);

    const handleFilterChange = (e) => {
        dispatch(setFilter(e.target.value));
    };

    const handleSortChange = (e) => {
        dispatch(setSortBy(e.target.value));
    };

    const filteredStudents = students.filter((student) => {
        if (filter === "All") return true;
        return student.gender === filter;
    });

    const sortedStudents = filteredStudents.sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "marks") return b.marks - a.marks;
        if (sortBy === "attendance") return (b.attendance || 0) - (a.attendance || 0);
    });


    return (
        <>
            <div className="container my-5">
                <h1>Class View</h1>

                <div>
                    <label htmlFor="filter">Filter by Gender: </label>
                    <select name="filter" id="filter" onChange={handleFilterChange} value={filter}>
                        <option value="All">All</option>
                        <option value="Male">Boys</option>
                        <option value="Female">Girls</option>
                    </select>
                </div>

                <div className='mt-4'>
                    <label htmlFor="sort">Sort by: </label>
                    <select name="sort" id="sort" onChange={handleSortChange} value={sortBy}>
                        <option value="name">Name</option>
                        <option value="marks">Marks</option>
                        <option value="attendance">Attendance</option>
                    </select>
                </div>

                <div className='my-4'>
                    <ul>
                        {
                            sortedStudents.map((curr) => (
                                <li key={curr._id} className='mt-2'>{curr.name} - {curr.gender} - Marks: {curr.marks} - Attendance: {curr.attendance || 0}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
