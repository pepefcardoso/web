export interface CommentItem {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
}

export interface CreateCommentPayload {
  content: string;
}
