import AppContainer from 'containers/App';
import {Provider} from 'react-redux';
import store from 'store';
import preset from 'configs/preset-population';
import {loadPresets} from 'actions';

const init = () => {
    store.dispatch(loadPresets(preset));
}
init();

ReactDOM.render(
    <Provider {...{store}}>
        <AppContainer />
    </Provider>,
    document.getElementById("my-app")
)
