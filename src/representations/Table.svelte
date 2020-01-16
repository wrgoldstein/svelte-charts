<script>
    export let data, params
    import { formatLabel } from "../format.js"
    import JSONFormatter from 'json-formatter-js'

    function render(value){
        if (value == undefined){
            return ''
        } else if (typeof value.getMonth === 'function' || value._isAMomentObject){
            return formatLabel(value)
        }
        else if (typeof(value) == 'object'){
            const formatter = new JSONFormatter(value, 0)
            return formatter.render()
        }
        return formatLabel(value)
    }

</script>
<style>
    .table-wrapper {
        overflow-x: scroll;
        overflow-y: scroll;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }


    td, th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    tr:nth-child(even){background-color: #f2f2f2;}

    tr:hover {background-color: #ddd;}

    th {
        padding: 5px;
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
    }
</style>

<!-- Begin component -->
<div class="table-wrapper" style="width: {params.width}px; height: {params.height}px">
    <table>
        <tr>
            <th></th>
            {#each data.datasets as d}
                <th>{d.label}</th>
            {/each}
        </tr>
        
        {#each data.labels as label, i}
            <tr>
                <td>{render(label)}</td>
                {#each data.datasets as ds}
                    <td>{render(ds.data[i])}</td>
                {/each}
            </tr>
        {/each}
    </table>
</div>