import { randomUUID } from 'crypto';
import { db } from '../lib/db';

export const ssr = false;

export async function load() {
	const { sightings } = await db.getData('sightings');
	return {
		sightings
	};
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		await db.push(
			'/sightings[]',
			{
				id: randomUUID(),
				username: formData.get('username'),
				location: {
					latitude: 51.1901512,
					longitude: 4.4249487
				},
				danger: formData.get('danger'),
				timestamp: new Date().toISOString(),
				title: formData.get('title'),
				description: formData.get('description')
			},
			true
		);
		await db.save();
		await db.reload();
	}
};
