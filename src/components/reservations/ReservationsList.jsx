import ReservationCard from './ReservationCard';

function ReservationsList({ reservations, onDelete, onRate }) {
	console.log(reservations);

	return (
		<div className="grid grid-cols-[repeat(auto-fill,min-max(250px,1fr))] gap-6">
			{reservations.map((reservation) => (
				<ReservationCard
					key={reservation.id}
					reservation={reservation}
					onDelete={onDelete}
					onRate={onRate}
				/>
			))}
			{reservations.length === 0 && <p>No reservation found.</p>}
		</div>
	);
}

export default ReservationsList;
