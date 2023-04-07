import React, {Component} from 'react';
import './App.css';
import Home from './component/Home';
import Bisection from './component/Bisection';
import Falseposition from './component/Falseposition';
import Onepoint from './component/Onepoint';
import Taylor from './component/Taylor';
import Newtonraphson from './component/Newtonraphson';
import Secant from './component/Newtonraphson';
import { Route, Routes} from 'react-router-dom';

class App extends Component { 
  render() {
    return (
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/bisection" element={<Bisection/>} />
          <Route path="/falseposition" element={<Falseposition/>} />
          <Route path="/onepoint" element={<Onepoint/>} />
          <Route path="/taylor" element={<Taylor/>} />
          <Route path="/newtonraphson" element={<Newtonraphson/>} />
          <Route path="/secant" element={<Secant/>} />

        </Routes>
    );
  }
}


export default App;