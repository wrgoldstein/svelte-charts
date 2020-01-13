<script>
    export let kind, x, y, css_id, params

    import {onMount} from "svelte"
    import * as d3 from "d3"

    let key = 0

    onMount(() => {
        if (kind == 'Table') return
        key++
        d3.axisBottom(x[0])(d3.select(`#xaxis-${css_id}`))
        d3.axisLeft(y)(d3.select(`#yaxis-${css_id}`))
    })
</script>

{#each [key] as k}
    <g id="xaxis-{css_id}" class="axis" transform="translate(0, {params.height - params.margin.bottom})"></g>
    <g id="yaxis-{css_id}" class="axis" transform="translate({params.margin.left}, 0)"></g>
{/each}
<style>
.axis {
    stroke-width: 1px;
}
</style>