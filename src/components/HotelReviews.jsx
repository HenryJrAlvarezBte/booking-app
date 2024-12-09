import { useEffect } from 'react';
import useApiFetch from '../hooks/useApiFetch';
import ReviewsList from './ReviewsList';

function HotelReviews({ hotelId }) {
	const [reviews, fetchReviews, loading, error] = useApiFetch();

	useEffect(() => {
		if (hotelId) {
			fetchReviews(`/hotels/${hotelId}/reviews`);
		}
	}, [hotelId, fetchReviews]);

	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">Reviews</h2>
			{loading && <p>Loading...</p>}
			{error && <p className="text-red-500">{error}</p>}
			<ReviewsList reviews={reviews} />
		</div>
	);
}

export default HotelReviews;
