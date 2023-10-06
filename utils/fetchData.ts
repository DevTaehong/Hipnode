import { supabase } from './supabaseClient';
import { User, Post } from '@/types/index.d';

export const fetchUsersNameAndId = async (): Promise<User[] | []> => {
  try {
    const { data, error } = await supabase.from('User').select('id, name');

    if (error) {
      console.error('Error fetching user names and IDs:', error);
      throw error;
    }

    return data as User[];
  } catch (error) {
    console.error('Error in fetchUsersNameAndId function:', error);
    return [];
  }
};

export const getAllUsers = async (): Promise<User[] | []> => {
  try {
    const { data, error } = await supabase.from('User').select('*');

    if (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }

    return data as User[];
  } catch (error) {
    console.error('Error in getAllUsers function:', error);
    return [];
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }

    return data as User;
  } catch (error) {
    console.error('Error in getUserById function:', error);
    return null;
  }
};

export const getPostsByUserId = async (
  userId: number
): Promise<Post[] | []> => {
  try {
    const { data, error } = await supabase
      .from('Post')
      .select('*')
      .eq('authorId', userId);

    if (error) {
      console.error(`Error fetching posts for user ${userId}:`, error);
      throw error;
    }

    return data as Post[];
  } catch (error) {
    console.error('Error in getPostsByUserId function:', error);
    return [];
  }
};

export const getMostPopularPosts = async (): Promise<Post[] | []> => {
  try {
    const { data, error } = await supabase
      .from('Post')
      .select('*')
      .order('viewCount', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching most popular posts:', error);
      throw error;
    }

    return data as Post[];
  } catch (error) {
    console.error('Error in getMostPopularPosts function:', error);
    return [];
  }
};

export const getPostsWithMostLikes = async (): Promise<Post[] | []> => {
  try {
    const { data: posts, error } = await supabase.rpc(
      'get_posts_with_most_likes',
      { limit: 5 }
    );

    if (error) {
      console.error('Error fetching posts with most likes:', error);
      throw error;
    }

    return posts as Post[];
  } catch (error) {
    console.error('Error in getPostsWithMostLikes function:', error);
    return [];
  }
};

export const getPostsByTag = async (tagName: string): Promise<Post[] | []> => {
  try {
    const { data: tagOnPostData, error: tagOnPostError } = await supabase
      .from('TagOnPost')
      .select('postId')
      .eq('tag', tagName);

    if (tagOnPostError) {
      console.error(
        `Error fetching post IDs for tag ${tagName}:`,
        tagOnPostError
      );
      throw tagOnPostError;
    }

    const postIds = tagOnPostData.map((item) => item.postId);

    if (postIds.length === 0) {
      return [];
    }

    const { data: postData, error: postError } = await supabase
      .from('Post')
      .select('*')
      .in('id', postIds);

    if (postError) {
      console.error('Error fetching posts:', postError);
      throw postError;
    }

    return postData as Post[];
  } catch (error) {
    console.error('Error in getPostsByTag function:', error);
    return [];
  }
};
