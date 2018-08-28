const combineReducers = (reducers) => {
    const newState = {};
    const shouldUpdateState = false;

    return (state, action) => {
        for (let key of (Object.keys(reducers))) {
            const reducer = reducers[key];
            newKeyState = reducer(state[key], action);
            shouldUpdateState = newKeyState !== state[key];
        }

        return shouldUpdateState ? newState : state;
    }
};

export default combineReducers;
