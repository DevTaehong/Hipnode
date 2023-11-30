interface CommentState {
  showChildren: boolean;
  isDeleting: boolean;
  isEditing: boolean;
  isReplying: boolean;
  isLiked: boolean;
}

type CommentAction =
  | { type: "TOGGLE_SHOW_CHILDREN" }
  | { type: "SET_IS_DELETING"; payload: boolean }
  | { type: "TOGGLE_IS_EDITING" }
  | { type: "TOGGLE_IS_REPLYING" }
  | { type: "TOGGLE_IS_LIKED" };

export const commentReducer = (
  state: CommentState,
  action: CommentAction
): CommentState => {
  switch (action.type) {
    case "TOGGLE_SHOW_CHILDREN":
      return { ...state, showChildren: !state.showChildren };
    case "SET_IS_DELETING":
      return { ...state, isDeleting: action.payload };
    case "TOGGLE_IS_EDITING":
      return { ...state, isEditing: !state.isEditing };
    case "TOGGLE_IS_REPLYING":
      return { ...state, isReplying: !state.isReplying };
    case "TOGGLE_IS_LIKED":
      return { ...state, isLiked: !state.isLiked };
    default:
      return state;
  }
};
