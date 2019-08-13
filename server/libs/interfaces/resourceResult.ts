export interface ResourceResult{
  websites: Partial<WebsiteResource>[];
  images: Partial<ImageResource>[];
  videos: Partial<VideoResource>[];
}

export interface WebsiteResource{
  id: string;
  user_id: string;
  user_name: string;
  tweet: string;
  website_url: string;
}

export interface TwitterImageResource extends ImageResource{
  user_id: string;
  user_name: string;
  tweet: string;
}

export interface FlickrImageResource extends ImageResource{
    user_name: string;
    title: string;
    describe: string;
    tags: string[];
    latitude: number | undefined;
    longitude: number | undefined;
    accuracy: number;
}

export interface ImageResource{
  id: string;
  website_url: string;
  image_url: string;
}

export interface VideoResource{
  id: string;
  user_id: string;
  user_name: string;
  tweet: string;
  website_url: string;
  duration_millis: number;
  thumbnail_image_url: string;
  videos: Partial<VideoMetum>[];
}

export interface VideoMetum{
  url: string;
  bitrate: number;
}
