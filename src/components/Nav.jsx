import { Link } from 'react-router';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Nav() {
	const { isAuth, logout } = useAuth();

	const handleLogout = () => {
		logout();
		toast.info('Has cerrado sesión exitosamente');
	};

	return (
		<div className="grid place-content-center py-5">
			<div className="flex items-center gap-6">
				{isAuth ? (
					<>
						<Link to="/reservations">Reservations</Link>
						<button className="btn bg-red-500" onClick={handleLogout}>
							Logout
						</button>
					</>
				) : (
					<>
						<Link
							to="/login"
							className="text-md font-semibold hover:text-blue-500 transition-colors"
						>
							Login
						</Link>
						<Link
							to="/register"
							className="text-md font-semibold hover:text-blue-500 transition-colors"
						>
							Sign up
						</Link>
					</>
				)}
			</div>
		</div>
	);
}

export default Nav;
