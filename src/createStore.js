const createStore = (state = {}, reducer) => {
    return {
        state,
        listener: null,
        subscribe(listener) {
            this.listener = listener;

            const unsubscribe = () => {
                this.listener = null;
            };

            return unsubscribe;
        },
        dispatch({type, payload = {}}) {
            const newState = reducer(this.state, {
                type,
                payload,
            });

            this.state = {
                ...this.state,
                ...newState,
            };

            if (this.listener) {
                this.listener();
            }
        },
        getState() {
            return this.state;
        },
    };
}

export default createStore;
