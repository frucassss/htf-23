<script>
    export let sighting;
</script>

<div class="sighting">
    <em>{sighting.timestamp} by {sighting.username}</em>
    <h2>{sighting.title}</h2>
    <h3>{sighting.location.latitude} {sighting.location.longitude}</h3>
    <p>{sighting.description}</p>
</div>

<style>
    p {
        font-size:1.2rem;
        }

    em {
        font-size:0.8rem;
        }
    
</style>