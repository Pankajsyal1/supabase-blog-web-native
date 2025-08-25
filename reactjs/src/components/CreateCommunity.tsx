import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { supabase } from "../supabase";
import { COLLECTIONS } from "../utils/collections";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-hot-toast/headless";

interface CommunityInput {
  name: string;
  description: string;
  user_id: string;
}

const createCommunity = async (community: CommunityInput) => {
  const { error, data } = await supabase
    .from(COLLECTIONS.COMMUNITIES)
    .insert(community);

  if (error) throw new Error(error.message);
  return data;
};

export const CreateCommunity = () => {
  const { user } = useAuth();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      toast.success("Community created successfully!");
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      navigate("/communities");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) {
      toast.error("Name and description are required.");
      return;
    }
    mutate({ name, description, user_id: user!.id });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto my-8 relative group"
    >
      {/* Pulsing gradient background on hover */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-md opacity-0 group-hover:opacity-60 group-hover:animate-pulse-gradient transition-opacity duration-500 pointer-events-none"></div>

      <div className="relative z-10 bg-gray-900 rounded-3xl shadow-lg p-6 md:p-8 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02] border border-gray-700 hover:border-purple-500 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide">
          Create New Community
        </h2>

        {/* Community Name */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-lg font-medium text-white"
          >
            Community Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:bg-gray-700 placeholder-gray-400"
            placeholder="Enter community name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-lg font-medium text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:bg-gray-700 placeholder-gray-400"
            rows={4}
            placeholder="Describe your community"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg group-hover:animate-bounce-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating..." : "Create Community"}
        </button>

        {/* Error Message */}
        {isError && (
          <p className="text-red-500 text-center text-sm font-medium">
            Error creating community. Please try again.
          </p>
        )}

      </div>
    </form>
  );
};