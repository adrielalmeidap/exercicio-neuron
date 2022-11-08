import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'font-awesome/css/font-awesome.min.css'
import "./index.css";

import { Logo } from './components/logo/logo';
import { Menu } from './components/menu/menu';
import ViewPage from './pages/View';
import EditPage from './pages/Edit';
import CreatePage from './pages/Create';

class App extends Component {

  render() {
    return (
			<BrowserRouter>
				<div className='app'>
        	<Logo />
        	<Menu />
        	<Routes>
          	<Route path={"/"} element={<HomePage />} />
            <Route path={"/view/:id"} element={<ViewPage/>} />            
            <Route path={"/person/:id"} element={<EditPage />} />
            <Route path={"/create/"} element={<CreatePage />} />
        	</Routes>
      	</div>
			</BrowserRouter>
    );
  }
}

export default App;