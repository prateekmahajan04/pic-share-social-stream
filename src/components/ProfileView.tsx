import { Settings, Grid, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Post {
  id: string;
  image: string;
  likes: number;
}

interface ProfileViewProps {
  username: string;
  userAvatar?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  bio?: string;
  posts: Post[];
  isOwnProfile?: boolean;
}

export const ProfileView = ({
  username,
  userAvatar,
  postsCount,
  followersCount,
  followingCount,
  bio,
  posts,
  isOwnProfile = false,
}: ProfileViewProps) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
        <Avatar className="h-32 w-32 md:h-40 md:w-40">
          <AvatarImage src={userAvatar} alt={username} />
          <AvatarFallback className="bg-gradient-instagram text-white text-4xl">
            {username[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <h1 className="text-xl font-light">{username}</h1>
            {isOwnProfile ? (
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <Button size="sm" className="bg-gradient-instagram text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Follow
              </Button>
            )}
          </div>

          <div className="flex justify-center md:justify-start gap-8 mb-4">
            <div className="text-center">
              <div className="font-semibold">{postsCount}</div>
              <div className="text-muted-foreground text-sm">posts</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{followersCount}</div>
              <div className="text-muted-foreground text-sm">followers</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{followingCount}</div>
              <div className="text-muted-foreground text-sm">following</div>
            </div>
          </div>

          {bio && (
            <div className="text-sm max-w-md">
              <p>{bio}</p>
            </div>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Grid className="h-4 w-4" />
          <span className="text-sm font-medium uppercase tracking-wide">
            Posts
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 border-2 border-muted-foreground rounded-full flex items-center justify-center">
              <Grid className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-light mb-2">No Posts Yet</h3>
            <p className="text-muted-foreground">
              {isOwnProfile
                ? "Share your first photo"
                : `${username} hasn't shared any photos yet`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="aspect-square relative group cursor-pointer overflow-hidden rounded-sm"
              >
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white font-semibold">
                    ♥ {post.likes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};