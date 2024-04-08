import { Comment } from "./Comment";


export interface Post {
    title: string,
    category: string,
    text: string,
    authorId: string,
    authorName: string,
    created_at: Date,
    comments: Comment[],
    subscribers: string[],
    _id: string
}