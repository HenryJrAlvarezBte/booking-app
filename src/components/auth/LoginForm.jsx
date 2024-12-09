import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
	email: z.string().email({ message: 'Ingresa un correo válido' }),
	password: z
		.string()
		.min(6, { message: 'Ingresa una contraseña de al menos 6 caracteres' }),
});

function LoginForm() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(schema),
	});

	const onSubmit = async (dataForm) => {
		try {
			await login(dataForm);
			toast.success('Inicio de sesión exitoso');
			reset();
			navigate('/');
		} catch (error) {
			toast.error(
				'Error al iniciar sesión. Por favor, verifica tus credenciales',
			);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label className="block font-semibold">E-mail</label>
				<input
					type="email"
					placeholder="Ingresa tu correo electrónico"
					className="input-form"
					{...register('email')}
				/>
				{errors.email && (
					<p className="error-validation">{errors.email.message}</p>
				)}
			</div>
			<div className="mb-4">
				<label className="block font-semibold">Password</label>
				<input
					type="password"
					placeholder="Ingresa tu password"
					className="input-form"
					{...register('password')}
				/>
				{errors.password && (
					<p className="error-validation">{errors.password.message}</p>
				)}
			</div>

			<button className="btn w-full">Iniciar sesión</button>
		</form>
	);
}

export default LoginForm;
