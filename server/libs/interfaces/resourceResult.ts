export interface ResourceResult {
  websites: Partial<WebsiteResource>[];
  images: Partial<ImageResource>[];
  videos: Partial<VideoResource>[];
}

export interface WebsiteResource {
  id: string;
  user_id: string;
  user_name: string;
  tweet: string;
  website_url: string;
}

export interface TwitterImageResource extends ImageResource {
  user_id: string;
  user_name: string;
  tweet: string;
}

export interface FlickrImageResource extends ImageResource {
  user_name: string;
  title: string;
  describe: string;
  tags: string[];
  latitude: number | undefined;
  longitude: number | undefined;
  accuracy: number;
}

export interface GoogleImageResource extends ImageResource {
  relation_id: string;
  website_name: string;
  title: string;
  describe: string;
}

export interface ImageResource {
  id: string;
  website_url: string;
  image_url: string;
}

export interface VideoResource {
  videos: VideoMetum[];
}

export interface TwitterVideoResource extends VideoResource {
  id: string;
  user_id: string;
  user_name: string;
  tweet: string;
  website_url: string;
  duration_millis: number;
  thumbnail_image_url: string;
}

export interface NiconicoVideoResource extends VideoResource {
  id: string;
  title: string;
  description: string;
  duration_millis: number;
  thumbnail_image_url: string;
  posted_date_time: number;
  should_attach_cookie_value: string | undefined;
}

export interface VideoMetum {
  url: string;
  bitrate?: number;
}
