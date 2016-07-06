import {connect} from 'react-redux';
import Board from 'components/Board';

const mapStateToProps = state => {
    return {
        population: state.population
    }
}

export default connect(
    mapStateToProps
)(Board);
