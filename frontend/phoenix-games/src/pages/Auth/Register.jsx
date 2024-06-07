import React, { useState } from 'react';
import { useAuth } from '../../slices/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import Message from '../../components/Message/Message';
import './Auth.css';

const Register = () => {
	const navigate = useNavigate();
	const [customer, setcustomer] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { register, reset, loading, error } = useAuth();

	const handleChange = (e) => {
		setcustomer({
			...customer,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await register(customer);
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div id='register'>
			<h2>Phoenix Games</h2>
			<p className='subtitle'>
				Cadastre-se para ter acesso ao maior acervo de jogos da América Latina
			</p>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Nome'
					name='name'
					onChange={handleChange}
					value={customer.name}
				/>
				<input
					type='email'
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
				<input
					type='password'
					placeholder='Confirme a senha'
					name='confirmPassword'
					onChange={handleChange}
					value={customer.confirmPassword}
				/>
				{!loading && <input type='submit' value='Cadastrar' />}
				{loading && <input type='submit' value='Aguarde...' disabled />}
				{error && <Message msg={error} type='error' />}
			</form>
			<p>
				Já possui cadastro? <NavLink to='/login'>Clique aqui</NavLink>
			</p>
		</div>
	);
};

export default Register;
