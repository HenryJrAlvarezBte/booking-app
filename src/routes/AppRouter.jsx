import { Routes, Route } from 'react-router';
import { Details, Home, Login, Register, Reservations } from '../app';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import Protected from './Protected';
import Public from './Public';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppRouter() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="/hotel/:id" element={<Details />} />
					<Route
						path="/reservations"
						element={
							<Protected>
								<Reservations />
							</Protected>
						}
					/>
				</Route>

				<Route
					element={
						<Public>
							<AuthLayout />
						</Public>
					}
				>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
			</Routes>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}

export default AppRouter;
