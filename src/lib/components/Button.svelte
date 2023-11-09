<script>
	
	let buttonProps = {
	class:[$$restProps.class]
	}
</script>
	<button on:click
			on:mouseover
			on:mouseenter
			on:mouseleave
		{...buttonProps}>
			<slot/>
	</button>

<style>
	button{
		background-color: transparent;
		padding: 0.5rem;
		border-radius: 1rem;
		border: solid 1px black;
		box-shadow: 0px 0px 6px black;
	}
	button:hover{
		cursor: pointer;
		background-color: lightgray;
	}
	.primary{
		color:green;
	}
	.danger {
		color:red;
	}
	.sm {
		font-size:1em;
		padding:0.1em;
	}
	.lg {
		font-size:2em
	}
</style>