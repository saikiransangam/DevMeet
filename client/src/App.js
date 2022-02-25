import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import logo from './logo.svg';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

const App = () => (
    <Fragment>
    <Router>
    <Navbar />
    <section className="container">
       <Routes>
            <Route exact path="/" component={<Landing/> } />
            <Route exact path="/register" component= {<Register/> } />
            <Route exact path="/login" component= {<Login/>} />
       </Routes>
    </section>
    </Router>
    </Fragment>
);

export default App;
