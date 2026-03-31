const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log("Supabase URL or Key not provided in .env");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
