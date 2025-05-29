import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import * as z from 'zod';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
	firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
	lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres.'),
	email: z.string().email('Debe ser un correo electrónico válido.'),
	password: z
		.string()
		.min(6, 'La contraseña debe tener al menos 6 caracteres.'),
	gender: z.enum(
		['male', 'female', 'other'],
		'Debe seleccionar un género válido.',
	),
});

function RegisterForm() {
	const { register: createUser } = useAuth();
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
			await createUser(dataForm);
			toast.success('Registro exitoso');
			reset();
			navigate('/login');
		} catch (error) {
			toast.error('Error al registrarse. Por favor, intenta nuevamente');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-4">
				<label className="block font-semibold">First Name</label>
				<input
					placeholder="first name"
					className="input-form"
					{...register('firstName')}
				/>
				{errors.firstName && (
					<p className="error-validation">{errors.firstName.message}</p>
				)}
			</div>

			<div className="mb-4">
				<label className="block font-semibold">Last Name</label>
				<input
					placeholder="last name"
					className="input-form"
					{...register('lastName')}
				/>
				{errors.lastName && (
					<p className="error-validation">{errors.lastName.message}</p>
				)}
			</div>

			<div className="mb-4">
				<label className="block font-semibold">Email</label>
				<input
					placeholder="email"
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

			<div className="mb-4">
				<label className="block font-semibold">Gender</label>
				<select className="input-form" {...register('gender')}>
					<option value="">Select a genre</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="other">Other</option>
				</select>
				{errors.genre && (
					<p className="error-validation">{errors.genre.message}</p>
				)}
			</div>

			<button className="btn w-full">Registrarse</button>
		</form>
	);
}

export default RegisterForm;
