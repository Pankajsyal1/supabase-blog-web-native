import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import PostItem from "./PostItem";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

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
  author_name: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase.rpc("get_posts_with_counts");

  if (error) throw new Error(error.message);
  return data as Post[]
}

const PostList = () => {
const { user } = useAuth();
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
    <div className="grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 sm:gap-4 md:gap-6 ">
      {data!.length > 0 ? (
        data?.map((post, key) => (
          <PostItem post={post} key={key} />
        ))
      ) : (
        <div className="text-center text-gray-400 bg-gray-900 px-8 py-16 rounded-3xl mt-8 xl:col-span-3 lg:col-span-3 sm:col-span-2 xs:col-span-1">
          <p>No posts found.</p>
          { user && <Link to="/create" className="mt-6 inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg group-hover:animate-bounce-button disabled:opacity-50 disabled:cursor-not-allowed">+ Add Blog</Link>}
        </div>
      )}
    </div>
  );
};

export default PostList