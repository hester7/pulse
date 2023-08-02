export type Comment = {
    comment_id: string;
    comment_text: string;
    created_at: string;
    user: { name?: string | null; user_name: string; picture?: string | null };
};
