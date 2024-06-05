import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import Main from '../src/pages/Home/Main';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {
	return (
		<Router>
			<Main path='/' />
			<Login path='/login' />
			<Register path='/register' />
		</Router>
	);
}

export default App;
