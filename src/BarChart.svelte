<script>
    import _ from "lodash"
    import {onMount} from "svelte"
	import * as d3 from "d3"

    export let data

    let tooltip, xaxis, yaxis

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

	// calc y axis
    let y = d3.scaleLinear()
                .domain([d3.max(d3.max(data.datasets, (d) => d.data)), 0]).nice()
                .range([margin.top, height-margin.bottom])
    let y_ticks = y.ticks()

    let x0 = d3.scaleBand()
                .domain(data.labels)
                .rangeRound([margin.left, width-margin.right], .1)
                .paddingInner(0.1)

    let x1 = d3.scaleBand()
                .domain(data.datasets.map(d => d.label))
                .rangeRound([0, x0.bandwidth()])
                .padding(0.05)

    let x_ticks = data.labels

    function mouseover(i) {
        return (e) => {
            let innerHTML = data.datasets.map(d => `<span>${d.label}: ${d.data[i].toFixed(3)}</span>`).join("\n")
            tooltip.innerHTML = `<div style='display: flex; flex-direction: column;'>${innerHTML}</div>`
            tooltip.style = `
                display: inline-block;
                left: ${e.x+x1.bandwidth()}px;
                top: ${e.y}px;`
        }        
    }

    function mouseout() {
        tooltip.style = "display: none;"
    }

    onMount(() => {
        d3.axisBottom(x0)(d3.select(`#xaxis-${css_id}`))
        d3.axisLeft(y)(d3.select(`#yaxis-${css_id}`))
    })
</script>        

<div class="container">
	<div 
		class="Chart" 
		style="
			width: {width}px;
			height: {height}px;
		">
		<svg width={width} height={height}>
			{#each data.labels as label, i}
                <g transform="translate({x0(label)},0)"
                    on:mouseover={mouseover(i)}
                    on:mouseout={mouseout}
                >
                    {#each data.datasets as ds, j}
                        <rect 
                            style="fill: {d3.schemeTableau10[j]}"
                            x={x1(ds.label)}
                            y={y(ds.data[i])}
                            width={x1.bandwidth()}
                            height={height - margin.bottom - y(ds.data[i])}
                        ></rect>
                    {/each}
                </g>
			{/each}
            <g id="xaxis-{css_id}" class="axis" transform="translate(0, {height - margin.bottom})"></g>
            <g id="yaxis-{css_id}" class="axis" transform="translate({margin.left}, 0)"></g>
		</svg>
	</div>
    <div bind:this={tooltip} class="tooltip"></div>
</div>

<style>
	.container {
		padding: 1em;
		display: inline-block;
		background-color: aliceblue;
	}

	.Chart {
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
	}

    .tooltip {
        display: none;
        position: absolute;
        text-align: center;
        padding: 8px;
        margin-top: -20px;
        font: 10px sans-serif;
        background: black;
        color: white;
        pointer-events: none;
    }

    .tooltip::after {
        content: " ";
        position: absolute;
        top: 50%;
        right: 100%; /* To the left of the tooltip */
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent black transparent transparent;
    }
</style>
