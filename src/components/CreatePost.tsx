import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CreatePostProps {
  onClose: () => void;
  onPost: (image: string, caption: string) => void;
}

export const CreatePost = ({ onClose, onPost }: CreatePostProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (!selectedImage || !caption.trim()) {
      toast({
        title: "Missing content",
        description: "Please add both an image and caption",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      onPost(selectedImage, caption);
      toast({
        title: "Post created!",
        description: "Your post has been shared successfully",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card shadow-large">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Create New Post</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {!selectedImage ? (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                Select an image to share
              </p>
              <Label htmlFor="image-upload">
                <Button variant="outline" asChild>
                  <span>Choose Image</span>
                </Button>
              </Label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  placeholder="Write a caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <Button
                onClick={handlePost}
                disabled={isUploading}
                className="w-full bg-gradient-instagram text-white"
              >
                {isUploading ? "Posting..." : "Share Post"}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};