import * as actionTypes from '../actions/actiontypes';

const inititalState={
    token:null,
    userid:null,
    loading:false
}

const reducer=(state=inititalState,action)=>{
    switch(action.type)
    {
        case actionTypes.authstart:
            return {
                ...state,
                loading:true
            }
        case actionTypes.authsuccess:
            return {
                ...state,
                token:action.token,
                userid:action.userid,
                loading:false
            }
        case actionTypes.authfail:
            return {
                ...state,
                loading:false
            }
        case actionTypes.logout:
            return{
                ...state,
                loading:false,
                token:null,
                userid:null
            }
        default:return state;
    }
}

export default reducer;