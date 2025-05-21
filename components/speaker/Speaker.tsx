"use client";

import { Text } from "@/components/text";
import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { Speaker as SpeakerModel } from "@/components/service/contentStrapi";
import Link from "next/link";
import {
  GitHubLogoIcon,
  GlobeIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { createDeflate } from "zlib";

export const Speaker = React.forwardRef<HTMLDivElement, Speaker>(
  (
    {
      name,
      position,
      company_name,
      profile_photo,
      url,
      priority,
      createdAt,
      documentId,
      updatedAt,
      publishedAt,
      ...rest
    },
    ref,
  ) => {
    const urlType = (() => {
      if (url.includes("x.com") || url.includes("twitter.com")) return "x";
      if (url.includes("linkedin.com")) return "linkedin";
      if (url.includes("github.com")) return "github";
      return "website";
    })();

    return (
      <div
        className={classNames(
          rest.className,
          "flex w-[150px] xs:w-[180px] sm:w-[200px] min-h-[200px] xs:min-h-[270px] sm:min-h-[300px] flex-col gap-4 items-start shrink-0",
        )}
        ref={ref}
        {...rest}
      >
        <Image
          className={"object-cover"}
          src={profile_photo.url || "/speakers/placeholder.webp"}
          alt={name}
          title={name}
          width={275}
          height={275}
        />
        <div className={"flex flex-col gap-1 self-stretch"}>
          <Text textType={"sub_title"} className={"font-bold"}>
            {name}
          </Text>
          <Text textType={"paragraph"}>
            {position}, {company_name}
          </Text>
          {url && (
            <div className={"w-fit"}>
              <Link href={url} className={"text-inherit"}>
                {urlType === "x" && <TwitterLogoIcon />}
                {urlType === "website" && <GlobeIcon />}
                {urlType === "linkedin" && <LinkedInLogoIcon />}
                {urlType === "github" && <GitHubLogoIcon />}
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  },
);
Speaker.displayName = "Speaker";
