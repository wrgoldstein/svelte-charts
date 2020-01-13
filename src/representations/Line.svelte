<script>
import _ from "lodash"
import * as d3 from "d3"

export let data, 
            mouseover, 
            mouseout,
            params,
            x,
            y

let line = d3.line().x((d,i) => x[0](data.labels[i])).y(d => y(d))
</script>   

{#each data.datasets as ds, i}
    <g style="stroke: {d3.schemeTableau10[i]};">
        <path d={line(ds.data)} />
    </g>
    {#each data.labels as label, j}
        <circle 
            style="fill: {d3.schemeTableau10[i]};" 
            r={4} 
            on:mouseover={mouseover(j)}
            on:mouseout={mouseout}
            cx={x[0](label)} 
            cy={y(ds.data[j])}
        >
        </circle>
    {/each}
{/each}
