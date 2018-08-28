const createStore = (reducer, preloadedState = {}) => {
    let listeners = [];

    state = reducer(preloadedState, {
        type: 'INIT',
    });

    return {
        subscribe(listener) {
            if (!listener) {
                return;
            }

            listeners.push(listener);

            const unsubscribe = () => {
                const index = listeners.findIndex(func => func === listener);

                if (index > -1) {
                    listeners.splice(index, 1);
                }
            };

            return unsubscribe;
        },
        dispatch({type, payload = {}}) {
            state = rootReducer(state, {
                type,
                payload,
            });
        
            listeners.forEach(listener => {
                listener();
            });
        
            return {
                type,
                payload,
            };
        },
        getState() {
            return state;
        },
    };
}

export default createStore;
