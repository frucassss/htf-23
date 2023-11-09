<script>
	const formatter = Intl.DateTimeFormat('nl-BE', { dateStyle: 'medium', timeStyle: 'short' });
	import Map from '$lib/Map/Map.svelte';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation'
	import dangerLogo from '$lib/assets/danger-alert.svg';

	export let data;
	$: sightings = data.sightings.map((s) => ({
		...s,
		timestamp: formatter.format(new Date(s.timestamp))
	}));

 
	let isPopupOpen = false;
	let location = {
		"longitude":"",
		"latitude":""
	}

	let items = [
    { id: 'danger', name: 'Danger' },
    { id: 'warning', name: 'Warning' },
    { id: 'safe', name: 'safe' },
  ];
	function togglePopup() {
		isPopupOpen = !isPopupOpen;
		getLocation();
	}
	function reloadSightings(){
		sightings = data.sightings.map((s) => ({
		...s,
		timestamp: formatter.format(new Date(s.timestamp))
	}));

	}
    function getLocation() {
  // This function will request the user's current location.

  // Check if the Geolocation API is supported
  if (!('geolocation' in navigator)) {
    console.error('Geolocation is not supported by your browser.');
    return; // Exit the function if Geolocation is not supported
  }

  // Define a function to handle successful retrieval of location
  function handleSuccess(position) {
    const { latitude, longitude } = position.coords;
	location.longitude = longitude
	location.latitude = latitude
    // You can also proceed to set the location in your application's state here
    // newSighting.location = { latitude, longitude };
  }

  // Define a function to handle errors
  function handleError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.error('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        console.error('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        console.error('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        console.error('An unknown error occurred.');
        break;
    }
  }

  // Options for the geolocation request
  const options = {
    enableHighAccuracy: true, // Provides a hint that the application needs the best possible results
    timeout: 5000, // The maximum length of time (in milliseconds) that is allowed to pass from the call to geolocation.getCurrentPosition() or geolocation.watchPosition() until the corresponding successCallback is invoked
    maximumAge: 0 // Indicates that the application wants to receive a fresh position and does not wish to use a cached position
  };

  // Make the geolocation request
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
	}
	let selectedValue = 'safe'; // default value or bind to your select element
// This function updates the class on the select element based on the selection
function updateSelectClass(value) {
  const selectElement = document.querySelector('.my-select');
  selectElement.className = `my-select ${value}`; // Resets the class list and adds the value as a class
}
    onMount(() => {
        getLocation();
    });

</script>

<div class="container">
	<div class="map-container">
		<Map markers={sightings.map((s) => ({ id: s.id, location: s.location }))} />
	</div>
	<div class="list-container">
		<h1>Sightings</h1>
		<button on:click={togglePopup}>Add Sighting</button>
		{#each sightings as sighting}
			<div class="list-item danger-level-{sighting.danger}">
				<span>{sighting.timestamp} by {sighting.username}</span>
				<h2>{sighting.title}</h2>
				<span>{sighting.description}</span>
				<figure class="danger-logo logo-color-{sighting.danger}">
					{#if sighting.danger === "danger"}
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
					  </svg>
					{:else if sighting.danger === "warning"}
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
					  </svg>
					  
					{:else}
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
					  </svg>
					  
					{/if}
															  
				</figure>				  
			</div>
		{/each}
	</div>
	{#if isPopupOpen}
		<div class="popup">
			<div class="popup-content">
				<h1>Add Sighting</h1>
				<form method="POST" class="add-sighting-form" use:enhance={({}) => {
					return async ({ result }) =>{
						if (result.type === "success"){
							togglePopup()
							invalidateAll()
						}
					}
				}}>
					<label for="username">Username</label>
					<input name="username" id="username" type="text" required />
				
					<label for="title">Title</label>
					<input name="title" id="title" type="text" required />
				
					<label for="description">Description</label>
					<textarea name="description" id="description" required></textarea>

					<label for="danger">Danger option</label>
					<select id="danger" name="danger" class="my-select {selectedValue}" on:change="{e => updateSelectClass(e.target.value)}" bind:value="{selectedValue}">
						{#each items as item}
						  <option value="{item.id}">{item.name}</option>
						{/each}
					</select>

					<label for="latitude">Latitude</label>
					<input name="latitude" id="latitude" type="number" step="any" bind:value={location.latitude} required />
				
					<label for="longitude">Longitude</label>
					<input name="longitude" id="longitude" type="number" step="any" bind:value={location.longitude} required />
				
					<button type="submit">Submit</button>
					<button type="button" on:click={togglePopup}>Cancel</button>
				</form>
			</div>
	  	</div>
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
	button{
		background-color: lightgray;
		padding: 0.5rem;
		border-radius: 1rem;
		box-shadow: 0px 0px 8px black;
	}
	button:hover{
		cursor: pointer;
		background-color: gray;
	}
	.list-item {
		border: 1px solid black;
		padding: 1rem;
		border-radius: 1rem;
		position: relative;
	}
	.list-item .danger-logo{
		position: absolute;
		top: 0.2rem;
		right:0.2rem;
		width: 2rem;
		height: 2rem;
		
	}
	.list-item figure{
		margin: 0;
	}
	.list-item .logo-color-warning svg{
		stroke: orange;
	}
	.list-item .logo-color-danger svg{
		stroke: red;
	}
	.list-item .logo-color-safe svg{
		stroke: green;
	}
	.popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .popup-content {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      /* Add more styling as needed */
    }

	form{
		display: flex;
	  flex-direction: column;
		gap: 0.5rem;
		width: 30rem;
	}

	form button{
		color: black;
		background-color: lightgray;
		border-radius: 0.5rem;
		padding: 0.5rem;
	}
	
	form select option[value="danger"]{
		color: red;
	}
	form select option[value="warning"]{
		color: orange;
	}
	form select option[value="safe"]{
		color: green;
	}
	.my-select.danger {
    color: red;
  }
  
  .my-select.warning {
    color: orange;
  }
  
  .my-select.safe {
    color: green;
  }
  
</style>
