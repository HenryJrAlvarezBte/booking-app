import { useState } from 'react';
import ReviewRating from './ReviewRating';
import useApiFetch from '../../hooks/useApiFetch';

const initialState = {
	hotelId: null,
	rating: 0,
	comment: '',
};

function Review({ hotelId, closeModal }) {
	const [_, fetchReview] = useApiFetch();
	const [review, setReview] = useState({ ...initialState, hotelId });
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async () => {
		const { comment, rating } = review;
		if (!comment || rating === 0) {
			return setErrorMessage('Please fill all the fields');
		}

		try {
			await fetchReview({
				url: '/reviews',
				method: 'POST',
				body: { ...review, hotelId },
			});

			setReview(initialState);
			closeModal();
		} catch (error) {
			setErrorMessage('Failed to submit the review. Please try again.');
		}
	};

	return (
		<div className="w-80">
			<h2 className="text-2xl font-semibold mb-4">Review</h2>

			{errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}

			<div className="mb-4">
				<ReviewRating setReview={setReview} />
			</div>

			<div>Rating</div>
			<textarea
				className="input-form resize-none h-24"
				placeholder="Write your review here..."
				value={review.comment}
				onChange={(e) => setReview({ ...review, comment: e.target.value })}
			/>

			<button className="btn" onClick={handleSubmit}>
				Submit
			</button>
		</div>
	);
}

export default Review;
