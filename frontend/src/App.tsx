import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'font-awesome/css/font-awesome.min.css'
import "./index.css";

import { Logo } from './components/logo/logo';
import { Menu } from './components/menu/menu';

class App extends Component {

  render() {
    return (
      <div className='app'>
        <Logo />
        <Menu />
        <Routes>
          <Route path={"/"} element={<HomePage />} />
        </Routes>
      </div>
    );
  }
}

export default App;