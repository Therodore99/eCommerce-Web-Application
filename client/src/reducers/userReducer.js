//Reducers act like event listeners, 
//and when they hear an action they are interested in, 
//they update the state in response

export function userReducer(state= null, action) {
    switch(action.type) {
        case "LOGGED_IN_USER":
            return action.payload;
        case "LOGOUT":
            return action.payload;
        default:
            return state;
    }
};