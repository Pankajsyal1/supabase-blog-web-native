import { Link } from "react-router"; // Corrected import for 'react-router-dom'
import { Post } from "../PostList";

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  return (
    <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg bg-gray-900 m-4 transition-all duration-300 ease-in-out relative group hover:scale-105 hover:shadow-2xl">
      {/* Pulsing gradient background on hover */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-md opacity-0 group-hover:opacity-60 group-hover:animate-pulse-gradient transition-opacity duration-500 pointer-events-none"></div>

      {/* Shimmer effect overlay when loading (example, always visible for demo) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-purple-300/20 to-transparent animate-shimmer rounded-3xl" />
      </div>

      <Link to={`/post/${post.id}`} className="block relative z-30">
        <div className="p-4 flex flex-col h-full">
          {/* Blog Image */}
          <div className="relative">
            <img
              className="w-full h-48 object-cover rounded-2xl mb-4 transition-all duration-300 group-hover:brightness-110 group-hover:translate-y-[-4px]"
              src={post.image_url}
              alt={post.title}
            />
            {/* Shimmer for image */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-700/10 via-purple-400/10 to-gray-700/10 animate-shimmer" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 tracking-wide">
            {post.title}
          </h2>

          {/* Content Preview */}
          <div className="border-t border-gray-800 py-4">
            <p className="text-gray-300 text-base mb-4 line-clamp-3 flex-1">
              {post.content}
            </p>
            <div className="flex items-center gap-2">
              {post.like_count !== undefined && (
                <div className="flex items-center text-gray-300 cursor-pointer px-3 py-1 rounded-full bg-gray-800/50 transition-all duration-200 hover:bg-purple-600/50 group-hover:animate-bounce-icon">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                  <span className="text-sm font-semibold">{post.like_count}</span>
                </div>
              )}
              {post.comment_count !== undefined && (
                <div className="flex items-center text-gray-300 cursor-pointer px-3 py-1 rounded-full bg-gray-800/50 transition-all duration-200 hover:bg-purple-600/50 group-hover:animate-bounce-icon">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    ></path>
                  </svg>
                  <span className="text-sm font-semibold">{post.comment_count}</span>
                </div>
              )}
              <div className="flex items-center text-gray-300 cursor-pointer px-3 py-1 rounded-full bg-gray-800/50 transition-all duration-200 hover:bg-purple-600/50 group-hover:animate-bounce-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                </svg>
                <span className="text-sm font-semibold">{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Footer: Avatar, Date, Likes, and Comments */}

          <div className="flex items-center justify-between border-t border-gray-800 pt-4">
            {post.avatar_url ? (
              <>
                <img
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-400 transition-transform duration-300 group-hover:rotate-6"
                  src={post.avatar_url}
                  alt="Author avatar"
                />
                {post.author_name && (
                  <span className="text-sm font-semibold text-gray-300">
                    {post.author_name}
                  </span>
                )}
              </>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700" />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;