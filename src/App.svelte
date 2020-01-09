<script>
	import _ from "lodash"
	export let name;

	/*
	GOAL
	-------
	Implement 4 kinds of chart:
		- stacked bar charts
		- grouped bar charts
		- fill bar charts (normalized stacked)
		- line charts
		- scatter plot
	
	Implement automatic axes generation:
		- categorical
		- time series
		- numerical

	
	*/

	let data = {
		columns: ['a', 'b'],
		number_columns: ['a', 'b'],
		non_number_columns: [],
		data_types: ['number', 'number'],
		rows: _.range(15).map(v => [v, 10*Math.random()])
	}

	import LineChart from "./LineChart.svelte"
</script>

<main>
	<h1>Hello {name}!</h1>
	<pre>Let's make a charting library</pre>
	
	<LineChart {data}/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>