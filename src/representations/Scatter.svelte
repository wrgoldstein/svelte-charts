<script>
import _ from "lodash"
import * as d3 from "d3"

export let data, 
            mouseover, 
            mouseout,
            params,
            x,
            y,
            svg
</script>   

{#each data.datasets as ds, i}
    {#each data.labels as label, j}
        {#if ds.data[j]}
            <circle 
                style="fill: {d3.schemeTableau10[i]};" 
                r={4} 
                on:mouseover={mouseover(j)}
                on:mouseout={mouseout}
                cx={x[0](label)} 
                cy={y(ds.data[j])}
            >
            </circle>
        {/if}
    {/each}
{/each}
