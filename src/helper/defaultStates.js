export const defaultPostState = {
  _id: "",
  id: "",
  title: "",
  description: "",
  imageURL: "",
  thumbnailImageURL: "",
  creator: { _id: "", id: "", profilePicURL: "", username: "" },
  likedBy: [],
  bookmarkedBy: [],
  datePosted: new Date(),
  datePostedFormatted: new Date(),
};
