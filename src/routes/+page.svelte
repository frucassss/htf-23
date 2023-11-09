<script>
	const formatter = Intl.DateTimeFormat('nl-BE', { dateStyle: 'medium', timeStyle: 'short' });
	import Map from '$lib/Map/Map.svelte';
	import AddSightingPopup from '../lib/AddSightingPopup.svelte';
	import Button from '../lib/components/Button.svelte';
	export let data;
	$: sightings = data.sightings.map((s) => ({
		...s,
		timestamp: formatter.format(new Date(s.timestamp))
	}));
	// Popup visibility state
	let isPopupOpen = false;

	// Function to toggle popup visibility
	function togglePopup() {
		isPopupOpen = !isPopupOpen;
	}

	function addSighting(sighting) {
    // Logic to add the sighting to your state or send it to a server
    console.log('Adding sighting:', sighting);
  }
</script>

<div class="container">
	<div class="map-container">
		<Map markers={sightings.map((s) => ({ id: s.id, location: s.location }))} />
	</div>
	<div class="list-container">
		<h1>Sightings</h1>
		<Button on:click={togglePopup}>Add Sighting</Button> <!-- Button to add sighting -->
		{#each sightings as sighting}
			<div class="list-item">
				<span>{sighting.timestamp} by {sighting.username}</span>
				<h2>{sighting.title}</h2>
				<span>{sighting.description}</span>
			</div>
		{/each}
	</div>
	{#if isPopupOpen}
		<AddSightingPopup closePopup={togglePopup} addSighting={addSighting} />
	{/if}
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
		z-index: 0;
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
