<script>
	import _ from "lodash"
	export let name;


	// raw from e.g. an api
	let data = {
		columns: ['a', 'b', 'c'],
		number_columns: ['a', 'b', 'd'],
		non_number_columns: [],
		data_types: ['number', 'number'],
		rows: _.range(35).map(v => [v, 10*Math.random(), 10*Math.random()])
	}

	data = {
		labels: _.range(15).map(d => new Date(2000+d,1,1)),
		datasets: [{
			label: "Series A",
			data: [1,2,3,4,5,6,7,8,9,10,11,10,8,5,10]
		}, {
			label: "Series B",
			data: _.range(5).map(d => Math.random()*10)
		},	{
			label: "Series C",
			data: _.range(5).map(d => Math.random()*10)
		}]
	}

	import Chart from "./Chart.svelte"

	let kind = 'Line'
</script>

<main>
	<h1>Hello {name}!</h1>
	<pre>Let's make a charting library</pre>
	
	<Chart {data} {kind}/>
	<select bind:value={kind}>
		<option value='GroupedBar'>Bar</option>
		<option value='StackedBar'>Stacked bar</option>
		<option value='Line'>Line</option>
		<option value='Scatter'>Scatter</option>
		<option value='Table'>Table</option>
	</select>
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