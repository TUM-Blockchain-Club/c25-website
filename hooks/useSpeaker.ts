import Speaker from "@/model/speaker";

export const findAssetURL = (
  assetsArray: any[],
  assetId: string,
): string | undefined => {
  if (!assetsArray || !assetId) {
    console.warn(`Missing assets array or asset ID: ${assetId}`);
    return undefined;
  }

  const asset = assetsArray.find((assetObj) => assetObj.sys.id == assetId);

  return asset ? `https:${asset.fields.file.url}` : undefined;
};

export const useSpeaker = async (count?: number): Promise<Speaker[]> => {
  try {
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    const environment = process.env.CONTENTFUL_ENV;
    const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

    if (!spaceId || !environment || !accessToken) {
      console.error("Missing required Contentful environment variables");
      return [];
    }

    const url = new URL(
      `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries`,
    );

    let speakers: Speaker[] = [];
    let skipCounter = 0;
    let hasMoreItems = true;
    let totalItems = 0;
    let requestCount = 0;

    console.info(`Fetching speakers${count ? ` (limit: ${count})` : ""}`);

    do {
      requestCount++;
      const params = {
        content_type: "speaker",
        access_token: accessToken,
        order: "fields.priority,fields.name",
        skip: skipCounter + "",
        ...(count && { limit: count + "" }),
      };

      url.search = new URLSearchParams(params).toString();

      console.info(`Speaker API request #${requestCount}: skip=${skipCounter}`);

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: accessToken,
          },
        });

        if (!res.ok) {
          console.error(`API error: ${res.status} ${res.statusText}`);
          break;
        }

        const jsonRes = await res.json();

        if (!jsonRes) {
          console.error("Invalid API response: empty or malformed JSON");
          break;
        }

        const { total } = jsonRes;
        totalItems = total || 0;
        const items = jsonRes.items || [];

        console.info(
          `Received ${items.length} speakers (total available: ${totalItems})`,
        );

        if (items.length === 0) {
          console.info("No more items to fetch");
          hasMoreItems = false;
          break;
        }

        const assets = jsonRes.includes?.Asset || [];
        if (assets.length === 0) {
          console.warn("No assets found in the response");
        }

        const newSpeakers = items
          .map((item: any): Speaker | null => {
            try {
              if (!item.fields) {
                console.warn(
                  `Speaker item is missing fields: ${JSON.stringify(item.sys)}`,
                );
                return null;
              }

              const {
                name,
                description,
                profilePhoto,
                url,
                urlType,
                priority,
              } = item.fields;

              if (!name) {
                console.warn(
                  `Speaker is missing name: ${JSON.stringify(item.sys)}`,
                );
              }

              if (!profilePhoto) {
                console.warn(
                  `Speaker "${name || "unknown"}" is missing profile photo`,
                );
              }

              const photoUrl = profilePhoto
                ? findAssetURL(assets, profilePhoto.sys.id)
                : undefined;

              return {
                name: name || "Unknown Speaker",
                description: description || "",
                profilePhoto: photoUrl,
                url: url || "",
                urlType: urlType || "",
                priority: priority || 999,
              };
            } catch (err) {
              console.error(
                `Error processing speaker data: ${err instanceof Error ? err.message : String(err)}`,
              );
              return null;
            }
          })
          .filter(Boolean) as Speaker[];

        speakers = speakers.concat(newSpeakers);

        // Stop iterating if we've reached the requested count
        if (count && speakers.length >= count) {
          console.info(`Reached requested count of ${count} speakers`);
          hasMoreItems = false;
        } else if (skipCounter + items.length >= totalItems) {
          console.info(`Fetched all available speakers (${totalItems})`);
          hasMoreItems = false;
        } else {
          console.info(
            `Paginating speakers, fetched ${speakers.length} so far`,
          );
          skipCounter += 100;
        }
      } catch (err) {
        console.error(
          `Error fetching speakers: ${err instanceof Error ? err.message : String(err)}`,
        );
        hasMoreItems = false;
      }
    } while (hasMoreItems);

    console.info(`Successfully fetched ${speakers.length} speakers`);
    return speakers;
  } catch (err) {
    console.error(
      `Fatal error in useSpeaker hook: ${err instanceof Error ? err.message : String(err)}`,
    );
    return [];
  }
};
