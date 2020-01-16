<script>
	import * as d3 from "d3"
	import { onMount } from "svelte"
	import moment from "moment"
	import _ from "lodash"
	import {words} from "./data.js"
	export let name;

	// example data and chart

	let data

	import Chart from "./Chart.svelte"

	let kind = 'Line'
	let data_type = 'Timeseries (year)'

	function generateData(){
		let N = Math.floor(Math.random()*100)
		let M = 3
		let labels
		let type = data_type
		if (type == 'Timeseries (year)'){
			labels = _.range(N).map(d => new Date(1900+d,1,1))
			labels = _.sortBy(labels, l => l.toISOString())	
		} else if (type == "Timeseries (month)"){
			labels = _.range(N).map(d => moment('2000-01-01').add(d, 'months'))
		} else if (type == "Timeseries (day)"){
			labels = _.range(N).map(d => moment('2018-01-01').add(d, 'days'))
		} else if (type == 'Float') {
			labels = _.sortBy(_.range(N).map(d => Math.random()*100), d => d)
		} else if (type == 'Integer') {
			labels = _.sortBy(_.range(N).map(d => Math.floor(Math.random()*100)), d=>d)
		} else if (type == "Categorical") {
			labels = d3.shuffle(words).slice(0, N)
		}
		data = {
			labels,
			datasets: _.range(M).map(i => {
				return {
					label: `Series ${i}`,
					data: _.range(N).map(d => Math.random()*10+3*i)
				}
			})
		}
	}

	onMount(generateData)
</script>

<main>
	<h1>Hello {name}!</h1>
	<pre>Let's make a charting library</pre>
	
	<div>
		<div>
			<select bind:value={kind}>
				<option value='GroupedBar'>Bar</option>
				<option value='StackedBar'>Stacked bar</option>
				<option value='Line'>Line</option>
				<option value='Scatter'>Scatter</option>
				<option value='Table'>Table</option>
			</select>

			<select bind:value={data_type} on:change={generateData}>
				<option value='Timeseries (year)'>Timeseries (year)</option>
				<option value='Timeseries (month)'>Timeseries (month)</option>
				<option value='Timeseries (day)'>Timeseries (day)</option>
				<option value='Float'>Float</option>
				<option value='Integer'>Integer</option>
				<option value='Categorical'>Categorical</option>
			</select>
		</div>
		<Chart {data} {kind}/>
	</div>
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