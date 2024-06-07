import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../slices/authSlice';
import Message from '../../components/Message/Message';
import './Auth.css';

const Login = () => {
	const navigate = useNavigate();
	const [customer, setCustomer] = useState({
		email: '',
		password: '',
	});

	const { login, reset, loading, error } = useAuth();

	const handleChange = (e) => {
		setCustomer({
			...customer,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await login(customer);
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div id='login'>
			<h2>Phoenix Games</h2>
			<p className='subtitle'>
				Faça o login para ter acesso ao maior acervo de jogos da América Latina
			</p>
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
					Não possui cadastro? <NavLink to='/register'>Clique aqui</NavLink>
				</p>
			</form>
		</div>
	);
};

export default Login;
