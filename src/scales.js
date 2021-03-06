import * as d3 from "d3"
import _ from "lodash"
import moment from "moment"


export class GroupedBar {
    constructor(data, params){
        this.data = data
        this.width = params.width
        this.height = params.height
        this.margin = params.margin
    }

    y(){
        const max = d3.max(this.data.datasets, (ds) => d3.max(ds.data) )
        return d3.scaleLinear()
            .domain([max, 0]).nice()
            .range([this.margin.top, this.height-this.margin.bottom])
    }

    x(){
        let x0 = d3.scaleBand()
                    .domain(this.data.labels)
                    .rangeRound([this.margin.left, this.width-this.margin.right], .1)
                    .paddingInner(0.1)

        let x1 = d3.scaleBand()
                    .domain(this.data.datasets.map(d => d.label))
                    .rangeRound([0, x0.bandwidth()])
                    .padding(0.05)
        
        return { 0: x0, x0, x1 }
    }
}

export class Line {
    constructor(data, params){
        this.data = data
        this.width = params.width
        this.height = params.height
        this.margin = params.margin
    }

    y(){
        let [lower, upper] = d3.extent(_.flatMap(this.data.datasets, (ds) => ds.data))
        lower = lower - Math.abs(.15*lower)
        upper = upper + Math.abs(.15*upper)
        return d3.scaleLinear()
                 .domain([lower, upper]).nice()
                 .range([this.height - this.margin.bottom, this.margin.top])
    }
    

    x(){
        let isValidDate = this.data.labels.every(d => 
            typeof d.getMonth === 'function' || d._isAMomentObject
        )
        let scale = (isValidDate) ? d3.scaleTime : d3.scaleLinear
        let x =scale()
                  .domain(d3.extent(this.data.labels))
                  .range([this.margin.left, this.width - this.margin.right])
        return { 0: x } // allow for multiple scales for e.g. grouped bar charts
    }
}

export class StackedBar {
    constructor(data, params){
        this.data = data
        this.width = params.width
        this.height = params.height
        this.margin = params.margin
    }

    y(){
        let upper = d3.max(this.data.labels.map((l, i) => _.sum(this.data.datasets.map(ds => ds.data[i]))))
        return d3.scaleLinear()
                .domain([upper, 0]).nice()
                .range([this.margin.top, this.height - this.margin.bottom])
    }

    x(){
        let x = d3.scaleBand()
            .domain(this.data.labels)
            .rangeRound([this.margin.left, this.width - this.margin.right], .1)
            .paddingInner(0.1)
        return { 0: x } // allow for multiple scales for e.g. grouped bar charts
    }
}

export let Bar = GroupedBar
export let Scatter = Line
export let Table = Line
