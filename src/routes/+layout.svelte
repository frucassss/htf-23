<script>
	import logo from '$lib/assets/jhl3.jpeg';
</script>

<nav>
	<img alt="The project logo" src={logo} />
	<span class="title">Jungle Hike Logger</span>
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
</style>
