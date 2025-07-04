import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { Post } from "./PostList";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./CommentSection";
import { COLLECTIONS } from "../utils/collections";

interface Props {
  postId: string;
}

const fetchPostById = async (id: string): Promise<Post> => {

  const { data, error } = await supabase
    .from(COLLECTIONS.POSTS)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data as Post;
};

export const PostDetail = ({ postId }: Props) => {
  const { data, error, isLoading } = useQuery<Post, Error>({
    queryKey: ["posts", postId],
    queryFn: () => fetchPostById(postId)
  });

  if (isLoading) return <div>Loading post...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        {data?.title}
      </h2>
      {data?.image_url && (
        <img
          src={data.image_url}
          alt={data?.title}
          className="mt-4 rounded object-cover w-full h-64"
        />
      )}
      <p className="text-gray-400">{data?.content}</p>
      <p className="text-gray-500 text-sm">
        Posted on: {new Date(data!.created_at).toLocaleDateString()}
      </p>

      <LikeButton postId={postId} />
      <CommentSection postId={postId} />
    </div>
  );
};