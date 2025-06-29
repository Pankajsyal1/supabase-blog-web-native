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
    <div className="flex items-center space-x-4 my-4">
      <button
        onClick={() => mutate(1)}
        className={`px-3 py-1 cursor-pointer rounded transition-colors duration-150 ${userVote === 1 ? "bg-green-500 text-white" : "bg-gray-200 text-black"
          }`}
      >
        👍 {likes}
      </button>
      <button
        onClick={() => mutate(-1)}
        className={`px-3 py-1 cursor-pointer rounded transition-colors duration-150 ${userVote === -1 ? "bg-red-500 text-white" : "bg-gray-200 text-black"
          }`}
      >
        👎 {dislikes}
      </button>
    </div>
  );
};
