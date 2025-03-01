import Speaker from "@/model/speaker";

export const findAssetURL = (
  assetsArray: any[],
  assetId: string,
): string | undefined => {
  const asset = assetsArray.find((assetObj) => assetObj.sys.id == assetId);

  return asset ? `https:${asset.fields.file.url}` : undefined;
};

export const useSpeaker = async (count?: number): Promise<Speaker[]> => {
  // const spaceId = process.env.CONTENTFUL_SPACE_ID!;
  // const environment = process.env.CONTENTFUL_ENV!;
  // const url = new URL(
  //   `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries`,
  // );

  let speakers: Speaker[] = [];
  let skipCounter = 0;

  // Short circuit for now
  return [
    {
      name: "Vitalik Buterin",
      description: "Co-founder of Ethereum",
      profilePhoto:
        "https://ui-avatars.com/api/?name=Vitalik+Buterin&background=0D8ABC&color=fff&size=256",
      url: "https://twitter.com/VitalikButerin",
      urlType: "x",
      priority: 1,
    },
    {
      name: "Elizabeth Stark",
      description: "CEO and co-founder of Lightning Labs",
      profilePhoto:
        "https://ui-avatars.com/api/?name=Elizabeth+Stark&background=F06292&color=fff&size=256",
      url: "https://twitter.com/starkness",
      urlType: "x",
      priority: 2,
    },
    {
      name: "Brian Armstrong",
      description: "CEO and co-founder of Coinbase",
      profilePhoto:
        "https://ui-avatars.com/api/?name=Brian+Armstrong&background=43A047&color=fff&size=256",
      url: "https://www.coinbase.com",
      urlType: "website",
      priority: 3,
    },
    {
      name: "Gavin Wood",
      description: "Co-founder of Ethereum and creator of Polkadot",
      profilePhoto:
        "https://ui-avatars.com/api/?name=Gavin+Wood&background=7B1FA2&color=fff&size=256",
      url: "https://github.com/gavofyork",
      urlType: "github",
      priority: 4,
    },
    {
      name: "Meltem Demirors",
      description: "Chief Strategy Officer at CoinShares",
      profilePhoto:
        "https://ui-avatars.com/api/?name=Meltem+Demirors&background=FF5722&color=fff&size=256",
      url: "https://www.linkedin.com/in/melemdemirors",
      urlType: "linkedin",
      priority: 5,
    },
    {
      name: "Charles Hoskinson",
      description: "Founder of Cardano and co-founder of Ethereum",
      profilePhoto:
        "https://ui-avatars.com/api/?name=Charles+Hoskinson&background=3F51B5&color=fff&size=256",
      url: "https://twitter.com/IOHK_Charles",
      urlType: "x",
      priority: 6,
    },
    {
      name: "Joseph Lubin",
      description: "Co-founder of Ethereum and founder of ConsenSys",
      profilePhoto:
        "https://ui-avatars.com/api/?name=Joseph+Lubin&background=5D4037&color=fff&size=256",
      url: "https://www.linkedin.com/in/joseph-lubin-48199b138",
      urlType: "linkedin",
      priority: 7,
    },
    {
      name: "Changpeng Zhao",
      description: "Founder and CEO of Binance",
      profilePhoto:
        "https://ui-avatars.com/api/?name=Changpeng+Zhao&background=FFC107&color=000&size=256",
      url: "https://twitter.com/cz_binance",
      urlType: "x",
      priority: 8,
    },
    {
      name: "Kathleen Breitman",
      description: "Co-founder of Tezos",
      profilePhoto:
        "https://ui-avatars.com/api/?name=Kathleen+Breitman&background=9C27B0&color=fff&size=256",
      url: "https://github.com/kbiennow",
      urlType: "github",
      priority: 9,
    },
    {
      name: "Michael Saylor",
      description: "Executive Chairman of MicroStrategy and Bitcoin advocate",
      profilePhoto:
        "https://ui-avatars.com/api/?name=Michael+Saylor&background=607D8B&color=fff&size=256",
      url: "https://www.microstrategy.com",
      urlType: "website",
      priority: 10,
    },
    {
      name: "Yat Siu",
      description:
        "Co-founder and Executive Chairman of Animoca Brands, focusing on blockchain gaming and NFTs",
      profilePhoto:
        "https://ui-avatars.com/api/?name=Yat+Siu&background=009688&color=fff&size=256",
      url: "https://www.linkedin.com/in/yatsiu",
      urlType: "linkedin",
      priority: 11,
    },
    {
      name: "Silvio Micali",
      description: "Founder of Algorand and Turing Award-winning cryptographer",
      profilePhoto:
        "https://ui-avatars.com/api/?name=Silvio+Micali&background=795548&color=fff&size=256",
      url: "https://www.algorand.com",
      urlType: "website",
      priority: 12,
    },
  ];

  /**
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

    speakers = speakers.concat(
      jsonRes.items?.map((item: any): Speaker => {
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

    // Stop iterating if the current response count is not bounded by maximum (100)
    if (total === 0) {
      break;
    } else {
      console.log("Paginating speaker");
      skipCounter += 100;
    }
  } while (!count);

  if (!speakers) {
    console.log("Speakers is undefined");
  }

  return speakers ?? [];
  */
};
