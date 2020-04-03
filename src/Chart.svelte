<script>
    import _ from "lodash"
    import * as d3 from "d3"
    import Axes from "./Axes.svelte"
    import representations from "./representations"
    import Tooltip from "./Tooltip.svelte"
    import * as scales from "./scales.js"
    

    export let kind, data
    export let title = undefined

    let tooltip_index, mouseover_event
    let xaxis, yaxis, svg, ticks
    let height
    let width

    let css_id = Math.random().toString(36).substr(2, 5)

	// setup chart
    let margin = {top: 60, right: 40, bottom: 60, left: 80}
    
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
        tooltip_index = i
        mouseover_event = e
      }
    }

    function mouseout() {
        mouseover_event = undefined
    }
</script>        

<div class="container" bind:offsetWidth={width} bind:offsetHeight={height}>
    {#if title }
      <p class="title">{title || ''}</p>
    {/if}
    <div
        class="Chart"
        style="
            width: {width}px;
            height: {height}px;
        ">
        {#if data === undefined || !params.width}
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
    <Tooltip {data} {tooltip_index} {mouseover_event}/>
</div>

<style>
	.container {
		display: inline-block;
		background-color: aliceblue;
        height: 100%;
        width: 100%;
	}

	.Chart {
		position: absolute;
    left: 0;
    top: 0;
	}

	svg {
		fill: none;
    stroke-linecap: butt;
		display: block;
    stroke-width: 3px;
    stroke-linejoin: round;
	}

  .title {
    margin: 0;
    font-size: 1.2em;
  }
</style>
