const combineReducers = (reducers) => {
    const newState = {};
    let shouldUpdateState = false;

    return (state, action) => {
        for (const key of (Object.keys(reducers))) {
            const reducer = reducers[key];
            newState[key] = reducer(state[key], action);
            shouldUpdateState = newState[key] !== state[key];
        }

        return shouldUpdateState ? newState : state;
    }
};

export default combineReducers;
