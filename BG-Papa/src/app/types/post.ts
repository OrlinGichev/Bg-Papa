import { Comment } from "./Comment";


export interface Post {
    title: string,
    category: string,
    text: string,
    authorId: string,
    authorName: string,
    created_at: Date,
    comments: Comment[],
    _id: string
}