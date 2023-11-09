<script>
      import { onMount } from 'svelte';

    export let closePopup;

    export let addSighting;

    let defaultTimestamp = new Date().toISOString().slice(0, 16); // slice to fit the datetime-local input format

    let newSighting = {
    username: '',
    title: '',
    description: '',
    location: {
        latitude: null,
        longitude: null
    },
    timestamp: defaultTimestamp
    };
    function getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        newSighting.location.latitude = position.coords.latitude;
        newSighting.location.longitude = position.coords.longitude;
      }, (error) => {
        console.error('Geolocation error:', error);
      });
        } else {
        console.error('Geolocation is not supported by this browser.');
        }
    }

    onMount(() => {
        getLocation();
    });

    function submitForm() {
    addSighting(newSighting);
    closePopup();
    }
  </script>
  
  <div class="popup">
    <div class="popup-content">
      <!-- Add your form fields and logic here -->
        <h1>Add Sighting</h1>
        <form on:submit|preventDefault={submitForm} class="add-sighting-form">
            <label for="username">Username</label>
            <input id="username" type="text" bind:value={newSighting.username} required />
          
            <label for="title">Title</label>
            <input id="title" type="text" bind:value={newSighting.title} required />
          
            <label for="description">Description</label>
            <textarea id="description" bind:value={newSighting.description} required></textarea>
          
            <label for="latitude">Latitude</label>
            <input id="latitude" type="number" step="any" bind:value={newSighting.location.latitude} required />
          
            <label for="longitude">Longitude</label>
            <input id="longitude" type="number" step="any" bind:value={newSighting.location.longitude} required />
          
            <label for="timestamp">Timestamp</label>
            <input id="timestamp" type="datetime-local" bind:value={newSighting.timestamp} required />
          
            <button type="submit">Submit</button>
            <button type="button" on:click={closePopup}>Cancel</button>
          </form>
        </div>
  </div>
  
  <style>
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
  </style>
  