import React, { useState } from 'react';
import { useAuth } from '../../slices/authSlice';
import { Link } from '@reach/router';

const Login = () => {
	const [customer, setcustomer] = useState({
		email: '',
		password: '',
	});

	const { login, reset, loading, error } = useAuth();

	const handleChange = (e) => {
		setcustomer({
			...customer,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await login(customer);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div id='login'>
			<h2>InstaUFSC</h2>
			<p className='subtitle'>Faça o login para ver as novidades.</p>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='E-mail'
					name='email'
					onChange={handleChange}
					value={customer.email}
				/>
				<input
					type='password'
					placeholder='Senha'
					name='password'
					onChange={handleChange}
					value={customer.password}
				/>
				{!loading && <input type='submit' value='Entrar' />}
				{loading && <input type='submit' value='Aguarde...' disabled />}
				{error && <Message msg={error} type='error' />}
				<p>
					Não possui cadastro? <Link to='/register'>Clique aqui</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
