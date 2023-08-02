export type Post = {
    post_id: string;
    post_text: string;
    created_at: string;
    user: { name?: string | null; user_name: string; picture?: string | null };
    comments: Array<{
        comment_id: string;
        user: { user_name: string };
    }>;
    likes: Array<{
        like_id: string;
        user: { user_name: string };
    }>;
};
