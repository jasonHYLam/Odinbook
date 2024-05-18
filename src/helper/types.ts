// how the heck do i export
export interface CommentType {
  author: { id: string; username: string; profilePicURL: string };
  text: string;
  dateCommentedFormatted: Date;
  _id: string;
  id: string;
}

export interface UserType {
  _id: string;
  id: string;
  username: string;
  profilePicURL: string;
  following: {
    username: string;
    profilePicURL: string;
    _id: string;
    id: string;
  };
}
