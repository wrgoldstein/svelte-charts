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

	// raw from e.g. an api
	let data = {
		columns: ['a', 'b', 'c'],
		number_columns: ['a', 'b', 'd'],
		non_number_columns: [],
		data_types: ['number', 'number'],
		rows: _.range(35).map(v => [v, 10*Math.random(), 10*Math.random()])
	}

	// prepared for a chart
	data = {
		columns: data.columns,
		rows: data.rows,
		x_column: 'a',
		y_columns: ['b', 'c']
	}

	import LineChart from "./LineChart.svelte"
	import BarChart from "./BarChart.svelte"
</script>

<main>
	<h1>Hello {name}!</h1>
	<pre>Let's make a charting library</pre>
	
	<LineChart {data}/>
	<BarChart {data}/>
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

	h1:hover:after{
		content: 'foooo';
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>