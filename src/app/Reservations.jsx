import { useEffect, useState } from 'react';
import useApiFetch from '../hooks/useApiFetch';
import Modal from '../components/Modal';
import Review from '../components/reservations/Review';
import ReservationsList from '../components/reservations/ReservationsList';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Reservations() {
	const [reservations, fetchReservations, loading, error] = useApiFetch();
	const [openModal, setOpenModal] = useState(false);
	const [child, setChild] = useState(null);

	useEffect(() => {
		fetchReservations({
			url: '/bookings',
		});
	}, [fetchReservations]);

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

	const handleDelete = (id) => {
		fetchReservations({
			url: `/bookings/${id}`,
			method: 'DELETE',
		});
	};

	const closeModal = () => {
		setOpenModal(false);
	};

	const handleOpenModal = (id) => {
		setOpenModal(true);
		setChild(<Review hotelId={id} closeModal={closeModal} />);
	};

	return (
		<div className="max-w-5xl mx-auto px-5 py-16">
			{loading && <p>Loading...</p>}
			{reservations.length > 0 ? (
				<ReservationsList
					reservations={reservations}
					onDelete={handleDelete}
					onRate={handleOpenModal}
				/>
			) : (
				<p>No reservation found.</p>
			)}
			<button className="btn" onClick={() => setOpenModal(true)}>
				Open
			</button>
			<Modal openModal={openModal} closeModal={closeModal}>
				{child}
			</Modal>
		</div>
	);
}

export { Reservations };
