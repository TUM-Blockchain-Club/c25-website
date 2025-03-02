"use client";

import { Text } from "@/components/text";
import { AspectRatioIcon } from "@radix-ui/react-icons";

const Video = () => {
  return (
    <>
      {/* <div className="relative w-full flex justify-end items-center overflow-visible">
        <div className="relative w-full mr-[4vh] max-w-[100vw] xl:max-w-[50vw] sm:max-w-[30vw] min-h-[10px] text-right">
          <p className="text-xs sm:text-base">
            <Text>Knowledge Partner</Text>
            <br />
            <b>
              <Text>IEEE Blockchain</Text>
            </b>
          </p>
        </div>
      </div> */}
      <section className="w-full flex flex-col lg:flex-row justify-center items-center lg:mt-[-125px]">
        <div
          className="w-full relative justify-center"
          style={{ maxWidth: "560px", aspectRatio: "16 / 9" }}
        >
          <iframe
            src="https://www.youtube-nocookie.com/embed/YNVbWTAIjl8?si=FeS9M4Yrm7zWdwuR"
            title="YouTube video player"
            className="w-full h-full glow cta-border"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default Video;
