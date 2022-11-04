import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

class App extends Component {

  render() {
    return (
      <Routes>
        <Route path={"/"} element={<HomePage />} />
      </Routes>
    );
  }
}

export default App;