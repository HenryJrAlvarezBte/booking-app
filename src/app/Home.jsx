import { useEffect, useState } from 'react';
import { useHotels } from '../context/hotels';
import Search from '../components/home/Search';
import HotelsList from '../components/HotelsList';
import Filter from '../components/home/Filter';
import Menu from '../components/Menu';
import { FiFilter } from 'react-icons/fi';

function Home() {
	const { hotels, getAll } = useHotels();
	const [result, setResult] = useState('');
	const [openMenu, setOpenMenu] = useState(false);

	useEffect(() => {
		if (hotels.length === 0) {
			getAll();
		}
	}, [hotels.length, getAll]);

	useEffect(() => {
		localStorage.setItem('hotels', JSON.stringify(hotels));
	}, [hotels]);

	const filtered = hotels.filter((hotel) =>
		hotel.name.toLowerCase().includes(result.toLowerCase()),
	);

	const handleToggle = () => {
		setOpenMenu((prev) => !prev);
	};

	return (
		<div>
			<section className="max-w-5xl mx-auto px-5 py-10">
				<div className="mb-8">
					<Search setResult={setResult} />
					<button className="md:hidden" onClick={handleToggle}>
						<FiFilter className="size-6" />
					</button>
					<Menu openMenu={openMenu} closeMenu={handleToggle} className="">
						<Filter />
					</Menu>
				</div>
				{filtered.length > 0 ? (
					<HotelsList hotels={filtered} />
				) : (
					<p className="text-center">No hotels found.</p>
				)}
			</section>
		</div>
	);
}

export { Home };
