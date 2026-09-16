import { supabaseClient } from "../embedding.js";

export const createDocument = async (name, userid) => {
  const { data, error } = await supabaseClient
    .from("documents")
    .insert({
      name: name,
      user_id: userid,
    })
    .select("document_id")
    .single();

  if (error) {
    console.error("Supabase error", error);
    throw error;
  }

  return data.document_id;
};
