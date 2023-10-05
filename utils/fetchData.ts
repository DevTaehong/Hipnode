import { supabase } from './supabaseClient';
import { User } from '@/types/index.d';

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
