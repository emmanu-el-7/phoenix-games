import React, { useState } from 'react';
import { useAuth } from '../../slices/authSlice';
import { NavLink } from 'react-router-dom';
import Message from '../../components/Message/Message';

const Register = () => {
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
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div id='register'>
			<h2>InstaUFSC</h2>
			<p className='subtitle'>
				Cadastre-se para ver as fotos dos seus contatos.
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
