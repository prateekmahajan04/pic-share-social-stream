import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostCardProps {
  id: string;
  username: string;
  userAvatar?: string;
  image: string;
  caption: string;
  likes: number;
  timestamp: string;
  isLiked?: boolean;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
}

export const PostCard = ({
  id,
  username,
  userAvatar,
  image,
  caption,
  likes,
  timestamp,
  isLiked = false,
  onLike,
  onComment,
}: PostCardProps) => {
  return (
    <Card className="w-full max-w-md mx-auto bg-card shadow-soft border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar} alt={username} />
            <AvatarFallback className="bg-gradient-instagram text-white">
              {username[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm">{username}</span>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Image */}
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image}
          alt={caption}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike?.(id)}
              className={`p-0 h-auto hover:bg-transparent ${
                isLiked ? "text-red-500" : ""
              }`}
            >
              <Heart
                className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onComment?.(id)}
              className="p-0 h-auto hover:bg-transparent"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto hover:bg-transparent"
            >
              <Share className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Likes */}
        <div className="mb-2">
          <span className="font-semibold text-sm">{likes} likes</span>
        </div>

        {/* Caption */}
        <div className="text-sm">
          <span className="font-semibold mr-2">{username}</span>
          <span>{caption}</span>
        </div>

        {/* Timestamp */}
        <div className="mt-2">
          <span className="text-muted-foreground text-xs uppercase">
            {timestamp}
          </span>
        </div>
      </div>
    </Card>
  );
};