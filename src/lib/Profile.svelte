<script>
    import {onMount} from 'svelte';
    import { goto } from '$app/navigation';
    let user = {
        name: 'bard',
        email: 'bard@kiekebo.com',
        profilePicture: '/src/lib/assets/jhl3.jpeg',
        birthday: '01-01-2000',
        sightings: []
    };

    export let sightings;

    let filteredSightings = [];

    let title = '';

    onMount(async () => {
        filteredSightings = sightings;
        getSightings();
    });

    async function getSightings(){
        console.log(sightings);
        console.log(filteredSightings);
    }

    function filter() {
        //filter sightings
        if(title.length == 0) {
            filteredSightings = sightings;
            return;
        }
        filteredSightings = sightings.filter(sighting => sighting.title == title);
    }
</script>

<div class="profile">
    <div class="exitbutton">
        <button on:click={() => goto('/')}>back</button>
    </div>

    <img src={user.profilePicture} alt="Profile picture" class="profile-picture">
    <h1>name: {user.name}</h1>
    <p>email: {user.email}</p>
    <p>birthday: {user.birthday}</p>

    <h2>Sightings:</h2>
    <div class="filter">
        <form>

            <label for="title">title</label>
            <input type="text" id="title" name="title" bind:value={title}>

            <button type="submit" on:click={filter}>Apply</button>
        </form>
    </div>
    {#each filteredSightings as sighting}
        <div class="list-item">
            <span>{sighting.timestamp} by {sighting.username}</span>
            <h2>{sighting.title}</h2>
            <h3>{sighting.location}</h3>
            <p>{sighting.description}</p>
        </div>
    {/each}
</div>
    


<style>
    .profile{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }
    .profile-picture {
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .list-item {
        border: 1px solid black;
        padding: 0.5rem;
        border-radius: 0.5rem;
        width: 75%;
    }

    .list-item span {
        font-size: 0.75rem;
    }

    .list-item h2 {
        font-size: 2rem;
    }

    .list-item p {
        font-size: 1rem;
    }
    
</style>