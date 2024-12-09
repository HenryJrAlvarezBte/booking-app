import { create } from 'zustand';
import api from '../services/api';

const useHotels = create((set) => ({
	hotels: JSON.parse(localStorage.getItem('hotels') || '[]'),
	loading: false,
	error: null,
	cities: [],
	getAll: async () => {
		set({ loading: true });
		try {
			const res = await api.get('/hotels');
			localStorage.setItem('hotels', JSON.stringify(res.data));
			set({ hotels: res.data });
		} catch (error) {
			set({ error: error.message });
		} finally {
			set({ loading: false });
		}
	},
	getCities: async () => {
		set({ loading: true });
		try {
			const res = await api.get('/cities');
			set({ cities: res.data });
		} catch (error) {
			set({ error: error.message });
		} finally {
			set({ loading: false });
		}
	},
	getHotelByCity: async (cityId) => {
		set({ loading: true });
		try {
			const res = await api.get(`/hotels${cityId ? `?cityId=${cityId}` : ''}`);
			set({ hotels: res.data });
		} catch (error) {
			set({ error: error.message });
		} finally {
			set({ loading: false });
		}
	},
}));

const useReservations = create((set) => ({
	reservations: [],
	loading: false,
	error: null,
	getReservations: async () => {
		set({ loading: true });
		try {
			const res = await api.get('/reservations');
			set({ reservations: res.data });
		} catch (error) {
			set({ error: error.message });
		} finally {
			set({ loading: false });
		}
	},
}));

export { useHotels, useReservations };
