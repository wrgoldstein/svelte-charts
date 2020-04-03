<script>
    import _ from "lodash"
    import * as d3 from "d3"
    import Axes from "./Axes.svelte"
    import representations from "./representations"
    import * as scales from "./scales.js"
    import {formatLabel} from "./format.js"

    export let kind, data, title

    let tooltip, xaxis, yaxis, svg, ticks
    let height
    let width

    let css_id = Math.random().toString(36).substr(2, 5)

	// setup chart
    let margin = {top: 20, right: 40, bottom: 60, left: 40}
    
    let params = { width, height, margin }
    let key = 0

    // calc y axis
    let sc, y, y_ticks, x, x_ticks

    $:{
        if (data){
            params = { width, height, margin }
            sc = new scales[kind](data, params)
            y = sc.y()
            x = sc.x()
            ticks = data.labels.filter((d,i) => d3.ticks(0, data.labels.length, 5).includes(i))
            key++
        }
    }

    function mouseover(i) {
        return (e) => {
            let innerHTML = data.datasets.map((d,m) => 
                d.data[i] 
                    ? 
                        `<span style='display: flex;'>
                            <div style='
                                background-color: ${d3.schemeTableau10[m]}; 
                                width: 10px; 
                                height: auto;
                                margin: 1px; 
                                margin-right: 4px;'></div>
                            ${d.label}: ${d.data[i].toFixed(3)}
                        </span>`
                    : ""
            ).join("\n")
            tooltip.innerHTML = `<div style='display: flex; flex-direction: column;'>
                <div>${formatLabel(data.labels[i])}</div>
                ${innerHTML}
            </div>`
            tooltip.style = `
                display: inline-block;
                left: ${e.x - margin.left + 20}px;
                top: ${e.y - height}px;`
        }        
    }

    function mouseout() {
        tooltip.style = "display: none;"
    }
</script>        

<div class="container" bind:offsetWidth={width} bind:offsetHeight={height}>
  <h3>{title || ''}</h3>
    <div
        class="Chart"
        style="
            width: {width}px;
            height: {height}px;
        ">
        {#if data === undefined}
            <span></span>
        {:else if kind == 'Table'}
            <svelte:component this={representations[kind]} {data} {params}/>
        {:else}
            <svg bind:this={svg} width={width} height={height}>
                {#each [key] as k (k)}
                    <svelte:component this={representations[kind]} {svg} {data} {params} {mouseover} {mouseout} {x} {y}/>
                    <Axes {kind} {x} {y} {css_id} {params} {ticks}/>
                {/each}
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
        height: 100%;
        width: 100%;
	}

	.Chart {
		position: relative;
		/* padding-left: 40px;
		padding-bottom: 40px;
		margin-right: 40px;
		margin-top: 40px; */
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

  .xlabel {
    margin-top: -20px;
  }
</style>
