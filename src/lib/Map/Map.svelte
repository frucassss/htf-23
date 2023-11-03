<script>
	import L from 'leaflet';
	import Marker from './Marker.svelte';
	export let markers;

	let map;
	function createMap(container) {
		let m = L.map(container, { preferCanvas: true }).setView([50.5, 4.5], 8);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
	        &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`
		}).addTo(m);

		return m;
	}

	function mapAction(container) {
		map = createMap(container);
		return {
			destroy: () => {
				map.remove();
				map = null;
			}
		};
	}
</script>

<div use:mapAction class="map">
	{#each markers as marker (marker.id)}
		<Marker latlng={marker.location} {map} />
	{/each}
</div>

<style>
	@import '../../../node_modules/leaflet/dist/leaflet.css';

	.map {
		height: 100%;
		width: 100%;
	}
</style>
