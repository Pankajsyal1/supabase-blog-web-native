import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import CreateCommunityPage from "./pages/CreateCommunityPage";
import CommunitiesPage from "./pages/CommunitiesPage";
import CommunityPage from "./pages/CommunityPage";
import EditPostPage from "./pages/EditPostPage";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="bg-black text-gray-100 transition-opacity duration-700 pt-10 flex flex-col min-h-screen">
      <header><Navbar /></header>
      <main className="max-w-5xl container mx-auto px-4 pb-6 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:postId" element={<EditPostPage />} />
          <Route path="/community/create" element={<CreateCommunityPage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/community/:id" element={<CommunityPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;