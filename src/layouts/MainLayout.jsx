import React from 'react';
import Header from '../components/home/Header';
import { Outlet } from 'react-router';

function MainLayout() {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
}

export default MainLayout;
