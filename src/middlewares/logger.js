export default store => next => action => {
	console.group(action.type);
	console.info("dispatching: ", action);
	let result = next(action);
	console.log("new state: ", store.getState());
	console.groupEnd(action.type);
	return result;
}
