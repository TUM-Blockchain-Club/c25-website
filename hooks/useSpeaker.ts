import Speaker from "@/model/speaker";

export const findAssetURL = (
  assetsArray: any[],
  assetId: string,
): string | undefined => {
  const asset = assetsArray.find((assetObj) => assetObj.sys.id == assetId);

  return asset ? `https:${asset.fields.file.url}` : undefined;
};

export const useSpeaker = async (count?: number): Promise<Speaker[]> => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID!;
  const environment = process.env.CONTENTFUL_ENV!;
  const url = new URL(
    `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries`,
  );

  let speakers: Speaker[] = [];
  let skipCounter = 0;
  let hasMoreItems = true;

  do {
    url.search = new URLSearchParams({
      content_type: "speaker",
      access_token: process.env.CONTENTFUL_ACCESS_TOKEN!,
      order: "fields.priority,fields.name",
      skip: skipCounter + "",
      ...(count && { limit: count + "" }),
    }).toString();

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: process.env.CONTENTFUL_ACCESS_TOKEN!,
      },
    });

    const jsonRes = await res.json();
    const { total } = jsonRes;
    const items = jsonRes.items || [];

    if (items.length === 0) {
      // No more items to fetch
      hasMoreItems = false;
      break;
    }

    speakers = speakers.concat(
      items.map((item: any): Speaker => {
        return {
          name: item.fields.name,
          description: item.fields.description,
          profilePhoto: findAssetURL(
            jsonRes.includes.Asset,
            item.fields.profilePhoto.sys.id,
          ),
          url: item.fields.url,
          urlType: item.fields.urlType,
          priority: item.fields.priority,
        };
      }),
    );

    // Stop iterating if we've reached the requested count
    if (count && speakers.length >= count) {
      hasMoreItems = false;
    } else if (skipCounter + items.length >= total) {
      // We've fetched all available items
      hasMoreItems = false;
    } else {
      console.log("Paginating speaker");
      skipCounter += 100;
    }
  } while (hasMoreItems);

  if (!speakers) {
    console.warn("Speakers is undefined");
  }

  return speakers ?? [];
};
