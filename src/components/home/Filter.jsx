import { useEffect, useRef, useState } from 'react';
import { useHotels } from '../../context/hotels';

function Filter() {
	const { getCities, getHotelByCity, cities } = useHotels();
	const selectRef = useRef();
	const [result, setResult] = useState('');

	useEffect(() => {
		getCities();
	}, [getCities]);

	const handleChange = () => {
		getHotelByCity(selectRef.current.value);
		setResult('');
	};

	return (
		<div className="input-form w-full md:w-fit">
			<select
				ref={selectRef}
				onChange={handleChange}
				className="py-1 px-2 w-full focus:outline-none"
			>
				<option value="">All cities</option>
				{cities.map((city) => (
					<option key={city?.id} value={city?.id}>
						{city?.name}
					</option>
				))}
			</select>
		</div>
	);
}

export default Filter;
