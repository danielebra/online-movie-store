// Action Types
import { GET_FEEDBACK, CLEAR_FEEDBACK } from "../actions/types";

const feedback = "";

export default function(state = feedback, action) {
  switch (action.type) {
    case GET_FEEDBACK:
      return action.payload;

    case CLEAR_FEEDBACK:
      return "";

    default:
      return state;
  }
}
