import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Home/Main';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</Router>
	);
}

export default App;
