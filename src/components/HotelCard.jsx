import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { priceFormat } from '../utils';
import { Link } from 'react-router';
import RatingStars from './home/StarRating';

function HotelCard({ hotel }) {
	return (
		<div className="bg-white round-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
			<div className="aspect-[1.4] overflow-hidden">
				<img
					className="w-full h-full object-cover overflow-hidden"
					src={hotel.images[0].url}
					alt={hotel.name}
				/>
			</div>
			<div className="p-5">
				<h2 className="font-semibold text-lg"> {hotel.name}</h2>
				<div className="flex flex-col gap-2">
					<RatingStars rating={hotel.rating} />
					<span>rating</span>
					<span className="flex items-center gap-1">
						{' '}
						<IoLocationOutline />{' '}
						<span className="text-sm">
							{hotel.city.name}, {hotel.city.country}
						</span>
					</span>
					<span className="font-semibold">
						{priceFormat.format(hotel.price)}
					</span>
					<Link className="btn" to={`/hotel/${hotel.id}`}>
						More Info
					</Link>
				</div>
			</div>
		</div>
	);
}

export default HotelCard;
