import D3Map from 'libs/d3map';
import style from './board.scss';
export default class Board extends React.Component {
    constructor(props){
        super(props);
        const unit = 12;
        this.lifeSvg = {};
        this.spaceSvg = {};
        this.layout = {
            x: this.props.x,
            y: this.props.y
        }
        this.geo ={
            w: this.props.x * unit,
            h: this.props.y * unit
        }
    }
    componentDidMount(){
        this.d3map = new D3Map( d3.select('#lifeSvg'),
                                d3.select('#spaceSvg'),
                                this.layout,
                                this.geo);
    }
    render(){
        if(this.d3map){
            this.d3map.drawPopulation(this.props.population);
        }
        let divSize = {
                height: this.geo.w,
                width: this.geo.h
            },
            viewBoxSize = `0 0 ${this.geo.w} ${this.geo.h}`,
            lifeSvgTop = 0 - this.geo.h;

        return (
            <div className={style.universe}
                 style={divSize}>
                <svg id="spaceSvg"
                     className={style.lifeSvg}
                     viewBox={viewBoxSize}></svg>
                <svg id="lifeSvg"
                     className={style.lifeSvg}
                     viewBox={viewBoxSize}
                     style={{top:lifeSvgTop}}></svg>
            </div>
        );
    }
}

Board.defaultProps = {
    x: 50,
    y: 50
}
