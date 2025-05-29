import React from 'react';
import { useAuth } from '../context/auth';
import { Reservations } from '../app';

function Protected({ children }) {
	const { isAuth } = useAuth();

	if (isAuth) {
		return <Reservations />;
	}
	return children ? children : <Outlet />;
}

export default Protected;
