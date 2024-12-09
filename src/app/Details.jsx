import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../context/auth';
import { MdLockOutline } from 'react-icons/md';
import useApiFetch from '../hooks/useApiFetch';
import Spinner from '../components/home/Spinner';
import Reservation from '../components/details/Reservation';
import Description from '../components/details/Description';
import Gallery from '../components/details/Gallery';
import Map from '../components/details/Map';
import Hero from '../components/details/Hero';
import Reviews from '../components/details/Reviews';
import Related from '../components/details/Related';

export const Details = () => {
	const params = useParams();
	const { isAuth } = useAuth();
	const [hotel, getHotel] = useApiFetch();

	useEffect(() => {
		getHotel(`/hotels/${params.id}`);
	}, [params.id]);

	if (!hotel)
		return (
			<div className="grid place-content-center min-h-[100dvh]">
				<Spinner className="w14 h-14 text-gray-200 fill-blue-500 animate-spin" />
			</div>
		);

	return (
		<div>
			<Hero hotel={hotel} />

			<div className="max-w-5xl mx-auto px-5 py-10">
				<h2 className="text-2xl font-semibold text-center mb-4">Reserve</h2>

				<div className="mb-4">
					{isAuth ? (
						<Reservation hotelId={hotel?.id} />
					) : (
						<p className="flex items-center justify-center gap-1">
							<MdLockOutline className="size-5" />
							<span className="text-sm">
								Please, login to make a reservation.
							</span>
						</p>
					)}
				</div>

				<div className="grid grid-cols-2 gap-5">
					<div className="col-span-2">
						<Description
							address={hotel?.address}
							rating={hotel?.rating}
							description={hotel?.description}
						/>
					</div>
					<div className="grid grid-cols-2 gap-5 mb-8">
						<Gallery hotel={hotel} />
					</div>
					<div>
						<Map lat={hotel?.lat} lon={hotel?.lon} />
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Reviews hotelId={hotel?.id} />
						</div>

						<div className="h-full">
							<div className="sticky top-20">
								<Related cityId={hotel?.cityId} hotelId={hotel?.id} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
