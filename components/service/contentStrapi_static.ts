import axios from "axios";

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface ProfilePicture {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    large: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
    [key: string]: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: never | null;
  createdat: string;
  updatedat: string;
  publishedat: string;
}

export interface Speaker {
  id: number;
  documentId: string;
  name: string;
  company_name: string;
  url: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  position: string;
  profile_photo?: ProfilePicture | null;
}

export const Tracks = [
  "Application",
  "Ecosystem",
  "Education",
  "Research",
  "Regulation",
  "Workshop",
  "TUM Blockchain Club",
  //   "Sub Events",
  //   "TUM Blockchain Club",
] as const;

export const Stages = [
  "Stage 1",
  "Stage 2",
  "Stage 3",
  "Workshop Room",
] as const;

export interface Session {
  id: number;
  documentId: string;
  title: string;
  track?: (typeof Tracks)[number] | null;
  type?: "Workshop" | "Panel Discussion" | "Talk" | null;
  startTime: string;
  endTime: string;
  room: (typeof Stages)[number];
  description?: string | null;
  speakers?: Record<string, string> | null;
  isSpecialSession?: boolean | null;
  registrationLink?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export const fetchSessions = async (): Promise<Session[]> => {
  const token = process.env.STRAPI_API_TOKEN;
  if (!token) {
    console.warn("STRAPI_API_TOKEN missing; returning empty sessions list");
    return [];
  }

  try {
    const sessions: Session[] = [];
    let hasMore = true;
    let page = 1;

    do {
      const res = await axios.get(
        `https://strapi.rbg.tum-blockchain.com/api/agenda-25s?sort=startTime:asc&pagination[page]=${page}&pagination[pageSize]=25`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const pageData: Session[] = res.data.data;
      sessions.push(...pageData);

      hasMore =
        res.data.meta.pagination.page < res.data.meta.pagination.pageCount;
      page++;
      console.log(`Fetched ${sessions.length} sessions so far...`);
    } while (hasMore);

    return sessions;
  } catch (err) {
    console.error("Error fetching sessions from Strapi:", err);
    return [];
  }
};
