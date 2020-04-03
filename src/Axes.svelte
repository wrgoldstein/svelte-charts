<script>
    export let kind, x, y, css_id, params, ticks

    import { afterUpdate } from "svelte"
    import { formatLabel } from "./format.js"
    import * as d3 from "d3"

    afterUpdate(() => {
        if (kind == 'Table') return
        if (['GroupedBar', 'StackedBar'].includes(kind)){
            d3.axisBottom(x[0]).tickValues(
                ticks
            ).tickFormat(formatLabel)(d3.select(`#xaxis-${css_id}`))
        } else {
            d3.axisBottom(x[0])(d3.select(`#xaxis-${css_id}`))
        }
        d3.axisLeft(y)(d3.select(`#yaxis-${css_id}`))
    })
</script>
{#if params.width }
  <g id="xaxis-{css_id}" class="axis" transform="translate(0, {params.height - params.margin.bottom})"></g>
  <g id="yaxis-{css_id}" class="axis" transform="translate({params.margin.left}, 0)"></g>
{/if}
<style>
.axis {
    stroke-width: 1px;
}
</style>