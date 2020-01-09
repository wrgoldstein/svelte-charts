<script>
    import {onMount} from "svelte"
    export let data
    let canvas

	function getTicks (count, max) {
		return [...Array(count).keys()].map(d => {
			return max / (count - 1) * parseInt(d);
		});
	}

	// setup chart
	let width = 500
	let height = 300

	// calc x axis
	let max_x = 4
	let x = val => val/max_x * width
	let x_ticks = getTicks(11, max_x)
	
	// calc y axis
	let max_y = 10
	let y = val => val/max_y * height
	let y_ticks = getTicks(11, max_y)
	
	// calc chart line(s)
	let [start, ...rest] = data.rows	
	let d = `
          M${x(start[0])} ${y(start[1])} 
          ${data.rows.map(d => {
              return `L${x(d[0])} ${y(d[1])}`;
          }).join(' ')}
        `;

    onMount(() => {
        let ctx = canvas.getContext('2d')
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(x(start[0]), y(start[1]));
        rest.forEach(row => {
            ctx.lineTo(x(row[0]), y(row[1]))
        })
        ctx.stroke();

        ctx.moveTo(x(0), y(0))
        ctx.lineTo(x(0), y(max_y))
        ctx.stroke()

        ctx.moveTo(x(0), y(0))
        ctx.lineTo(x(max_x), y(max_y) - y(0))
        ctx.stroke()

        
    })
</script>

<canvas bind:this={canvas}>
</canvas>
<div 
    class="LineChart" 
    style={{
        width: width + 'px',
        height: height + 'px'
    }}>
	<svg width={width} height={height}>
		<path d={d} />
	</svg>
	<div class="x-axis">
		{#each x_ticks as tick}
			<div data-value={tick}/>
		{/each}
	</div>
	<div class="y-axis">
		{#each y_ticks as tick}
			<div data-value={tick}/>
		{/each}
	</div>
</div>


<style>
	.LineChart {
		position: relative;
		padding-left: 40px;
		padding-bottom: 40px;
	}

	svg {
		fill: none;
		stroke: #33C7FF;
		display: block;
		stroke-width: 5px;
		border-left: 1px solid black;
		border-bottom: 1px solid black;
	}
</style>
