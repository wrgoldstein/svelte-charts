<script>
	import _ from "lodash"
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
	console.log(data.rows)
	// calc x axis
	let max_x = _.max(data.rows.map(r => r[0]))
	let x = val => margin + val/max_x * (width-margin)
	let x_ticks = getTicks(11, max_x)
	
	// calc y axis
	let max_y = _.max(data.rows.map(r => r[1]))
	let y = val => margin + val/max_y * (height-2*margin)
	let y_ticks = getTicks(11, max_y)
	
	// calc chart line(s)
	let [start, ...rest] = data.rows	
	let d = `
          M${x(start[0])} ${y(start[1])} 
          ${data.rows.map(d => {
              return `L${x(d[0])} ${y(d[1])}`;
          }).join(' ')}
		`;
		
</script>

<div 
    class="LineChart" 
    style="
        width: {width}px;
        height: {height}px;
    ">
	<svg width={width} height={height}>
		<path d={d} />
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


<style>
	.LineChart {
		position: relative;
		padding-left: 40px;
		padding-bottom: 40px;
	}

	svg {
		fill: none;
		stroke: #33C7FF;
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
		margin-right: 4px;
		content: attr(data-value);
		color: black;
		display: inline-block;
	}
	.x-axis > div::after {
		margin-top: 4px;
		display: inline-block;
		content: attr(data-value);
		color: black;
	}
</style>
