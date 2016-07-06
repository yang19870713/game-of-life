// for async
import thunk from "redux-thunk";
// logger middleware
import {logger} from "../middlewares";

const middlewares = [thunk, logger];
export default middlewares;
