<script>
    export let sighting;
</script>

<div class="sighting">
    <span>{sighting.timestamp} by {sighting.username}</span>
    <h2>{sighting.title}</h2>
    <h3>{sighting.location.latitude} {sighting.location.longitude}</h3>
    <p>{sighting.description}</p>
</div>