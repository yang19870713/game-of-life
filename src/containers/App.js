import {connect} from 'react-redux';
import App from 'components/App';
import {selectPreset, updatePopulation} from 'actions';
import Game from 'libs/game';

const mapStateToProps = state => {
    return {
        currentPreset:  state.preset.current,
        population: state.population,
        presets: state.preset.all
    }
}

const mapDispatchToProps = (dispath) => {
    return {
        onSelectHandler: (name, data) => {
            dispath(selectPreset(name));
            dispath(updatePopulation(data));
        },
        onNextClickHandler: data => {
            dispath(updatePopulation(Game.getNext(data)));
        },
        onResetClickHandler: () => {
            dispath(selectPreset(""));
            dispath(updatePopulation([]));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
