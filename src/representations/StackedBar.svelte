<script>
import _ from "lodash"
import * as d3 from "d3"

export let data, 
            mouseover, 
            mouseout,
            params,
            x,
            y

function offSet(i,j){
    return _.sum(data.datasets.map((ds,k) => k < j ? ds.data[i] : 0))
}
</script>   

{#each data.labels as label, i}
    <g transform="translate({x[0](label)},0)"
        on:mouseover={mouseover(i)}
        on:mouseout={mouseout}
    >
        {#each data.datasets as ds, j}
            {#if ds.data[i]}
                <rect 
                    style="fill: {d3.schemeTableau10[j]}"
                    x={x[0](ds.label)}
                    y={y(ds.data[i] + offSet(i,j))}
                    width={x[0].bandwidth()}
                    height={params.height - params.margin.bottom - y(ds.data[i])}
                ></rect>
            {/if}
        {/each}
    </g>
{/each}