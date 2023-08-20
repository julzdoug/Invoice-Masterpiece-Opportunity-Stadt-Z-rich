import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.local.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.local.VITE_SUPABASE_ANON_KEY;

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
  if (event === 'SIGNED_IN') {
    fetchCompanyData();
    fetchUserData(); 
     // Call fetchCompanyData when the user is signed in or authenticated
  }
});
