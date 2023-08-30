import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
import useAuthUser from "./auth";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log(supabase.auth);

export async function fetchCompanyData() {
  try {
    const user = supabase.auth.user;

    if (user) {
      const { data, error } = await supabase
        .from('company')
        .select('*')
        .eq('user_id', user.id)
        .limit(1);

      if (error) {
        console.error('Failed to fetch data:', error);
        return null;
      }

      if (data.length > 0) {
        return data[0];
      }
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
}
export async function fetchUserData() {
  try {
    const user = supabase.auth.user;
    if (user) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .limit(1);
      if (error) {
        console.error('Failed to fetch data:', error);
        return null;
      }
      if (data.length > 0) {
        return data[0];
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
}

supabase.auth.onAuthStateChange((event, session) => {
  const { user: authUser } = useAuthUser(); // Rename user to authUser

  authUser.value = session?.user || null; // Use authUser.value
});


export default function useSupabase() {
  return { supabase };
}