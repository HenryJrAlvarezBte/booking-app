import React from 'react';
import useApiFetch from '../../hooks/useApiFetch';
import { useEffect } from 'react';
import RelatedList from './RelatedList';

function Related({ cityId, hotelId }) {
	const [related, getRelateds] = useApiFetch();

	useEffect(() => {
		getRelateds({
			url: `/hotels?cityId=${cityId}`,
		});
	}, [cityId]);

	const filtered = related.filter((hotel) => hotel.id !== hotelId);

	return (
		<div>
			<RelatedList related={filtered} />
		</div>
	);
}

export default Related;
