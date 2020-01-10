<script>
	import _ from "lodash"
	import * as d3 from "d3"

	export let data

	function getTicks (count, max) {
		return [...Array(count).keys()].map(d => {
			return (max / (count - 1) * parseInt(d)).toFixed(2)
		});
	}

	// setup chart
	let width = 500
	let height = 300
	let margin = 20

	window._ = _
	window.d3 = d3

	// calc x axis
	let x = d3.scaleLinear().domain(d3.extent(data.rows, r => r[0])).range([0, width])
	let x_ticks = x.ticks()
	
	let y_column_indices = data.y_columns.map(c => data.columns.indexOf(c))

	// calc y axis
	let flattened_y = _.flatten(data.rows.map(row => {
		return row.filter((_, i) => y_column_indices.includes(i))
	}))
	let mega_y = d3.scaleLinear()
		.domain(d3.extent(flattened_y).reverse())
		.range([0, height])
	let y_ticks = mega_y.ticks()

	// 	data = {
	// 	columns: data.columns,
	// 	rows: data.rows,
	// 	x_column: 'a',
	// 	y_columns: ['b', 'c']
	// }

	let x_getter = d => x(d[data.columns.indexOf(data.x_column)])

	let lines = y_column_indices.map(i => {
		let y = d3.scaleLinear().domain([d3.max(data.rows, r => r[i]), 0]).range([0, height])
		return d3.line().x(x_getter).y(d => y(d[i]))
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
			{#each lines as line, i}
				<g style="stroke: {d3.schemeTableau10[i]};">
					<path d={line(data.rows)} />
				</g>
			{/each}
		</svg>
		<div class="x-axis">
			{#each x_ticks as tick}
				<div data-value={tick}/>
			{/each}
		</div>
		<div class="y-axis">
			{#each y_ticks as tick}
				<div data-value={tick}/>
			{/each}
		</div>
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
		stroke-width: 2px;
		border-left: 1px solid black;
		border-bottom: 1px solid black;
	}

	.x-axis {
		position: absolute;
		bottom: 0;
		height: 40px;
		left: 40px;
		right: 0;
		display: flex;
		justify-content: space-between;
	}

	.y-axis {
		position: absolute;
		top: 0;
		left: 0;
		width: 40px;
		bottom: 40px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}
	.y-axis > div::after {
		font-size: 10px;
		content: attr(data-value)"╶";
		color: black;		
		display: inline-block;
	}
	.x-axis > div::after {
		font-size: 10px;
		width: 5px;
		display: inline-block;
		content: "╵ "attr(data-value);
		color: black;
	}
</style>
