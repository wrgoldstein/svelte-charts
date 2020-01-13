<script>
    import _ from "lodash"
    import * as d3 from "d3"
    import Axes from "./Axes.svelte"
    import representations from "./representations"
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
        x = sc.x()
    }

    function mouseover(i) {
        return (e) => {
            let innerHTML = data.datasets.map((d,m) => 
                `<span style='display: flex;'>
                    <div style='
                        background-color: ${d3.schemeTableau10[m]}; 
                        width: 10px; 
                        height: auto;
                        margin: 1px; 
                        margin-right: 4px;'></div>
                    ${d.label}: ${d.data[i].toFixed(3)}
                </span>`
            ).join("\n")
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
</script>        

<div class="container">
	<div 
		class="Chart" 
		style="
			width: {width}px;
			height: {height}px;
		">
        {#if kind == 'Table'}
            <svelte:component this={representations[kind]} {data} {params}/>
        {:else}
            <svg width={width} height={height}>
                <svelte:component this={representations[kind]} {data} {params} {mouseover} {mouseout} {x} {y}/>
                <Axes {kind} {x} {y} {css_id} {params}/>
            </svg>
        {/if}
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
