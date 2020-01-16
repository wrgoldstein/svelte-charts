<script>
    export let kind, x, y, css_id, params

    import {onMount} from "svelte"
    import { formatLabel } from "./format.js"
    import * as d3 from "d3"

    onMount(() => {
        if (kind == 'Table') return
        if (['GroupedBar', 'StackedBar'].includes(kind)){
            let ticks = data.labels.filter((d,i) => d3.ticks(0, data.labels.length, 5).includes(i))
            d3.axisBottom(x[0]).tickValues(
                ticks
            ).tickFormat(formatLabel)(d3.select(`#xaxis-${css_id}`))
        } else {
            d3.axisBottom(x[0])(d3.select(`#xaxis-${css_id}`))
        }
        d3.axisLeft(y)(d3.select(`#yaxis-${css_id}`))
    })
</script>

    <g id="xaxis-{css_id}" class="axis" transform="translate(0, {params.height - params.margin.bottom})"></g>
    <g id="yaxis-{css_id}" class="axis" transform="translate({params.margin.left}, 0)"></g>
<style>
.axis {
    stroke-width: 1px;
}
</style>