import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '../../utils';
import useApiFetch from '../../hooks/useApiFetch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
	checkIn: z.string().min(1, { message: 'Check-In is required' }),
	checkOut: z.string().min(1, { message: 'Check-Out is required' }),
});

function Reservation({ hotelId }) {
	const [data, createReservation, loading, error] = useApiFetch();

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
			if (!hotelId) {
				toast.error('Hotel ID is required');
				return;
			}
			dataForm.hotelId = hotelId;
			await createReservation({
				url: '/bookings',
				method: 'POST',
				body: dataForm,
			});
			toast.success('Reserva creada exitosamente');
			reset();
		} catch (err) {
			toast.error('Error al crear la reserva. Por favor, intenta nuevamente');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex items-center justify-center gap-2 mb-4">
				<div className="flex flex-col md:flex-row md:items-center justify-center gap-2 mb-4">
					<div className="flex flex-col items-center">
						<label htmlFor="check-in" className="font-semibold text-sm">
							Check-In
						</label>
						<input
							id="check-in"
							type="date"
							className="border px-3 py-1 rounded-sm"
							{...register('checkIn')}
						/>
					</div>
					<div className="flex flex-col items-center">
						<label htmlFor="check-out" className="font-semibold text-sm">
							Check-Out
						</label>
						<input
							id="check-out"
							type="date"
							className="border px-3 py-1 rounded-sm"
							{...register('checkOut')}
						/>
					</div>
				</div>

				<button className="btn bg-emerald-500" type="submit" disabled={loading}>
					{loading ? 'Reservando...' : 'Reserve'}
				</button>
			</div>
			<p
				className={cn(
					'error-validation hidden text-center',
					(errors.checkIn || errors.checkOut) && 'block',
				)}
			>
				{errors.checkIn && errors.checkIn.message}{' '}
				{errors.checkOut && errors.checkOut.message}
			</p>
		</form>
	);
}

export default Reservation;
