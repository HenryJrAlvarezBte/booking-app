import React from 'react';
import { Link } from 'react-router';
import Logo from './Logo';

function Brand() {
	return (
		<Link className="flex" to="/">
			<Logo className="w-10 h-10 pr-1.5" />
			<span className="text-3xl font-semibold text-blue-500">Booking</span>
			<span className=" text-3xl font-semibold text-emerald-400">App</span>
		</Link>
	);
}

export default Brand;
