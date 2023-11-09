import { randomUUID } from 'crypto';
import { db } from '../lib/db';
import { Config } from '/src/Config';

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
		console.log(formData.get('latitude'))
		await db.push(
			'/sightings[]',
			{
				id: randomUUID(),
				username: Config.username,
				location: {
					latitude: formData.get('latitude'),
					longitude: formData.get('longitude')
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
