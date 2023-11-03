<script>
	const formatter = Intl.DateTimeFormat('nl-BE', { dateStyle: 'medium', timeStyle: 'short' });
	import Map from '$lib/Map/Map.svelte';
	export let data;
	$: sightings = data.sightings.map((s) => ({
		...s,
		timestamp: formatter.format(new Date(s.timestamp))
	}));
</script>

<div class="container">
	<div class="map-container">
		<Map markers={sightings.map((s) => ({ id: s.id, location: s.location }))} />
	</div>
	<div class="list-container">
		<h1>Sightings</h1>
		{#each sightings as sighting}
			<div class="list-item">
				<span>{sighting.timestamp} by {sighting.username}</span>
				<h2>{sighting.title}</h2>
				<span>{sighting.description}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
	}

	.map-container {
		width: 70%;
		height: 100%;
	}

	.list-container {
		width: 30%;
		height: 100%;
		padding: 1rem 2rem;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border-left: 1px solid black;
	}

	.list-item {
		border: 1px solid black;
		padding: 1rem;
	}
</style>
