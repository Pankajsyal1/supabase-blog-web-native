import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { supabase } from "../supabase";
import { Post } from "./PostList";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./CommentSection";
import { COLLECTIONS } from "../utils/collections";
import { useAuth } from "../context/AuthContext";

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

const deletePost = async (postId: string) => {
  const { error } = await supabase.from(COLLECTIONS.POSTS).delete().eq("id", postId);
  if (error) throw new Error(error.message);
};

export const PostDetail = ({ postId }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<Post, Error>({
    queryKey: ["posts", postId],
    queryFn: () => fetchPostById(postId),
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });

  if (isLoading) return <div>Loading post...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 rounded-3xl shadow-2xl p-8 mb-12 relative overflow-hidden">

      {/* Gradient border effect */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-md opacity-40 pointer-events-none"></div>
      <div className="relative z-10">
        {data?.image_url && (
          <div className="flex justify-center mb-6">
            <img
              src={data.image_url}
              alt={data?.title}
              className="rounded-2xl object-cover w-full max-h-96 shadow-lg border-4 border-purple-700/30"
            />
          </div>
        )}

        {/* Meta info row */}
        <div className="flex items-center justify-between mt-4 mb-6 px-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center text-gray-300 px-3 py-1 rounded-full bg-gray-800/60">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-sm font-semibold">
                {data?.like_count ?? 0}
              </span>
            </div>
            <div className="flex items-center text-gray-300 px-3 py-1 rounded-full bg-gray-800/60">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span className="text-sm font-semibold">
                {data?.comment_count ?? 0}
              </span>
            </div>
            <div className="flex items-center text-gray-300 px-3 py-1 rounded-full bg-gray-800/60">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                />
              </svg>
              <span className="text-sm font-semibold">
                {new Date(data!.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          {/* Avatar */}
          {data?.avatar_url ? (
            <img
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-400 shadow"
              src={data.avatar_url}
              alt="Author avatar"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700" />
          )}
        </div>

        {/* Content */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          {data?.title}
        </h2>
        <div className="bg-gray-800/70 rounded-xl p-6 text-lg text-gray-200 leading-relaxed shadow-inner">
          {data?.content}
        </div>

        {/* Actions */}
        <div className="mt-4">
         <div className="flex items-center gap-4 justify-between">
           <LikeButton postId={postId} />
           <div className="flex gap-2">
            {/* Edit Button (only for owner) */}
            {user && data?.user_id === user.id && (
              <>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition z-20"
                  onClick={() => navigate(`/edit/${postId}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition z-20"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
                      deleteMutate();
                    }
                  }}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </>
            )}
           </div>
         </div>
          <CommentSection postId={postId} />
        </div>
      </div>
    </div>
  );
};