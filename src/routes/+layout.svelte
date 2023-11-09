<script>
	import logo from '$lib/assets/jhl3.jpeg';
	import ProfilePopup from '../lib/ProfilePopup.svelte';
	import Button from '../lib/components/Button.svelte';
	import { goto } from '$app/navigation';
</script>

<nav>
	<div>
		<img alt="The project logo" src={logo} />
		<span class="title">Jungle Hike Logger</span>
	</div>
	<div class="button">

	<button on:click={() => goto('/profile')}>Go to Profile</button>
		
	</div>
</nav>
<div class="container">

	<slot />
</div>

<style>
	:root {
		--nav-height: 120px;
		--border-width: 3px;
	}
	nav {
		height: var(--nav-height);
		border-bottom: var(--border-width) solid #1c4532;
		display: flex;
		align-items: center;
		padding-inline: 2rem;
		justify-content: space-between;
	}

	img {
		width: calc(var(--nav-height) - var(--border-width));
		height: calc(var(--nav-height) - var(--border-width));
		margin-right: 2rem;
	}

	.title {
		font-size: 2rem;
		font-weight: bold;
	}
	.container {
		height: calc(100% - var(--nav-height));
	}

	nav > div {
  display: flex;
  align-items: center; /* This ensures that the contents of the div are vertically centered */
}

.title {
  display: inline-block; /* This makes the title align better inline with other elements */
  vertical-align: middle; /* Aligns the text vertically in the middle - may not be necessary with flexbox, but can help in some scenarios */
  margin: 0; /* Resets any default margin that may be affecting the position */
}

/* If the above doesn't fix the issue, you may want to check the line-height and adjust it accordingly */
.title {
  line-height: 1; /* This reduces the space above and below the text, which can affect vertical alignment */
}

/* You might also want to ensure that there's no additional padding or margin affecting the alignment */
nav {
  padding: 0; /* Adjust padding as needed */
}

img {
  margin: 0; /* Adjust margin as needed */
}

.button{
	margin-right: 2rem;
}


</style>
