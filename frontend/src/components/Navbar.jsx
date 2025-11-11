import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <h2 className="navbar-brand m-0 me-5 fs-3">
                    Student Management System
                </h2>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-5">
                        <li className="nav-item fs-5 ms-5">
                            <NavLink className="nav-link" to="/">
                                Students
                            </NavLink>
                        </li>
                        <li className="nav-item fs-5 ms-5">
                            <NavLink className="nav-link" to="/classes">
                                Classes
                            </NavLink>
                        </li>
                        <li className="nav-item fs-5 ms-5">
                            <NavLink className="nav-link" to="/school">
                                School
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};


