import axios from "axios";
import fs from "fs";
import path from "path";

//  {
//     title: "AI, Privacy & DePin in Web3",
//     url: "pre-event",
//     subpage: false,
//     description:
//       'Ready to kick off the TUM Blockchain Conference 2024 with a bang? Join us at our lively pre-event, "AI, Privacy & DePin in Web3" September 11th at Wayra Germany in the heart of Munich for an evening filled with insightful discussions, networking, and a whole lot of heartfelt welcome vibes.',
//     link: "https://lu.ma/v24yqx2q",
//     date: "Wednesday, September 11 | 18:00 - 21:00",
//     backgroundImg: "/side-events/pre-event.jpg",
//   },

export interface SideEventItem {
  title: string;
  url: string;
  subpage: boolean;
  description: string;
  link: string;
  date: string;
  backgroundImg: string;
}

export interface SpeakerItem {
  name: string;
  profile_photo: string;
  description: string;
  company_name: string;
  url: string;
  priority: number;
}

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

export default Speaker;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchSpeakers = async (): Promise<Speaker[]> => {
  const speakers: Speaker[] = [];
  let hasMore = true;
  let page = 1;

  do {
    const res = await axios.get(
      `https://strapi.rbg.tum-blockchain.com/api/speakers?sort=name:asc&pagination[page]=${page}&pagination[pageSize]=25&populate=profile_photo`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      },
    );

    speakers.push(...res.data.data);
    hasMore =
      res.data.meta.pagination.page < res.data.meta.pagination.pageCount;
    page = page + 1;

    for (const speaker of res.data.data) {
      await downloadProfilePicture(speaker);
      delay(500);
    }
    console.log(`Fetched ${speakers.length} speakers so far...`);
  } while (hasMore);

  return speakers;
};

const downloadProfilePicture = async (speaker: Speaker) => {
  if (!speaker.profile_photo || !speaker.profile_photo.url) {
    console.warn(`No profile photo for speaker: ${speaker.name}`);
    return;
  }

  try {
    const speakerDir = path.join(process.cwd(), "public", "speakers2");
    if (!fs.existsSync(speakerDir)) {
      fs.mkdirSync(speakerDir, { recursive: true });
    }

    const ext = speaker.profile_photo.ext || ".webp";
    const fileName = `${speaker.documentId}${ext}`;
    const filePath = path.join(speakerDir, fileName);
    const filePublicUrl = `/speakers2/${fileName}`;

    if (!fs.existsSync(filePath)) {
      const res = await axios({
        url:
          "https://strapi.rbg.tum-blockchain.com" + speaker.profile_photo.url,
        method: "GET",
        responseType: "stream",
      });

      const writer = fs.createWriteStream(filePath);
      res.data.pipe(writer);

      await new Promise<void>((resolve, reject) => {
        writer.on("finish", () => resolve());
        writer.on("error", reject);
      });
      console.log(
        `Downloaded profile picture for ${speaker.name} to ${filePath}`,
      );

      const publicUrl = `/speakers2/${fileName}`;
      speaker.profile_photo.url = publicUrl;
    } else {
      // console.log(`Profile picture for ${speaker.name} already exists at ${filePath}`);
      speaker.profile_photo.url = `/speakers2/${fileName}`;
    }
  } catch (error) {
    console.error(
      `Error downloading profile picture for ${speaker.name}:`,
      error,
    );
  }
};
