import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://gpbwhkyvvzthqazzbwfj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYndoa3l2dnp0aHFhenpid2ZqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTgyODA3NSwiZXhwIjoyMDM3NDA0MDc1fQ.SwMvT8bICtsBhw348QcrhPyxhFoMnIq_9CuMnlyKC3c"
);
