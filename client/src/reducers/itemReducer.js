// import { v4 as uuid } from "uuid";
import {
  GET_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  GET_ITEMS,
  ITEMS_LOADING,
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return { ...state, items: action.payload, loading: false };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}