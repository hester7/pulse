import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Instant: { input: any; output: any; }
  UUID: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

export type GeneratePostTextRequest = {
  category: Scalars['String']['input'];
};

export type GenerateUsersRequest = {
  count: Scalars['Int']['input'];
};

export type GeneratedPostText = {
  __typename?: 'GeneratedPostText';
  postText: Scalars['String']['output'];
};

export type GeneratedUsers = {
  __typename?: 'GeneratedUsers';
  users: Array<User>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type LoginRequestInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['Instant']['output'];
  postId: Scalars['UUID']['output'];
  postText: Scalars['String']['output'];
  updatedAt: Scalars['Instant']['output'];
  userId: Scalars['String']['output'];
};

export type PostWithComments = {
  __typename?: 'PostWithComments';
  comments: Array<Scalars['String']['output']>;
  createdAt: Scalars['Instant']['output'];
  postId: Scalars['UUID']['output'];
  postText: Scalars['String']['output'];
  updatedAt: Scalars['Instant']['output'];
  userId: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['timestamptz']['output'];
  email: Scalars['String']['output'];
  updatedAt: Scalars['timestamptz']['output'];
  userId: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

/** columns and relationships of "comments" */
export type Comments = {
  __typename?: 'comments';
  comment_id: Scalars['uuid']['output'];
  comment_text: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  post: Posts;
  post_id: Scalars['uuid']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['String']['output'];
};

/** aggregated selection of "comments" */
export type Comments_Aggregate = {
  __typename?: 'comments_aggregate';
  aggregate?: Maybe<Comments_Aggregate_Fields>;
  nodes: Array<Comments>;
};

export type Comments_Aggregate_Bool_Exp = {
  count?: InputMaybe<Comments_Aggregate_Bool_Exp_Count>;
};

export type Comments_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Comments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Comments_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "comments" */
export type Comments_Aggregate_Fields = {
  __typename?: 'comments_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Comments_Max_Fields>;
  min?: Maybe<Comments_Min_Fields>;
};


/** aggregate fields of "comments" */
export type Comments_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Comments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "comments" */
export type Comments_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Comments_Max_Order_By>;
  min?: InputMaybe<Comments_Min_Order_By>;
};

/** input type for inserting array relation for remote table "comments" */
export type Comments_Arr_Rel_Insert_Input = {
  data: Array<Comments_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Comments_On_Conflict>;
};

