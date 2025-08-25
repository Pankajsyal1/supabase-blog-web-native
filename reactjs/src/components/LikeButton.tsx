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
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-6 0v4M5 15h14l-1.34 5.36A2 2 0 0115.7 22H8.3a2 2 0 01-1.96-1.64L5 15z" />
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
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 15v4a3 3 0 006 0v-4M19 9H5l1.34-5.36A2 2 0 018.3 2h7.4a2 2 0 011.96 1.64L19 9z" />
        </svg>
        <span className="font-semibold transition-all duration-200">{dislikes}</span>
      </button>
    </div>
  );
};
