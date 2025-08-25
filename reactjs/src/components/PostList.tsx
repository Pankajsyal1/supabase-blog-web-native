import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import PostItem from "./PostItem";

export interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
  avatar_url?: string;
  like_count?: number;
  comment_count?: number;
  user_id: string;
  community_id: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase.rpc("get_posts_with_counts");

  if (error) throw new Error(error.message);
  return data as Post[]
}

const PostList = () => {

  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts
  });
  if (isLoading) {
    return <div> Loading posts...</div>;
  }

  if (error) {
    return <div> Error: {error.message}</div>;
  }
  console.log(data);

  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 sm:gap-4 md:gap-6">
      {data?.map((post, key) => (
        <PostItem post={post} key={key} />
      ))}
    </div>
  );
};

export default PostList