/** Boolean expression to filter rows from the table "comments". All fields are combined with a logical 'AND'. */
export type Comments_Bool_Exp = {
  _and?: InputMaybe<Array<Comments_Bool_Exp>>;
  _not?: InputMaybe<Comments_Bool_Exp>;
  _or?: InputMaybe<Array<Comments_Bool_Exp>>;
  comment_id?: InputMaybe<Uuid_Comparison_Exp>;
  comment_text?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  post?: InputMaybe<Posts_Bool_Exp>;
  post_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "comments" */
export enum Comments_Constraint {
  /** unique or primary key constraint on columns "comment_id" */
  CommentsPkey = 'comments_pkey'
}

/** input type for inserting data into table "comments" */
export type Comments_Insert_Input = {
  comment_id?: InputMaybe<Scalars['uuid']['input']>;
  comment_text?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  post?: InputMaybe<Posts_Obj_Rel_Insert_Input>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Comments_Max_Fields = {
  __typename?: 'comments_max_fields';
  comment_id?: Maybe<Scalars['uuid']['output']>;
  comment_text?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  post_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "comments" */
export type Comments_Max_Order_By = {
  comment_id?: InputMaybe<Order_By>;
  comment_text?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Comments_Min_Fields = {
  __typename?: 'comments_min_fields';
  comment_id?: Maybe<Scalars['uuid']['output']>;
  comment_text?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  post_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "comments" */
export type Comments_Min_Order_By = {
  comment_id?: InputMaybe<Order_By>;
  comment_text?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "comments" */
export type Comments_Mutation_Response = {
  __typename?: 'comments_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Comments>;
};

/** on_conflict condition type for table "comments" */
export type Comments_On_Conflict = {
  constraint: Comments_Constraint;
  update_columns?: Array<Comments_Update_Column>;
  where?: InputMaybe<Comments_Bool_Exp>;
};

/** Ordering options when selecting data from "comments". */
export type Comments_Order_By = {
  comment_id?: InputMaybe<Order_By>;
  comment_text?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  post?: InputMaybe<Posts_Order_By>;
  post_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: comments */
export type Comments_Pk_Columns_Input = {
  comment_id: Scalars['uuid']['input'];
};

/** select columns of table "comments" */
export enum Comments_Select_Column {
  /** column name */
  CommentId = 'comment_id',
  /** column name */
  CommentText = 'comment_text',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  PostId = 'post_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "comments" */
export type Comments_Set_Input = {
  comment_id?: InputMaybe<Scalars['uuid']['input']>;
  comment_text?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "comments" */
export type Comments_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Comments_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Comments_Stream_Cursor_Value_Input = {
  comment_id?: InputMaybe<Scalars['uuid']['input']>;
  comment_text?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "comments" */
export enum Comments_Update_Column {
  /** column name */
  CommentId = 'comment_id',
  /** column name */
  CommentText = 'comment_text',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  PostId = 'post_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Comments_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Comments_Set_Input>;
  /** filter the rows which have to be updated */
  where: Comments_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "likes" */
export type Likes = {
  __typename?: 'likes';
  created_at: Scalars['timestamptz']['output'];
  like_id: Scalars['uuid']['output'];
  /** An object relationship */
  post: Posts;
  post_id: Scalars['uuid']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['String']['output'];
};

/** aggregated selection of "likes" */
export type Likes_Aggregate = {
  __typename?: 'likes_aggregate';
  aggregate?: Maybe<Likes_Aggregate_Fields>;
  nodes: Array<Likes>;
};

export type Likes_Aggregate_Bool_Exp = {
  count?: InputMaybe<Likes_Aggregate_Bool_Exp_Count>;
};

export type Likes_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Likes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Likes_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "likes" */
export type Likes_Aggregate_Fields = {
  __typename?: 'likes_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Likes_Max_Fields>;
  min?: Maybe<Likes_Min_Fields>;
};


/** aggregate fields of "likes" */
export type Likes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Likes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "likes" */
export type Likes_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Likes_Max_Order_By>;
  min?: InputMaybe<Likes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "likes" */
export type Likes_Arr_Rel_Insert_Input = {
  data: Array<Likes_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Likes_On_Conflict>;
};

/** Boolean expression to filter rows from the table "likes". All fields are combined with a logical 'AND'. */
export type Likes_Bool_Exp = {
  _and?: InputMaybe<Array<Likes_Bool_Exp>>;
  _not?: InputMaybe<Likes_Bool_Exp>;
  _or?: InputMaybe<Array<Likes_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  like_id?: InputMaybe<Uuid_Comparison_Exp>;
  post?: InputMaybe<Posts_Bool_Exp>;
  post_id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "likes" */
export enum Likes_Constraint {
  /** unique or primary key constraint on columns "like_id" */
  LikesPkey = 'likes_pkey'
}

/** input type for inserting data into table "likes" */
export type Likes_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  like_id?: InputMaybe<Scalars['uuid']['input']>;
  post?: InputMaybe<Posts_Obj_Rel_Insert_Input>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Likes_Max_Fields = {
  __typename?: 'likes_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  like_id?: Maybe<Scalars['uuid']['output']>;
  post_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "likes" */
export type Likes_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  like_id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Likes_Min_Fields = {
  __typename?: 'likes_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  like_id?: Maybe<Scalars['uuid']['output']>;
  post_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "likes" */
export type Likes_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  like_id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "likes" */
export type Likes_Mutation_Response = {
  __typename?: 'likes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Likes>;
};

/** on_conflict condition type for table "likes" */
export type Likes_On_Conflict = {
  constraint: Likes_Constraint;
  update_columns?: Array<Likes_Update_Column>;
  where?: InputMaybe<Likes_Bool_Exp>;
};

/** Ordering options when selecting data from "likes". */
export type Likes_Order_By = {
  created_at?: InputMaybe<Order_By>;
  like_id?: InputMaybe<Order_By>;
  post?: InputMaybe<Posts_Order_By>;
  post_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: likes */
export type Likes_Pk_Columns_Input = {
  like_id: Scalars['uuid']['input'];
};

/** select columns of table "likes" */
export enum Likes_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  LikeId = 'like_id',
  /** column name */
  PostId = 'post_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "likes" */
export type Likes_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  like_id?: InputMaybe<Scalars['uuid']['input']>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "likes" */
export type Likes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Likes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Likes_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  like_id?: InputMaybe<Scalars['uuid']['input']>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "likes" */
export enum Likes_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  LikeId = 'like_id',
  /** column name */
  PostId = 'post_id',
  /** column name */
  UserId = 'user_id'
}

export type Likes_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Likes_Set_Input>;
  /** filter the rows which have to be updated */
  where: Likes_Bool_Exp;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "comments" */
  delete_comments?: Maybe<Comments_Mutation_Response>;
  /** delete single row from the table: "comments" */
  delete_comments_by_pk?: Maybe<Comments>;
  /** delete data from the table: "likes" */
  delete_likes?: Maybe<Likes_Mutation_Response>;
  /** delete single row from the table: "likes" */
  delete_likes_by_pk?: Maybe<Likes>;
  /** delete data from the table: "posts" */
  delete_posts?: Maybe<Posts_Mutation_Response>;
  /** delete single row from the table: "posts" */
  delete_posts_by_pk?: Maybe<Posts>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  generatePostText?: Maybe<GeneratedPostText>;
  generateUsers?: Maybe<GeneratedUsers>;
  /** insert data into the table: "comments" */
  insert_comments?: Maybe<Comments_Mutation_Response>;
  /** insert a single row into the table: "comments" */
  insert_comments_one?: Maybe<Comments>;
  /** insert data into the table: "likes" */
  insert_likes?: Maybe<Likes_Mutation_Response>;
  /** insert a single row into the table: "likes" */
  insert_likes_one?: Maybe<Likes>;
  /** insert data into the table: "posts" */
  insert_posts?: Maybe<Posts_Mutation_Response>;
  /** insert a single row into the table: "posts" */
  insert_posts_one?: Maybe<Posts>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "comments" */
  update_comments?: Maybe<Comments_Mutation_Response>;
  /** update single row of the table: "comments" */
  update_comments_by_pk?: Maybe<Comments>;
  /** update multiples rows of table: "comments" */
  update_comments_many?: Maybe<Array<Maybe<Comments_Mutation_Response>>>;
  /** update data of the table: "likes" */
  update_likes?: Maybe<Likes_Mutation_Response>;
  /** update single row of the table: "likes" */
  update_likes_by_pk?: Maybe<Likes>;
  /** update multiples rows of table: "likes" */
  update_likes_many?: Maybe<Array<Maybe<Likes_Mutation_Response>>>;
  /** update data of the table: "posts" */
  update_posts?: Maybe<Posts_Mutation_Response>;
  /** update single row of the table: "posts" */
  update_posts_by_pk?: Maybe<Posts>;
  /** update multiples rows of table: "posts" */
  update_posts_many?: Maybe<Array<Maybe<Posts_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_CommentsArgs = {
  where: Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Comments_By_PkArgs = {
  comment_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_LikesArgs = {
  where: Likes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Likes_By_PkArgs = {
  like_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_PostsArgs = {
  where: Posts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Posts_By_PkArgs = {
  post_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  user_id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootGeneratePostTextArgs = {
  args: GeneratePostTextRequest;
};


/** mutation root */
export type Mutation_RootGenerateUsersArgs = {
  args: GenerateUsersRequest;
};


/** mutation root */
export type Mutation_RootInsert_CommentsArgs = {
  objects: Array<Comments_Insert_Input>;
  on_conflict?: InputMaybe<Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Comments_OneArgs = {
  object: Comments_Insert_Input;
  on_conflict?: InputMaybe<Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_LikesArgs = {
  objects: Array<Likes_Insert_Input>;
  on_conflict?: InputMaybe<Likes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Likes_OneArgs = {
  object: Likes_Insert_Input;
  on_conflict?: InputMaybe<Likes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PostsArgs = {
  objects: Array<Posts_Insert_Input>;
  on_conflict?: InputMaybe<Posts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Posts_OneArgs = {
  object: Posts_Insert_Input;
  on_conflict?: InputMaybe<Posts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_CommentsArgs = {
  _set?: InputMaybe<Comments_Set_Input>;
  where: Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Comments_By_PkArgs = {
  _set?: InputMaybe<Comments_Set_Input>;
  pk_columns: Comments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Comments_ManyArgs = {
  updates: Array<Comments_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_LikesArgs = {
  _set?: InputMaybe<Likes_Set_Input>;
  where: Likes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Likes_By_PkArgs = {
  _set?: InputMaybe<Likes_Set_Input>;
  pk_columns: Likes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Likes_ManyArgs = {
  updates: Array<Likes_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_PostsArgs = {
  _set?: InputMaybe<Posts_Set_Input>;
  where: Posts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Posts_By_PkArgs = {
  _set?: InputMaybe<Posts_Set_Input>;
  pk_columns: Posts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Posts_ManyArgs = {
  updates: Array<Posts_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "posts" */
export type Posts = {
  __typename?: 'posts';
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregate relationship */
  comments_aggregate: Comments_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  /** An array relationship */
  likes: Array<Likes>;
  /** An aggregate relationship */
  likes_aggregate: Likes_Aggregate;
  post_id: Scalars['uuid']['output'];
  post_text: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['String']['output'];
};


/** columns and relationships of "posts" */
export type PostsCommentsArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


/** columns and relationships of "posts" */
export type PostsComments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


/** columns and relationships of "posts" */
export type PostsLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


/** columns and relationships of "posts" */
export type PostsLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};

/** aggregated selection of "posts" */
export type Posts_Aggregate = {
  __typename?: 'posts_aggregate';
  aggregate?: Maybe<Posts_Aggregate_Fields>;
  nodes: Array<Posts>;
};

export type Posts_Aggregate_Bool_Exp = {
  count?: InputMaybe<Posts_Aggregate_Bool_Exp_Count>;
};

export type Posts_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Posts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Posts_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "posts" */
export type Posts_Aggregate_Fields = {
  __typename?: 'posts_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Posts_Max_Fields>;
  min?: Maybe<Posts_Min_Fields>;
};


/** aggregate fields of "posts" */
export type Posts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Posts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "posts" */
export type Posts_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Posts_Max_Order_By>;
  min?: InputMaybe<Posts_Min_Order_By>;
};

/** input type for inserting array relation for remote table "posts" */
export type Posts_Arr_Rel_Insert_Input = {
  data: Array<Posts_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Posts_On_Conflict>;
};

/** Boolean expression to filter rows from the table "posts". All fields are combined with a logical 'AND'. */
export type Posts_Bool_Exp = {
  _and?: InputMaybe<Array<Posts_Bool_Exp>>;
  _not?: InputMaybe<Posts_Bool_Exp>;
  _or?: InputMaybe<Array<Posts_Bool_Exp>>;
  comments?: InputMaybe<Comments_Bool_Exp>;
  comments_aggregate?: InputMaybe<Comments_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  likes?: InputMaybe<Likes_Bool_Exp>;
  likes_aggregate?: InputMaybe<Likes_Aggregate_Bool_Exp>;
  post_id?: InputMaybe<Uuid_Comparison_Exp>;
  post_text?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "posts" */
export enum Posts_Constraint {
  /** unique or primary key constraint on columns "post_id" */
  PostsPkey = 'posts_pkey'
}

/** input type for inserting data into table "posts" */
export type Posts_Insert_Input = {
  comments?: InputMaybe<Comments_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  likes?: InputMaybe<Likes_Arr_Rel_Insert_Input>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  post_text?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Posts_Max_Fields = {
  __typename?: 'posts_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  post_id?: Maybe<Scalars['uuid']['output']>;
  post_text?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "posts" */
export type Posts_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  post_text?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Posts_Min_Fields = {
  __typename?: 'posts_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  post_id?: Maybe<Scalars['uuid']['output']>;
  post_text?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "posts" */
export type Posts_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  post_text?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "posts" */
export type Posts_Mutation_Response = {
  __typename?: 'posts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Posts>;
};

/** input type for inserting object relation for remote table "posts" */
export type Posts_Obj_Rel_Insert_Input = {
  data: Posts_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Posts_On_Conflict>;
};

/** on_conflict condition type for table "posts" */
export type Posts_On_Conflict = {
  constraint: Posts_Constraint;
  update_columns?: Array<Posts_Update_Column>;
  where?: InputMaybe<Posts_Bool_Exp>;
};

/** Ordering options when selecting data from "posts". */
export type Posts_Order_By = {
  comments_aggregate?: InputMaybe<Comments_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  likes_aggregate?: InputMaybe<Likes_Aggregate_Order_By>;
  post_id?: InputMaybe<Order_By>;
  post_text?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: posts */
export type Posts_Pk_Columns_Input = {
  post_id: Scalars['uuid']['input'];
};

/** select columns of table "posts" */
export enum Posts_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  PostId = 'post_id',
  /** column name */
  PostText = 'post_text',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "posts" */
export type Posts_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  post_text?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "posts" */
export type Posts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Posts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Posts_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  post_text?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "posts" */
export enum Posts_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  PostId = 'post_id',
  /** column name */
  PostText = 'post_text',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Posts_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Posts_Set_Input>;
  /** filter the rows which have to be updated */
  where: Posts_Bool_Exp;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregate relationship */
  comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "comments" using primary key columns */
  comments_by_pk?: Maybe<Comments>;
  /** An array relationship */
  likes: Array<Likes>;
  /** An aggregate relationship */
  likes_aggregate: Likes_Aggregate;
  /** fetch data from the table: "likes" using primary key columns */
  likes_by_pk?: Maybe<Likes>;
  login: LoginResponse;
  postWithComments?: Maybe<PostWithComments>;
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregate relationship */
  posts_aggregate: Posts_Aggregate;
  /** fetch data from the table: "posts" using primary key columns */
  posts_by_pk?: Maybe<Posts>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootCommentsArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


export type Query_RootComments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


export type Query_RootComments_By_PkArgs = {
  comment_id: Scalars['uuid']['input'];
};


export type Query_RootLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


export type Query_RootLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


export type Query_RootLikes_By_PkArgs = {
  like_id: Scalars['uuid']['input'];
};


export type Query_RootLoginArgs = {
  request: LoginRequestInput;
};


export type Query_RootPostWithCommentsArgs = {
  postId: Scalars['UUID']['input'];
};


export type Query_RootPostsArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


export type Query_RootPosts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


export type Query_RootPosts_By_PkArgs = {
  post_id: Scalars['uuid']['input'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  user_id: Scalars['String']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregate relationship */
  comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "comments" using primary key columns */
  comments_by_pk?: Maybe<Comments>;
  /** fetch data from the table in a streaming manner: "comments" */
  comments_stream: Array<Comments>;
  /** An array relationship */
  likes: Array<Likes>;
  /** An aggregate relationship */
  likes_aggregate: Likes_Aggregate;
  /** fetch data from the table: "likes" using primary key columns */
  likes_by_pk?: Maybe<Likes>;
  /** fetch data from the table in a streaming manner: "likes" */
  likes_stream: Array<Likes>;
  post: Post;
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregate relationship */
  posts_aggregate: Posts_Aggregate;
  /** fetch data from the table: "posts" using primary key columns */
  posts_by_pk?: Maybe<Posts>;
  /** fetch data from the table in a streaming manner: "posts" */
  posts_stream: Array<Posts>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
};


export type Subscription_RootCommentsArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


export type Subscription_RootComments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


export type Subscription_RootComments_By_PkArgs = {
  comment_id: Scalars['uuid']['input'];
};


export type Subscription_RootComments_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Comments_Stream_Cursor_Input>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


export type Subscription_RootLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


export type Subscription_RootLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


export type Subscription_RootLikes_By_PkArgs = {
  like_id: Scalars['uuid']['input'];
};


export type Subscription_RootLikes_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Likes_Stream_Cursor_Input>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


export type Subscription_RootPostsArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


export type Subscription_RootPosts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


export type Subscription_RootPosts_By_PkArgs = {
  post_id: Scalars['uuid']['input'];
};


export type Subscription_RootPosts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Posts_Stream_Cursor_Input>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  user_id: Scalars['String']['input'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregate relationship */
  comments_aggregate: Comments_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  email: Scalars['String']['output'];
  last_login_at: Scalars['timestamptz']['output'];
  /** An array relationship */
  likes: Array<Likes>;
  /** An aggregate relationship */
  likes_aggregate: Likes_Aggregate;
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregate relationship */
  posts_aggregate: Posts_Aggregate;
  updated_at: Scalars['timestamptz']['output'];
  user_id: Scalars['String']['output'];
  user_name: Scalars['String']['output'];
};


/** columns and relationships of "users" */
export type UsersCommentsArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersComments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comments_Order_By>>;
  where?: InputMaybe<Comments_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersLikes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersPostsArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersPosts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  comments?: InputMaybe<Comments_Bool_Exp>;
  comments_aggregate?: InputMaybe<Comments_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  last_login_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  likes?: InputMaybe<Likes_Bool_Exp>;
  likes_aggregate?: InputMaybe<Likes_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  picture?: InputMaybe<String_Comparison_Exp>;
  posts?: InputMaybe<Posts_Bool_Exp>;
  posts_aggregate?: InputMaybe<Posts_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
  user_name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "user_id" */
  UsersPkey = 'users_pkey',
  /** unique or primary key constraint on columns "user_name" */
  UsersUserNameKey = 'users_user_name_key'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  comments?: InputMaybe<Comments_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  last_login_at?: InputMaybe<Scalars['timestamptz']['input']>;
  likes?: InputMaybe<Likes_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<Posts_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
  user_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  last_login_at?: Maybe<Scalars['timestamptz']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
  user_name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  last_login_at?: Maybe<Scalars['timestamptz']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
  user_name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  comments_aggregate?: InputMaybe<Comments_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  last_login_at?: InputMaybe<Order_By>;
  likes_aggregate?: InputMaybe<Likes_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  picture?: InputMaybe<Order_By>;
  posts_aggregate?: InputMaybe<Posts_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  user_name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  user_id: Scalars['String']['input'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  LastLoginAt = 'last_login_at',
  /** column name */
  Name = 'name',
  /** column name */
  Picture = 'picture',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  UserName = 'user_name'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  last_login_at?: InputMaybe<Scalars['timestamptz']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
  user_name?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  last_login_at?: InputMaybe<Scalars['timestamptz']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
  user_name?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  LastLoginAt = 'last_login_at',
  /** column name */
  Name = 'name',
  /** column name */
  Picture = 'picture',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  UserName = 'user_name'
}

export type Users_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type DeleteCommentMutationVariables = Exact<{
  comment_id: Scalars['uuid']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'mutation_root', delete_comments_by_pk?: { __typename?: 'comments', comment_id: any } | null };

export type DeleteLikeMutationVariables = Exact<{
  like_id: Scalars['uuid']['input'];
}>;


export type DeleteLikeMutation = { __typename?: 'mutation_root', delete_likes_by_pk?: { __typename?: 'likes', like_id: any } | null };

export type DeletePostMutationVariables = Exact<{
  post_id: Scalars['uuid']['input'];
}>;


export type DeletePostMutation = { __typename?: 'mutation_root', delete_posts_by_pk?: { __typename?: 'posts', post_id: any } | null };

export type GeneratePostTextMutationVariables = Exact<{
  category: Scalars['String']['input'];
}>;


export type GeneratePostTextMutation = { __typename?: 'mutation_root', generatePostText?: { __typename?: 'GeneratedPostText', postText: string } | null };

export type InsertCommentMutationVariables = Exact<{
  comment_text: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
  post_id: Scalars['uuid']['input'];
}>;


export type InsertCommentMutation = { __typename?: 'mutation_root', insert_comments_one?: { __typename?: 'comments', comment_id: any, comment_text: string, created_at: any, user: { __typename?: 'users', name?: string | null, user_name: string, picture?: string | null } } | null };

export type InsertLikeMutationVariables = Exact<{
  post_id: Scalars['uuid']['input'];
  user_id: Scalars['String']['input'];
}>;


export type InsertLikeMutation = { __typename?: 'mutation_root', insert_likes_one?: { __typename?: 'likes', like_id: any, user: { __typename?: 'users', user_name: string } } | null };

export type InsertPostMutationVariables = Exact<{
  post_text: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
}>;


export type InsertPostMutation = { __typename?: 'mutation_root', insert_posts_one?: { __typename?: 'posts', post_id: any } | null };

export type UpdateCommentMutationVariables = Exact<{
  comment_id: Scalars['uuid']['input'];
  comment_text: Scalars['String']['input'];
}>;


export type UpdateCommentMutation = { __typename?: 'mutation_root', update_comments_by_pk?: { __typename?: 'comments', comment_id: any, comment_text: string } | null };

export type UpdatePostMutationVariables = Exact<{
  post_id: Scalars['uuid']['input'];
  post_text: Scalars['String']['input'];
}>;


export type UpdatePostMutation = { __typename?: 'mutation_root', update_posts_by_pk?: { __typename?: 'posts', post_id: any } | null };

export type UpsertUserMutationVariables = Exact<{
  user_id: Scalars['String']['input'];
  user_name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  update_columns?: InputMaybe<Array<Users_Update_Column> | Users_Update_Column>;
  last_login_at: Scalars['timestamptz']['input'];
}>;


export type UpsertUserMutation = { __typename?: 'mutation_root', insert_users_one?: { __typename?: 'users', user_id: string, user_name: string, name?: string | null, email: string, picture?: string | null, created_at: any, updated_at: any, last_login_at: any } | null };

export type GetPostByPkQueryVariables = Exact<{
  post_id: Scalars['uuid']['input'];
}>;


export type GetPostByPkQuery = { __typename?: 'query_root', posts_by_pk?: { __typename?: 'posts', post_id: any, post_text: string, created_at: any, user: { __typename?: 'users', name?: string | null, user_name: string, picture?: string | null }, comments: Array<{ __typename?: 'comments', comment_id: any, comment_text: string, created_at: any, user: { __typename?: 'users', name?: string | null, user_name: string, picture?: string | null } }>, likes: Array<{ __typename?: 'likes', like_id: any, user: { __typename?: 'users', user_name: string } }> } | null };

export type GetPostsQueryVariables = Exact<{
  user_name?: InputMaybe<String_Comparison_Exp>;
}>;


export type GetPostsQuery = { __typename?: 'query_root', posts: Array<{ __typename?: 'posts', post_id: any, post_text: string, created_at: any, user: { __typename?: 'users', name?: string | null, user_name: string, picture?: string | null }, comments: Array<{ __typename?: 'comments', comment_id: any, user: { __typename?: 'users', user_name: string } }>, likes: Array<{ __typename?: 'likes', like_id: any, user: { __typename?: 'users', user_name: string } }> }> };

export type GetProfileDataQueryVariables = Exact<{
  user_name: Scalars['String']['input'];
}>;


export type GetProfileDataQuery = { __typename?: 'query_root', posts: Array<{ __typename?: 'posts', post_id: any, post_text: string, created_at: any, user: { __typename?: 'users', name?: string | null, user_name: string, picture?: string | null }, comments: Array<{ __typename?: 'comments', comment_id: any, user: { __typename?: 'users', user_name: string } }>, likes: Array<{ __typename?: 'likes', like_id: any, user: { __typename?: 'users', user_name: string } }> }>, comments: Array<{ __typename?: 'comments', post: { __typename?: 'posts', post_id: any, post_text: string, created_at: any, user: { __typename?: 'users', name?: string | null, user_name: string, picture?: string | null }, comments: Array<{ __typename?: 'comments', comment_id: any, user: { __typename?: 'users', user_name: string } }>, likes: Array<{ __typename?: 'likes', like_id: any, user: { __typename?: 'users', user_name: string } }> } }>, likes: Array<{ __typename?: 'likes', post: { __typename?: 'posts', post_id: any, post_text: string, created_at: any, user: { __typename?: 'users', name?: string | null, user_name: string, picture?: string | null }, comments: Array<{ __typename?: 'comments', comment_id: any, user: { __typename?: 'users', user_name: string } }>, likes: Array<{ __typename?: 'likes', like_id: any, user: { __typename?: 'users', user_name: string } }> } }> };

export type UserByPkQueryVariables = Exact<{
  user_id: Scalars['String']['input'];
}>;


export type UserByPkQuery = { __typename?: 'query_root', users_by_pk?: { __typename?: 'users', user_name: string, email: string, name?: string | null, picture?: string | null, created_at: any } | null };

export type UserByUserNameQueryVariables = Exact<{
  user_name: Scalars['String']['input'];
}>;


export type UserByUserNameQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', user_name: string, name?: string | null, picture?: string | null, created_at: any }> };

export type SubscribePostByPkSubscriptionVariables = Exact<{
  post_id: Scalars['uuid']['input'];
}>;


export type SubscribePostByPkSubscription = { __typename?: 'subscription_root', posts_by_pk?: { __typename?: 'posts', post_id: any, post_text: string, created_at: any, user: { __typename?: 'users', name?: string | null, user_name: string, picture?: string | null }, comments: Array<{ __typename?: 'comments', comment_id: any, comment_text: string, created_at: any, user: { __typename?: 'users', name?: string | null, user_name: string, picture?: string | null } }>, likes: Array<{ __typename?: 'likes', like_id: any, user: { __typename?: 'users', user_name: string } }> } | null };

export type SubscribePostsSubscriptionVariables = Exact<{
  user_name?: InputMaybe<String_Comparison_Exp>;
}>;


export type SubscribePostsSubscription = { __typename?: 'subscription_root', posts: Array<{ __typename?: 'posts', post_id: any, post_text: string, created_at: any, user: { __typename?: 'users', name?: string | null, user_name: string, picture?: string | null }, comments: Array<{ __typename?: 'comments', comment_id: any, user: { __typename?: 'users', user_name: string } }>, likes: Array<{ __typename?: 'likes', like_id: any, user: { __typename?: 'users', user_name: string } }> }> };


export const DeleteCommentDocument = gql`
    mutation DeleteComment($comment_id: uuid!) {
  delete_comments_by_pk(comment_id: $comment_id) {
    comment_id
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      comment_id: // value for 'comment_id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeleteLikeDocument = gql`
    mutation DeleteLike($like_id: uuid!) {
  delete_likes_by_pk(like_id: $like_id) {
    like_id
  }
}
    `;
export type DeleteLikeMutationFn = Apollo.MutationFunction<DeleteLikeMutation, DeleteLikeMutationVariables>;

/**
 * __useDeleteLikeMutation__
 *
 * To run a mutation, you first call `useDeleteLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLikeMutation, { data, loading, error }] = useDeleteLikeMutation({
 *   variables: {
 *      like_id: // value for 'like_id'
 *   },
 * });
 */
export function useDeleteLikeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLikeMutation, DeleteLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLikeMutation, DeleteLikeMutationVariables>(DeleteLikeDocument, options);
      }
export type DeleteLikeMutationHookResult = ReturnType<typeof useDeleteLikeMutation>;
export type DeleteLikeMutationResult = Apollo.MutationResult<DeleteLikeMutation>;
export type DeleteLikeMutationOptions = Apollo.BaseMutationOptions<DeleteLikeMutation, DeleteLikeMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($post_id: uuid!) {
  delete_posts_by_pk(post_id: $post_id) {
    post_id
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      post_id: // value for 'post_id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const GeneratePostTextDocument = gql`
    mutation GeneratePostText($category: String!) {
  generatePostText(args: {category: $category}) {
    postText
  }
}
    `;
export type GeneratePostTextMutationFn = Apollo.MutationFunction<GeneratePostTextMutation, GeneratePostTextMutationVariables>;

/**
 * __useGeneratePostTextMutation__
 *
 * To run a mutation, you first call `useGeneratePostTextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGeneratePostTextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generatePostTextMutation, { data, loading, error }] = useGeneratePostTextMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useGeneratePostTextMutation(baseOptions?: Apollo.MutationHookOptions<GeneratePostTextMutation, GeneratePostTextMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GeneratePostTextMutation, GeneratePostTextMutationVariables>(GeneratePostTextDocument, options);
      }
export type GeneratePostTextMutationHookResult = ReturnType<typeof useGeneratePostTextMutation>;
export type GeneratePostTextMutationResult = Apollo.MutationResult<GeneratePostTextMutation>;
export type GeneratePostTextMutationOptions = Apollo.BaseMutationOptions<GeneratePostTextMutation, GeneratePostTextMutationVariables>;
export const InsertCommentDocument = gql`
    mutation InsertComment($comment_text: String!, $user_id: String!, $post_id: uuid!) {
  insert_comments_one(
    object: {comment_text: $comment_text, post_id: $post_id, user_id: $user_id}
  ) {
    comment_id
    comment_text
    created_at
    user {
      name
      user_name
      picture
    }
  }
}
    `;
export type InsertCommentMutationFn = Apollo.MutationFunction<InsertCommentMutation, InsertCommentMutationVariables>;

/**
 * __useInsertCommentMutation__
 *
 * To run a mutation, you first call `useInsertCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertCommentMutation, { data, loading, error }] = useInsertCommentMutation({
 *   variables: {
 *      comment_text: // value for 'comment_text'
 *      user_id: // value for 'user_id'
 *      post_id: // value for 'post_id'
 *   },
 * });
 */
export function useInsertCommentMutation(baseOptions?: Apollo.MutationHookOptions<InsertCommentMutation, InsertCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertCommentMutation, InsertCommentMutationVariables>(InsertCommentDocument, options);
      }
export type InsertCommentMutationHookResult = ReturnType<typeof useInsertCommentMutation>;
export type InsertCommentMutationResult = Apollo.MutationResult<InsertCommentMutation>;
export type InsertCommentMutationOptions = Apollo.BaseMutationOptions<InsertCommentMutation, InsertCommentMutationVariables>;
export const InsertLikeDocument = gql`
    mutation InsertLike($post_id: uuid!, $user_id: String!) {
  insert_likes_one(object: {post_id: $post_id, user_id: $user_id}) {
    like_id
    user {
      user_name
    }
  }
}
    `;
export type InsertLikeMutationFn = Apollo.MutationFunction<InsertLikeMutation, InsertLikeMutationVariables>;

/**
 * __useInsertLikeMutation__
 *
 * To run a mutation, you first call `useInsertLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertLikeMutation, { data, loading, error }] = useInsertLikeMutation({
 *   variables: {
 *      post_id: // value for 'post_id'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useInsertLikeMutation(baseOptions?: Apollo.MutationHookOptions<InsertLikeMutation, InsertLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertLikeMutation, InsertLikeMutationVariables>(InsertLikeDocument, options);
      }
export type InsertLikeMutationHookResult = ReturnType<typeof useInsertLikeMutation>;
export type InsertLikeMutationResult = Apollo.MutationResult<InsertLikeMutation>;
export type InsertLikeMutationOptions = Apollo.BaseMutationOptions<InsertLikeMutation, InsertLikeMutationVariables>;
export const InsertPostDocument = gql`
    mutation InsertPost($post_text: String!, $user_id: String!) {
  insert_posts_one(object: {post_text: $post_text, user_id: $user_id}) {
    post_id
  }
}
    `;
export type InsertPostMutationFn = Apollo.MutationFunction<InsertPostMutation, InsertPostMutationVariables>;

/**
 * __useInsertPostMutation__
 *
 * To run a mutation, you first call `useInsertPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertPostMutation, { data, loading, error }] = useInsertPostMutation({
 *   variables: {
 *      post_text: // value for 'post_text'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useInsertPostMutation(baseOptions?: Apollo.MutationHookOptions<InsertPostMutation, InsertPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertPostMutation, InsertPostMutationVariables>(InsertPostDocument, options);
      }
export type InsertPostMutationHookResult = ReturnType<typeof useInsertPostMutation>;
export type InsertPostMutationResult = Apollo.MutationResult<InsertPostMutation>;
export type InsertPostMutationOptions = Apollo.BaseMutationOptions<InsertPostMutation, InsertPostMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation UpdateComment($comment_id: uuid!, $comment_text: String!) {
  update_comments_by_pk(
    pk_columns: {comment_id: $comment_id}
    _set: {comment_text: $comment_text}
  ) {
    comment_id
    comment_text
  }
}
    `;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      comment_id: // value for 'comment_id'
 *      comment_text: // value for 'comment_text'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($post_id: uuid!, $post_text: String!) {
  update_posts_by_pk(
    pk_columns: {post_id: $post_id}
    _set: {post_text: $post_text}
  ) {
    post_id
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      post_id: // value for 'post_id'
 *      post_text: // value for 'post_text'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const UpsertUserDocument = gql`
    mutation UpsertUser($user_id: String!, $user_name: String!, $email: String!, $name: String, $picture: String, $update_columns: [users_update_column!], $last_login_at: timestamptz!) {
  insert_users_one(
    object: {user_id: $user_id, user_name: $user_name, email: $email, name: $name, picture: $picture, last_login_at: $last_login_at}
    on_conflict: {constraint: users_pkey, update_columns: $update_columns}
  ) {
    user_id
    user_name
    name
    email
    picture
    created_at
    updated_at
    last_login_at
  }
}
    `;
export type UpsertUserMutationFn = Apollo.MutationFunction<UpsertUserMutation, UpsertUserMutationVariables>;

/**
 * __useUpsertUserMutation__
 *
 * To run a mutation, you first call `useUpsertUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertUserMutation, { data, loading, error }] = useUpsertUserMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      user_name: // value for 'user_name'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      picture: // value for 'picture'
 *      update_columns: // value for 'update_columns'
 *      last_login_at: // value for 'last_login_at'
 *   },
 * });
 */
export function useUpsertUserMutation(baseOptions?: Apollo.MutationHookOptions<UpsertUserMutation, UpsertUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertUserMutation, UpsertUserMutationVariables>(UpsertUserDocument, options);
      }
export type UpsertUserMutationHookResult = ReturnType<typeof useUpsertUserMutation>;
export type UpsertUserMutationResult = Apollo.MutationResult<UpsertUserMutation>;
export type UpsertUserMutationOptions = Apollo.BaseMutationOptions<UpsertUserMutation, UpsertUserMutationVariables>;
export const GetPostByPkDocument = gql`
    query GetPostByPk($post_id: uuid!) {
  posts_by_pk(post_id: $post_id) {
    post_id
    post_text
    created_at
    user {
      name
      user_name
      picture
    }
    comments(order_by: {created_at: desc}) {
      comment_id
      comment_text
      created_at
      user {
        name
        user_name
        picture
      }
    }
    likes {
      like_id
      user {
        user_name
      }
    }
  }
}
    `;

/**
 * __useGetPostByPkQuery__
 *
 * To run a query within a React component, call `useGetPostByPkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByPkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByPkQuery({
 *   variables: {
 *      post_id: // value for 'post_id'
 *   },
 * });
 */
export function useGetPostByPkQuery(baseOptions: Apollo.QueryHookOptions<GetPostByPkQuery, GetPostByPkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostByPkQuery, GetPostByPkQueryVariables>(GetPostByPkDocument, options);
      }
export function useGetPostByPkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByPkQuery, GetPostByPkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostByPkQuery, GetPostByPkQueryVariables>(GetPostByPkDocument, options);
        }
export type GetPostByPkQueryHookResult = ReturnType<typeof useGetPostByPkQuery>;
export type GetPostByPkLazyQueryHookResult = ReturnType<typeof useGetPostByPkLazyQuery>;
export type GetPostByPkQueryResult = Apollo.QueryResult<GetPostByPkQuery, GetPostByPkQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts($user_name: String_comparison_exp) {
  posts(
    order_by: {created_at: desc}
    where: {user: {user_name: $user_name}}
    limit: 100
  ) {
    post_id
    post_text
    created_at
    user {
      name
      user_name
      picture
    }
    comments {
      comment_id
      user {
        user_name
      }
    }
    likes {
      like_id
      user {
        user_name
      }
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      user_name: // value for 'user_name'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetProfileDataDocument = gql`
    query GetProfileData($user_name: String!) {
  posts(
    order_by: {created_at: desc}
    where: {user: {user_name: {_eq: $user_name}}}
  ) {
    post_id
    post_text
    created_at
    user {
      name
      user_name
      picture
    }
    comments {
      comment_id
      user {
        user_name
      }
    }
    likes {
      like_id
      user {
        user_name
      }
    }
  }
  comments(
    where: {user: {user_name: {_eq: $user_name}}}
    order_by: {post: {created_at: desc}}
  ) {
    post {
      post_id
      post_text
      created_at
      user {
        name
        user_name
        picture
      }
      comments {
        comment_id
        user {
          user_name
        }
      }
      likes {
        like_id
        user {
          user_name
        }
      }
    }
  }
  likes(
    where: {user: {user_name: {_eq: $user_name}}}
    order_by: {post: {created_at: desc}}
  ) {
    post {
      post_id
      post_text
      created_at
      user {
        name
        user_name
        picture
      }
      comments {
        comment_id
        user {
          user_name
        }
      }
      likes {
        like_id
        user {
          user_name
        }
      }
    }
  }
}
    `;

/**
 * __useGetProfileDataQuery__
 *
 * To run a query within a React component, call `useGetProfileDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileDataQuery({
 *   variables: {
 *      user_name: // value for 'user_name'
 *   },
 * });
 */
export function useGetProfileDataQuery(baseOptions: Apollo.QueryHookOptions<GetProfileDataQuery, GetProfileDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileDataQuery, GetProfileDataQueryVariables>(GetProfileDataDocument, options);
      }
export function useGetProfileDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileDataQuery, GetProfileDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileDataQuery, GetProfileDataQueryVariables>(GetProfileDataDocument, options);
        }
export type GetProfileDataQueryHookResult = ReturnType<typeof useGetProfileDataQuery>;
export type GetProfileDataLazyQueryHookResult = ReturnType<typeof useGetProfileDataLazyQuery>;
export type GetProfileDataQueryResult = Apollo.QueryResult<GetProfileDataQuery, GetProfileDataQueryVariables>;
export const UserByPkDocument = gql`
    query UserByPk($user_id: String!) {
  users_by_pk(user_id: $user_id) {
    user_name
    email
    name
    picture
    created_at
  }
}
    `;

/**
 * __useUserByPkQuery__
 *
 * To run a query within a React component, call `useUserByPkQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByPkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByPkQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useUserByPkQuery(baseOptions: Apollo.QueryHookOptions<UserByPkQuery, UserByPkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByPkQuery, UserByPkQueryVariables>(UserByPkDocument, options);
      }
export function useUserByPkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByPkQuery, UserByPkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByPkQuery, UserByPkQueryVariables>(UserByPkDocument, options);
        }
export type UserByPkQueryHookResult = ReturnType<typeof useUserByPkQuery>;
export type UserByPkLazyQueryHookResult = ReturnType<typeof useUserByPkLazyQuery>;
export type UserByPkQueryResult = Apollo.QueryResult<UserByPkQuery, UserByPkQueryVariables>;
export const UserByUserNameDocument = gql`
    query UserByUserName($user_name: String!) {
  users(limit: 1, where: {user_name: {_eq: $user_name}}) {
    user_name
    name
    picture
    created_at
  }
}
    `;

/**
 * __useUserByUserNameQuery__
 *
 * To run a query within a React component, call `useUserByUserNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByUserNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByUserNameQuery({
 *   variables: {
 *      user_name: // value for 'user_name'
 *   },
 * });
 */
export function useUserByUserNameQuery(baseOptions: Apollo.QueryHookOptions<UserByUserNameQuery, UserByUserNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByUserNameQuery, UserByUserNameQueryVariables>(UserByUserNameDocument, options);
      }
export function useUserByUserNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByUserNameQuery, UserByUserNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByUserNameQuery, UserByUserNameQueryVariables>(UserByUserNameDocument, options);
        }
export type UserByUserNameQueryHookResult = ReturnType<typeof useUserByUserNameQuery>;
export type UserByUserNameLazyQueryHookResult = ReturnType<typeof useUserByUserNameLazyQuery>;
export type UserByUserNameQueryResult = Apollo.QueryResult<UserByUserNameQuery, UserByUserNameQueryVariables>;
export const SubscribePostByPkDocument = gql`
    subscription SubscribePostByPk($post_id: uuid!) {
  posts_by_pk(post_id: $post_id) {
    post_id
    post_text
    created_at
    user {
      name
      user_name
      picture
    }
    comments(order_by: {created_at: desc}) {
      comment_id
      comment_text
      created_at
      user {
        name
        user_name
        picture
      }
    }
    likes {
      like_id
      user {
        user_name
      }
    }
  }
}
    `;

/**
 * __useSubscribePostByPkSubscription__
 *
 * To run a query within a React component, call `useSubscribePostByPkSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribePostByPkSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribePostByPkSubscription({
 *   variables: {
 *      post_id: // value for 'post_id'
 *   },
 * });
 */
export function useSubscribePostByPkSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribePostByPkSubscription, SubscribePostByPkSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribePostByPkSubscription, SubscribePostByPkSubscriptionVariables>(SubscribePostByPkDocument, options);
      }
export type SubscribePostByPkSubscriptionHookResult = ReturnType<typeof useSubscribePostByPkSubscription>;
export type SubscribePostByPkSubscriptionResult = Apollo.SubscriptionResult<SubscribePostByPkSubscription>;
export const SubscribePostsDocument = gql`
    subscription SubscribePosts($user_name: String_comparison_exp) {
  posts(
    order_by: {created_at: desc}
    where: {user: {user_name: $user_name}}
    limit: 100
  ) {
    post_id
    post_text
    created_at
    user {
      name
      user_name
      picture
    }
    comments {
      comment_id
      user {
        user_name
      }
    }
    likes {
      like_id
      user {
        user_name
      }
    }
  }
}
    `;

/**
 * __useSubscribePostsSubscription__
 *
 * To run a query within a React component, call `useSubscribePostsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribePostsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribePostsSubscription({
 *   variables: {
 *      user_name: // value for 'user_name'
 *   },
 * });
 */
export function useSubscribePostsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribePostsSubscription, SubscribePostsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribePostsSubscription, SubscribePostsSubscriptionVariables>(SubscribePostsDocument, options);
      }
export type SubscribePostsSubscriptionHookResult = ReturnType<typeof useSubscribePostsSubscription>;
export type SubscribePostsSubscriptionResult = Apollo.SubscriptionResult<SubscribePostsSubscription>;