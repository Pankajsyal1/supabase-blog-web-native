import supabase from "../supabase";


const uploadImage = async (filePath, image) => {
  const { data: uploadError } = await supabase
    .storage
    .from('post-images')
    .upload(filePath, image);

  if (uploadError) throw new Error(uploadError.message);
  const { data: publicURLData } = await supabase.storage.from("post-images").getPublicUrl(filePath);

  return publicURLData ? publicURLData : null
}

export const createPost = async (post, image) => {
  console.log(JSON.stringify(post), JSON.stringify(image), "66666666666")
  const filePath = `${post.title}-${Date.now()}-${image.fileName}`;
  await uploadImage(filePath, image);
  const { data, error } = await supabase
    .from("posts")
    .insert({ ...post, image_url: publicURLData.publicUrl });


  if (error) throw new Error(error.message);

  return data;
}