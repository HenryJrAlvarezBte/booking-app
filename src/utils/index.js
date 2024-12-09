import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const priceFormat = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

export const cn = (...styles) => {
	return twMerge(clsx(styles));
};
