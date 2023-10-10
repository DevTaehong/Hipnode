import { supabase } from "@/utils/supabaseClient";
import { MeetUp, Group } from "@/types";

export const getAllMeetups = async (): Promise<MeetUp[] | []> => {
  try {
    const { data, error } = await supabase.from("MeetUp").select("*");

    if (error) {
      console.error("Error fetching all meetups:", error);
      throw error;
    }

    return data as MeetUp[];
  } catch (error) {
    console.error("Error in getAllMeetups function:", error);
    return [];
  }
};

export const getAllGroups = async (): Promise<Group[] | []> => {
  try {
    const { data, error } = await supabase.from("Group").select("*");

    if (error) {
      console.error("Error fetching all groups:", error);
      throw error;
    }

    return data as Group[];
  } catch (error) {
    console.error("Error in getAllGroups function:", error);
    return [];
  }
};
