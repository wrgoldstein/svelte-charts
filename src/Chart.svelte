<script>
    import _ from "lodash"
    import {onMount} from "svelte"
    import * as d3 from "d3"
    import geoms from "./geom"
    import * as scales from "./scales.js"

    export let kind, data

    let tooltip, xaxis, yaxis

    let css_id = Math.random().toString(36).substr(2, 5)

	// setup chart
	let width = 500
	let height = 300
    let margin = {top: 10, right: 10, bottom: 20, left: 40}
    
    let params = { width, height, margin }

	window._ = _
    window.d3 = d3

    // calc y axis
    let sc, y, y_ticks, x, x_ticks

    $:{
        sc = new scales[kind](data, params)
        y = sc.y()
        y_ticks = y.ticks()

        x = sc.x()
        x_ticks = data.labels
    }

    function mouseover(i) {
        return (e) => {
            let innerHTML = data.datasets.map(d => `<span>${d.label}: ${d.data[i].toFixed(3)}</span>`).join("\n")
            tooltip.innerHTML = `<div style='display: flex; flex-direction: column;'>${innerHTML}</div>`
            tooltip.style = `
                display: inline-block;
                left: ${e.x+10}px;
                top: ${e.y}px;`
        }        
    }

    function mouseout() {
        tooltip.style = "display: none;"
    }

    onMount(() => {
        d3.axisBottom(x[0])(d3.select(`#xaxis-${css_id}`))
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
            <svelte:component this={geoms[kind]} {data} {params} {mouseover} {mouseout} {x} {y}/>
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
        stroke-width: 3px;
        stroke-linejoin: round;
	}

    .axis {
        stroke-width: 1px;
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
