import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { Link } from "react-router";
import { COLLECTIONS } from "../utils/collections";

export interface Community {
  id: number;
  name: string;
  description: string;
  created_at: string;
}
export const fetchCommunities = async (): Promise<Community[]> => {
  const { data, error } = await supabase
    .from(COLLECTIONS.COMMUNITIES)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Community[];
};

export const CommunityList = () => {
  const { data, error, isLoading } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });


  if (isLoading)
    return (
      <div className="max-w-5xl mx-auto space-y-4" data-testid="shimmer-loading">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="border border-white/10 p-4 rounded bg-gray-900/80 animate-shimmer flex flex-col gap-2"
          >
            <div className="h-6 w-1/3 bg-gradient-to-r from-gray-700/20 via-purple-400/20 to-gray-700/20 rounded mb-2 animate-shimmer" />
            <div className="h-4 w-2/3 bg-gradient-to-r from-gray-700/10 via-purple-400/10 to-gray-700/10 rounded animate-shimmer" />
          </div>
        ))}
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 py-4">
        Error: {error.message}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {data!.length > 0 ? (
        data?.map((community) => (
          <div
            key={community.id}
            className="border border-white/10 p-4 rounded hover:-translate-y-1 transition transform"
          >
            <Link
              to={`/community/${community.id}`}
              className="text-2xl font-bold text-purple-500 hover:underline"
            >
              {community.name}
            </Link>
            <p className="text-gray-400 mt-2">{community.description}</p>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400 py-8">No communities found.</div>
      )}
    </div>
  );
};