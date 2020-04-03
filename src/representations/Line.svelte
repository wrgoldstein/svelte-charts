<script>
import _ from "lodash"
import * as d3 from "d3"

export let  data, 
            mouseover, 
            mouseout,
            svg,
            x,
            y,
            params

params // quiet a warning abuot unused exports

let line = d3.line().x((d,i) => x[0](data.labels[i])).y(d => y(d))

function thismouseover(e){
    let {x: x_} = svg.getBoundingClientRect()
    let x0 = x[0].invert(e.x - x_)
    let xt = data.labels.map((t,i) => t >= x0 ? i : undefined)
    let xi = !isNaN(d3.min(xt)) ? d3.min(xt) : x[0].ticks().length - 1
    let ev = {
        x: x[0](data.labels[xi]) + x_,
        y: e.y
    }
    mouseover(xi)(ev)
}
</script>   

{#each data.datasets as ds, i}
  <g style="stroke: {d3.schemeTableau10[i]};">
    <path on:mouseover={thismouseover} on:mouseout={mouseout} d={line(ds.data)} />
  </g>
{/each}
