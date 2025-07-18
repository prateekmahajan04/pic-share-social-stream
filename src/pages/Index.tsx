import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { PostCard } from "@/components/PostCard";
import { CreatePost } from "@/components/CreatePost";
import { AuthForm } from "@/components/AuthForm";
import { ProfileView } from "@/components/ProfileView";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import samplePost1 from "@/assets/sample-post-1.jpg";
import samplePost2 from "@/assets/sample-post-2.jpg";
import samplePost3 from "@/assets/sample-post-3.jpg";

interface Post {
  id: string;
  username: string;
  userAvatar?: string;
  image: string;
  caption: string;
  likes: number;
  timestamp: string;
  isLiked: boolean;
}

interface User {
  username: string;
  email: string;
  avatar?: string;
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Sample posts data
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      username: "alex_photographer",
      image: samplePost1,
      caption: "Golden hour magic at the beach 🌅 #sunset #photography #nature",
      likes: 142,
      timestamp: "2 hours ago",
      isLiked: false,
    },
    {
      id: "2", 
      username: "coffee_enthusiast",
      image: samplePost2,
      caption: "Perfect latte art to start the morning ☕️ #coffee #lateart #morningvibes",
      likes: 89,
      timestamp: "4 hours ago",
      isLiked: true,
    },
    {
      id: "3",
      username: "bloom_daily",
      image: samplePost3,
      caption: "Fresh flowers bring life to any space 🌸 #flowers #home #decor",
      likes: 156,
      timestamp: "6 hours ago",
      isLiked: false,
    },
  ]);

  const handleAuth = (email: string, password: string, username?: string) => {
    const user: User = {
      email,
      username: username || email.split("@")[0],
    };
    setCurrentUser(user);
    setIsAuthenticated(true);
    toast({
      title: "Welcome!",
      description: `Successfully ${isLoginMode ? "signed in" : "created account"}`,
    });
  };

  const handleCreatePost = (image: string, caption: string) => {
    if (!currentUser) return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      image,
      caption,
      likes: 0,
      timestamp: "now",
      isLiked: false,
    };
    
    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
    setActiveTab("home");
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleTabChange = (tab: string) => {
    if (tab === "create") {
      setShowCreatePost(true);
    } else {
      setActiveTab(tab);
    }
  };

  const getUserPosts = () => {
    return posts.filter(post => post.username === currentUser?.username);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab("home");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  if (!isAuthenticated) {
    return (
      <AuthForm
        isLogin={isLoginMode}
        onToggleMode={() => setIsLoginMode(!isLoginMode)}
        onAuth={handleAuth}
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="max-w-md mx-auto space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                {...post}
                onLike={handleLike}
              />
            ))}
          </div>
        );

      case "search":
        return (
          <div className="max-w-2xl mx-auto p-4">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users, hashtags, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Search Instaclone</h3>
              <p className="text-muted-foreground">
                Find friends, explore hashtags, and discover new content
              </p>
            </div>
          </div>
        );

      case "activity":
        return (
          <div className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-semibold mb-6">Activity</h2>
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-muted-foreground rounded-full flex items-center justify-center">
                <span className="text-2xl">💜</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Activity updates</h3>
              <p className="text-muted-foreground">
                When someone likes or comments on your posts, you'll see it here
              </p>
            </div>
          </div>
        );

      case "profile":
        const userPosts = getUserPosts();
        return (
          <div className="relative">
            <ProfileView
              username={currentUser?.username || "user"}
              userAvatar={currentUser?.avatar}
              postsCount={userPosts.length}
              followersCount={124}
              followingCount={89}
              bio="📸 Capturing life's beautiful moments"
              posts={userPosts.map(post => ({
                id: post.id,
                image: post.image,
                likes: post.likes,
              }))}
              isOwnProfile={true}
            />
            {/* Hidden logout button for demo */}
            <button
              onClick={handleLogout}
              className="fixed top-4 right-4 text-xs text-muted-foreground hover:text-foreground"
            >
              Logout
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="pb-20 md:pb-0 md:ml-16 lg:ml-64 pt-4">
        {renderContent()}
      </main>

      {showCreatePost && (
        <CreatePost
          onClose={() => setShowCreatePost(false)}
          onPost={handleCreatePost}
        />
      )}
    </div>
  );
};

export default Index;
