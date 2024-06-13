import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';

const Profile = () => {
	const { customer, loading, error } = useAuth();
	const [customerDetails, setCustomerDetails] = useState(null);

	useEffect(() => {
		const fetchCustomerDetails = async () => {
			if (customer && customer.id) {
				try {
					const customerData = await authService.getCustomerDetails(
						customer.id
					);
					setCustomerDetails(customerData);
				} catch (err) {
					console.error('Failed to fetch customer details:', err);
				}
			}
		};

		fetchCustomerDetails();
	}, [customer]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div id='customer-page'>
			<h2>customer Profile</h2>
			{customerDetails ? (
				<div>
					<p>Name: {customerDetails.name}</p>
					<p>Email: {customerDetails.email}</p>
				</div>
			) : (
				<p>No customer details available</p>
			)}
		</div>
	);
};

export default Profile;
