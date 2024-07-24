import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://gpbwhkyvvzthqazzbwfj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYndoa3l2dnp0aHFhenpid2ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MjgwNzUsImV4cCI6MjAzNzQwNDA3NX0.13gr87U3Y9aAS2UHZzMT9KR0upSi0BDa7xmPywJoeSs"
);
