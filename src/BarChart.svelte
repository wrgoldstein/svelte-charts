<script>
	import _ from "lodash"
	import * as d3 from "d3"

    export let data
    let tooltip

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
    let x = d3.scaleBand()
                .domain(data.rows.map(r => r[0]))
                .rangeRound([0, width], .1)
                .paddingInner(0.1);
    let x_ticks = data.rows.map(r => r[0])

	// calc y axis
	let y = d3.scaleLinear().domain([d3.max(data.rows, r => r[1]), 0]).range([0, height])
    let y_ticks = y.ticks()
    let bandwidth = x.bandwidth()

    let x_getter = d => x(d[data.columns.indexOf(data.x_column)])

    function mouseover(d) {
        return (e) => {
            console.log(d)
            tooltip.innerHTML = `
                x: ${d[0]}
                y: ${d[1].toFixed(3)}
            `;
            tooltip.style = `
                display: inline;
                left: ${e.x+bandwidth}px;
                top: ${e.y}px;`
        }        
    }

    function mouseout() {
        tooltip.style = "display: none;"
    }

</script>        

<div class="container">
	<div 
		class="LineChart" 
		style="
			width: {width}px;
			height: {height}px;
		">
		<svg width={width} height={height}>
			{#each data.rows as d}
                <rect 
                    on:mouseover={mouseover(d)}
                    on:mouseout={mouseout}
                    x={x_getter(d)} 
                    y={y(d[1])}
                    width={bandwidth}
                    height={height - y(d[1])}
                ></rect>
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
    <div bind:this={tooltip} class="tooltip"></div>
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
        stroke-linecap: butt;
		display: block;
		stroke-width: 2px;
		border-left: 1px solid black;
		border-bottom: 1px solid black;
	}

    rect {
        fill: blueviolet;
    }

    rect:hover:after {
        fill: red;
        
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

    .tooltip {
        display: none;
        position: absolute;
        text-align: center;
        width: 10em;
        height: 12px;
        padding: 8px;
        margin-top: -20px;
        font: 10px sans-serif;
        background: #ddd;
        pointer-events: none;
    }
</style>
