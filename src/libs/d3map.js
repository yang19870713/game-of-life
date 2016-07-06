const BORDER_WIDTH = 0.4;
export default class D3Map {
    constructor(lifeSvg, spaceSvg, layout, geo){
        this.lifeSvg = lifeSvg;
        this.spaceSvg = spaceSvg;
        this.layout = layout;
        this.geo = geo;
        this.xScale = d3.scaleLinear()
                        .domain([0, layout.x])
                        .range([0, geo.w]);

        this.yScale = d3.scaleLinear()
                        .domain([0, layout.y])
                        .range([0, geo.h]);
        this.drawBg();
    }
    drawBg(){
        let map = [];
        let that = this;
        _.range(that.layout.x)
             .forEach(function(x){
             _.range(that.layout.y).forEach(function(y){
                 map.push([x,y])
             })
        });
        this.spaceSvg.selectAll('rect')
              .data(map)
              .enter()
              .append('rect')
              .attr('x', function(d){
              return that.xScale(d[0]);
              })
              .attr('y', function(d){
              return that.yScale(d[1]);
              })
              .attr('width', this.geo.w/this.layout.x)
              .attr('height', this.geo.h/this.layout.y)
              .attr('fill', 'black')
              .attr('stroke', 'white')
              .attr('stroke-width', BORDER_WIDTH)
    }
    drawPopulation(data){
        let that = this;
        let selection = this.lifeSvg.selectAll('rect')
            .data(data, function(d){
              return 'x'+d[0]+'y'+d[1];
            });

        selection.enter()
           .append('rect')
           .attr('x', (d) => {
               return that.xScale(d[0]);
            })
            .attr('y', (d) => {
                return that.yScale(d[1]);
            })
            .attr('width', that.geo.w/that.layout.x)
            .attr('height', that.geo.h/that.layout.y)
            .attr('fill', '#f44336')
            .attr('stroke', 'white')
            .attr('stroke-width', BORDER_WIDTH);

        selection.exit().remove();
    }
}
