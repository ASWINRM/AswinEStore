import { WISHLIST_ADD_REQUEST,WISHLIST_ADD_SUCCESS,
        WISHLIST_ADD_FAIL,WISHLIST_REMOVE_FAIL,WISHLIST_REMOVE_SUCCESS,
    WISHLIST_REMOVE_REQUEST } from "../constants/constants";

const initialstate={
    wishlistitems:[]
}

export const wishlistreducer=(state=initialstate,action)=>{

    switch(action.type){
        case WISHLIST_ADD_REQUEST:
            return({loading:true})
        case WISHLIST_ADD_SUCCESS:
            initialstate.wishlistitems=[...initialstate.wishlistitems,action.payload]
            return ({loading:false,wishlistitems:initialstate.wishlistitems})
        case WISHLIST_ADD_FAIL:
            return ({loading:false,error:action.payload})
        case WISHLIST_REMOVE_REQUEST:
            return({loading:true})
        case WISHLIST_REMOVE_SUCCESS:
            initialstate.wishlistitems=initialstate.wishlistitems.filter((e)=>e.name!==action.payload.name)
            return ({loading:false,wishlistitems:initialstate.wishlistitems})
        case WISHLIST_REMOVE_FAIL:
            return ({loading:false,error:action.payload})
        default:
            return state;

    }
}
