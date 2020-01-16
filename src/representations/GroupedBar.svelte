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

$: x0 = x.x0
$: x1 = x.x1
</script>        

{#each data.labels as label, i}
    <g transform="translate({x0(label)},0)"
        on:mouseover={mouseover(i)}
        on:mouseout={mouseout}
    >
        {#each data.datasets as ds, j}
            {#if ds.data[i]}
                <rect 
                    style="fill: {d3.schemeTableau10[j]}"
                    x={x1(ds.label)}
                    y={y(ds.data[i])}
                    width={x1.bandwidth()}
                    height={params.height - params.margin.bottom - y(ds.data[i])}
                ></rect>
            {/if}
        {/each}
    </g>
{/each}
