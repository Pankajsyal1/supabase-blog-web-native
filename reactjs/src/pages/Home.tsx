import PostList from "../components/PostList";

const Home = () => {
  return (
    <div className="pt-10">
      <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Recent Posts
      </h2>
      <div className="container">
        <PostList />
      </div>
    </div>
  );
};

export default Home