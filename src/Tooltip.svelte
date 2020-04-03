<script>
  import * as d3 from "d3"
  import {formatLabel} from "./format.js"
  export let data = { datasets: []}
  export let tooltip_index, mouseover_event
</script>

{#if mouseover_event}
  <div class="tooltip" style="display: block; position: fixed; left: {mouseover_event.x}px; top: {mouseover_event.y}px;">
  <div>{formatLabel(data.labels[tooltip_index])}</div>
    {#each data.datasets as dataset, m}
      <div style='display: flex; flex-direction: column;'>
        {#if dataset.data[tooltip_index]}
            <span style='display: flex;'>
              <div style="background-color: {d3.schemeTableau10[m]}; 
                width: 10px; 
                height: auto;
                margin: 1px; 
                margin-right: 4px;">
              </div>
              {dataset.label}: {dataset.data[tooltip_index].toFixed(3)}
            </span>
        {/if}
      </div>
    {/each}
  </div>
{/if}
<style>
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