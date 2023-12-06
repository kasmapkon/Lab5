// authReducer.js
const authReducer = (state = { authToken: null }, action) => {
    switch (action.type) {
      case 'SET_AUTH_TOKEN':
        return { ...state, authToken: action.payload };
      default:
        return state;
    }
  };
  
  export default authReducer;
  