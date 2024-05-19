// how the heck do i export
export interface CommentType {
  author: { id: string; username: string; profilePicURL: string };
  text: string;
  dateCommentedFormatted: Date;
  _id: string;
  id: string;
  isDeleted: boolean;
}

export interface UserType {
  _id: string;
  id: string;
  username: string;
  profilePicURL: string;
  following: string[];
  followers: string[];
}

export interface PostType {
  _id: string;
  id: string;
  title: string;
  description: string;
  imageURL: string;
  thumbnailImageURL: string;
  datePosted: Date;
  datePostedFormatted: Date;
  likedBy: { _id: string }[];
  bookmarkedBy: { _id: string }[];
  creator: {
    _id: string;
    id: string;
    username: string;
    profilePicURL: string;
  };
}

export interface AllTags {
  allTags: string[];
}

export interface SelectedTag {
  label: string;
  value: string;
}

export interface SelectedTags {
  selectedTags: { label: string; value: string };
}
