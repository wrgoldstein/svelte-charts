<script>
	import _ from "lodash"
	import * as d3 from "d3"
	import {onMount} from "svelte"

	export let data

	let css_id = Math.random().toString(36).substr(2, 5)

	function getTicks (count, max) {
		return [...Array(count).keys()].map(d => {
			return (max / (count - 1) * parseInt(d)).toFixed(2)
		});
	}

	// setup chart
	let width = 500
	let height = 300
	let margin = {top: 10, right: 10, bottom: 20, left: 40}

	window._ = _
	window.d3 = d3

	// calc x axis
	let x = d3.scaleLinear().domain(d3.extent(data.labels)).range([margin.left, width - margin.right])
	let x_ticks = x.ticks()
	let y = d3.scaleLinear()
		.domain(d3.extent(_.flatten(d3.extent(data.datasets, (ds) => ds.data)))).nice()
		.range([height - margin.bottom, margin.top])
		
	let line = d3.line().x((d,i) => x(data.labels[i])).y(d => y(d))
	let y_ticks = y.ticks()

	window.x = x
	window.y = y

	onMount(() => {
        d3.axisBottom(x)(d3.select(`#xaxis-${css_id}`))
        d3.axisLeft(y)(d3.select(`#yaxis-${css_id}`))
    })
</script>

<div class="container">
	<div 
		class="LineChart" 
		style="
			width: {width}px;
			height: {height}px;
		">
		<svg width={width} height={height}>
			{#each data.datasets as ds, i}
				<g style="stroke: {d3.schemeTableau10[i]};">
					<path d={line(ds.data)} />
				</g>
			{/each}
			<g id="xaxis-{css_id}" class="axis" transform="translate(0, {height - margin.bottom})"></g>
			<g id="yaxis-{css_id}" class="axis" transform="translate({margin.left}, 0)"></g>
		</svg>
	</div>
</div>

<style>
	.container {
		padding: 1em;
		display: inline-block;
		background-color: aliceblue;
	}
	.LineChart {
		position: relative;
		padding-left: 40px;
		padding-bottom: 40px;
		margin-right: 40px;
		margin-top: 40px;
	}

	svg {
		fill: none;
		display: block;
		stroke-width: 3px;
	}

	.axis {
		stroke-width: 1px;
	}
</style>
