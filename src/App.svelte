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

	let kind = 'GroupedBar'

	data = {
    labels: [0,1,2],
    datasets: [
      { label: "oranges" , data: [1,2,3] },
      { label: "apples" , data: [4,2,3] }
    ]
  }
</script>

<main>
	<h1>Hello {name}!</h1>
	<pre>Let's make a charting library</pre>

  <div class="chart-container">
    <Chart {kind} {data} title="Untitled"/>
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

	.chart-container {
    margin: auto;
		width: 80%;
		height: 250px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>