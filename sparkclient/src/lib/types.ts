// Post type
export interface Post {
    postId: number;
    createdAt: Date;
    content: string;
    authorId: string;
    username: string;
    profilePicture: string;
}
