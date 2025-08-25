import { useEffect, useState, ChangeEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";
import { COLLECTIONS } from "../utils/collections";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { Post } from "./PostList";
import { Community } from "./CommunityList";

export const EditPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: post, isLoading, error } = useQuery<Post, Error>({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(COLLECTIONS.POSTS)
        .select("*")
        .eq("id", postId)
        .single();
      if (error) throw new Error(error.message);
      return data as Post;
    },
    enabled: !!postId,
  });

  const { data: communities } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(COLLECTIONS.COMMUNITIES)
        .select("*");
      if (error) throw new Error(error.message);
      return data as Community[];
    },
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [communityId, setCommunityId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCommunityId(post.community_id);
    }
  }, [post]);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: { title: string; content: string; community_id: string | null; imageFile?: File | null }) => {
      let imageUrl = post?.image_url;
      if (data.imageFile) {
        const filePath = `${data.title}-${Date.now()}-${data.imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from(COLLECTIONS.POST_IMAGES)
          .upload(filePath, data.imageFile);
        if (uploadError) throw new Error(uploadError.message);
        const { data: publicURLData } = supabase.storage
          .from(COLLECTIONS.POST_IMAGES)
          .getPublicUrl(filePath);
        imageUrl = publicURLData.publicUrl;
      }
      const { error } = await supabase
        .from(COLLECTIONS.POSTS)
        .update({ title: data.title, content: data.content, community_id: data.community_id, image_url: imageUrl })
        .eq("id", postId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post updated!");
      navigate(`/post/${postId}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Title and content are required.");
      return;
    }
    mutate({ title, content, community_id: communityId, imageFile: selectedFile });
  };

  const handleCommunityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCommunityId(value ? String(value) : null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  if (isLoading)
    return (
      <div className="text-center text-gray-300 text-lg">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 text-lg">
        Error: {error.message}
      </div>
    );
  if (!post)
    return (
      <div className="text-center text-gray-300 text-lg">Post not found.</div>
    );
  if (user?.id !== post.user_id)
    return (
      <div className="text-center text-red-500 text-lg">
        You are not authorized to edit this post.
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto my-8 relative group"
    >
      {/* Pulsing gradient background on hover */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-md opacity-0 group-hover:opacity-60 group-hover:animate-pulse-gradient transition-opacity duration-500 pointer-events-none"></div>

      <div className="relative z-10 bg-gray-900 rounded-3xl shadow-lg p-6 md:p-8 transition-all duration-300 group-hover:shadow-2xl border border-gray-700 hover:border-purple-500 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide">
          Edit Blog Post
        </h2>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-lg font-medium text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:bg-gray-700 placeholder-gray-400"
            placeholder="Enter your post title"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block mb-2 text-lg font-medium text-white"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:bg-gray-700 placeholder-gray-400"
            rows={6}
            placeholder="Write your post content here"
            required
          />
        </div>

        {/* Community Selection */}
        <div>
          <label
            htmlFor="community"
            className="block mb-2 text-lg font-medium text-white"
          >
            Select Community
          </label>
          <select
            id="community"
            value={communityId ?? ""}
            onChange={handleCommunityChange}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:bg-gray-700"
          >
            <option value="">-- Choose a Community --</option>
            {communities?.map((community) => (
              <option key={community.id} value={community.id}>
                {community.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block mb-2 text-lg font-medium text-white"
          >
            Change Image (optional)
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:font-medium file:cursor-pointer file:transition-all file:duration-200 file:hover:bg-purple-700"
          />
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-400">
              Selected: {selectedFile.name}
            </p>
          )}
          {post.image_url && !selectedFile && (
            <div className="mt-4 relative group/image h-[300px] border border-dashed border-gray-600 rounded-lg ">
              <img
                src={post.image_url}
                alt="Current post image"
                className="w-full h-full object-cover transition-all duration-300 group-hover/image:brightness-110 group-hover/image:shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg group-hover:animate-bounce-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Updating..." : "Update Post"}
        </button>

        {/* Error Message */}
        {isError && (
          <p className="text-red-500 text-center text-sm font-medium">
            Error updating post. Please try again.
          </p>
        )}
      </div>
    </form>
  );
};