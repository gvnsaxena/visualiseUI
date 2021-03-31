
const rootReducer = (state = {}, action) => {
    switch(action.type){
        case 'SET_API_DATA':
            return {...state, apiData: action.payload};
        default:
            return state;
    }

}
export default rootReducer;