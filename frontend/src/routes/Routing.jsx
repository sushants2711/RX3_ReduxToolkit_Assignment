import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Navbar } from '../components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { Students } from '../pages/Students';
import { Classes } from '../pages/Classes';
import { School } from '../pages/School';
import { AddStudents } from '../pages/AddStudents';
import { StudentDetaills } from '../pages/StudentDetaills';
import { UpdateStudents } from '../pages/UpdateStudents';


export const Routing = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Students />} />
                <Route path='/classes' element={<Classes />} />
                <Route path='/school' element={<School />} />
                <Route path='/add/students' element={<AddStudents />} />
                <Route path='/student-details/:id' element={<StudentDetaills />} />
                <Route path='/update/students/:id' element={<UpdateStudents />} />
            </Routes>
        </>
    )
}
