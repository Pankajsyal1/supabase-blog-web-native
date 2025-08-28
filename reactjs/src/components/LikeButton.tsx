import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";
import { COLLECTIONS } from "../utils/collections";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

interface Props {
  postId: string;
}

interface Vote {
  id: number;
  post_id: string;
  user_id: string;
  vote: number;
}

const fetchVotes = async (postId: string): Promise<Vote[]> => {
  const { data, error } = await supabase
    .from(COLLECTIONS.VOTES)
    .select("*")
    .eq("post_id", postId);

  if (error) throw new Error(error.message);
  return data as Vote[];
};

const vote = async (voteValue: number, postId: string, userId: string) => {
  const { data: existingVote } = await supabase
    .from(COLLECTIONS.VOTES)
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (existingVote) {
    if (existingVote.vote === voteValue) {
      const { error } = await supabase
        .from(COLLECTIONS.VOTES)
        .delete()
        .eq("id", existingVote.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase
        .from(COLLECTIONS.VOTES)
        .update({ vote: voteValue })
        .eq("id", existingVote.id);
      if (error) throw new Error(error.message);
    }
  } else {
    const { error } = await supabase.from(COLLECTIONS.VOTES).insert({
      post_id: postId,
      user_id: userId,
      vote: voteValue,
    });
    if (error) throw new Error(error.message);
  }
};

export const LikeButton = ({ postId }: Props) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: votes,
    isLoading,
    error,
  } = useQuery<Vote[], Error>({
    queryKey: ["votes", postId],
    queryFn: () => fetchVotes(postId),
    refetchInterval: 5000,
    enabled: !!user, // avoid unnecessary fetch
  });

  const { mutate } = useMutation({
    mutationFn: (voteValue: number) => {
      if (!user) {
        toast.error('You must be logged in to vote!')
        navigate("/"); // Redirect 
        return Promise.reject("Not logged in");
      }

      return vote(voteValue, postId, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["votes", postId] });
    },
  });

  if (isLoading) return <div>Loading votes...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const likes = votes?.filter((v) => v.vote === 1).length || 0;
  const dislikes = votes?.filter((v) => v.vote === -1).length || 0;
  const userVote = votes?.find((v) => v.user_id === user?.id)?.vote;

  return (
    <div className="flex items-center gap-4 my-4">
      <button
        onClick={() => mutate(1)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-150 shadow-sm
          ${userVote === 1
            ? "bg-green-500 border-green-600 text-white ring-2 ring-green-400"
            : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-green-500/80 hover:text-white"}
          focus:outline-none`}
        title="Like"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
        </svg>

        <span className="font-semibold transition-all duration-200">{likes}</span>
      </button>
      <button
        onClick={() => mutate(-1)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-150 shadow-sm
          ${userVote === -1
            ? "bg-red-500 border-red-600 text-white ring-2 ring-red-400"
            : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-red-500/80 hover:text-white"}
          focus:outline-none`}
        title="Dislike"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
        </svg>

        <span className="font-semibold transition-all duration-200">{dislikes}</span>
      </button>
    </div>
  );
};
