<script>
    export let data, params
    
    import JSONFormatter from 'json-formatter-js'

    function render(value){
        if (value == undefined){
            return ''
        }
        else if (typeof(value) == 'object'){
            const formatter = new JSONFormatter(value, 0)
            cell.appendChild(formatter.render())
            return ''
        } else if (!isNaN(value)) {
            if (Number.isInteger(value)) {
                return value
            }
            return value.toFixed(3)
        }
        return value
    }

    // data.datasets
    // 
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
                <td>{label}</td>
                {#each data.datasets as ds}
                    <td>{render(ds.data[i])}</td>
                {/each}
            </tr>
        {/each}
    </table>
</div>