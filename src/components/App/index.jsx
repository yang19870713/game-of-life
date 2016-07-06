import Board from 'containers/Board';
import style from './app.scss';
import 'bootstrap/js/dropdown';

export default class App extends React.Component {
    render(){
        const {
            presets,
            currentPreset,
            onSelectHandler,
            onNextClickHandler,
            onResetClickHandler,
            population
        } = this.props;
        return (
            <div className="container">
                <h1 className={style.title}>
                    Game of Life
                </h1>
                <Board />
                <div className={style.btnGrp}>
                    <div className={`dropdown ${style.dropdown}`}>
                        <button type="button"
                                className={`btn btn-default dropdown-toggle`}
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                {`${currentPreset||"Seed"} `}
                                <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            {
                                _.map(presets, (data, name) => {
                                    return (
                                        <li key={name}
                                            onClick={() => onSelectHandler(name, data)}>
                                            <a href="#">{name}</a>
                                        </li>);
                                })
                            }
                        </ul>
                    </div>
                    <button type="button"
                            className={`btn btn-primary ${style.btn}`}
                            onClick={() => onNextClickHandler(population)}>
                            Next
                    </button>
                    <button type="button"
                            className={`btn btn-warning ${style.btn}`}
                            onClick={() => onResetClickHandler()}>
                            Reset
                    </button>
                </div>
            </div>
        );
    }
}
