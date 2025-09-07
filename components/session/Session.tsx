"use client";

import { Button } from "@/components/button";
import { Text } from "@/components/text";
import {
  Session as SessionModel,
  Speaker,
} from "@/components/service/contentStrapi_static";
import { ClockIcon, SewingPinIcon } from "@radix-ui/react-icons";

import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useLayoutEffect } from "react";
import { contentfulImageLoader } from "@/util/contentfulImageLoader";
import { Clock, MapPin } from "lucide-react";
export type SessionElement = React.ElementRef<"div">;
export type SessionProps = React.ComponentPropsWithoutRef<"div"> & {
  session: SessionModel;
  speakers: Speaker[];
};

export const Session = React.forwardRef<SessionElement, SessionProps>(
  (props, ref) => {
    const { session, speakers, className, ...divProps } = props;
    const [clamped, setClamped] = useState<boolean>(true);
    const [isLineClampClamped, setIsLineClampClamped] =
      useState<boolean>(false);
    const lineClampRef = useRef<HTMLParagraphElement>(null);

    const { startTime, endTime } = {
      startTime: new Date(session.startTime),
      endTime: new Date(session.endTime),
    };

    const LINES = 3; // number of lines to clamp to

    useLayoutEffect(() => {
      const measure = () => {
        const el = lineClampRef.current;
        if (!el) return;

        // remember whether the clamp class is applied
        const hadClamp = el.classList.contains(`line-clamp-${LINES}`);

        // temporarily disable clamping to get the real height
        el.classList.remove(`line-clamp-${LINES}`);
        el.classList.add("line-clamp-none");

        const cs = window.getComputedStyle(el);
        const lineHeight = parseFloat(cs.lineHeight);
        const fullHeight = el.getBoundingClientRect().height;
        const maxHeight = lineHeight * LINES;

        // restore original class
        el.classList.remove("line-clamp-none");
        if (hadClamp) el.classList.add(`line-clamp-${LINES}`);

        setIsLineClampClamped(fullHeight > maxHeight + 0.5);
      };

      // measure now and on the next frame (in case layout settles)
      measure();
      const raf = requestAnimationFrame(measure);

      const onResize = () => measure();
      window.addEventListener("resize", onResize);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
      };
    }, []);

    const speakerMap = new Map(
      speakers.map((sp) => [sp.name.toLowerCase().trim(), sp]),
    );

    return (
      <div
        {...divProps}
        className={classNames(
          className,
          "border w-full flex p-4 flex-col gap-4 bg-gradient-to-b bg-opacity-60 from-black from-0% via-black via-30% ",
          {
            "to-[#06b6d4]/40 to-100%": session.track === "Application", // Cyan
            "to-[#1e3a8a]/40 to-100%": session.track === "Ecosystem", // Blue
            "to-[#15803d]/40 to-100%": session.track === "Education", // Green
            "to-[#7a6a00]/50 to-100%": session.track === "Research", // Olive / brass
            "to-[#b91c1c]/40 to-100%": session.track === "Regulation", // Red
            "to-[#7c3aed]/30 to-100%": session.track === "Workshop", // Purple
            "to-[#f97316]/30 to-100%": session.track === "Academic Forum", // Orange
          },
        )}
        ref={ref}
      >
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col md:flex-row justify-between w-full gap-1">
            <div
              className={classNames("flex-grow w-full", {
                "md:max-w-[450px]": !session.isSpecialSession,
                "md:max-w-[400px]": session.isSpecialSession,
              })}
            >
              <Text
                textType={"sub_title"}
                as={"p"}
                className="text-wrap w-full"
              >
                {session.title}
              </Text>
            </div>
            <div className="grid grid-cols-2 min-h-fit gap-2 h-fit text-center w-[240px] justify-end">
              {session.isSpecialSession && (
                <div className="rounded-[5px] min-w-fit border h-fit">
                  <Text textType={"small"} className="text-white">
                    Keynote
                  </Text>
                </div>
              )}
              {session.type && (
                <div className="rounded-[5px] border h-fit">
                  <Text textType={"small"} className="text-white">
                    {session.type}
                  </Text>
                </div>
              )}
              {session.track && (
                <div
                  className={classNames(
                    "border rounded-[5px] h-fit col-start-2",
                    {
                      "border-[#22d3ee]": session.track === "Application", // Lighter cyan
                      "border-[#60a5fa]": session.track === "Ecosystem", // Lighter blue
                      "border-[#4ade80]": session.track === "Education", // Lighter green
                      "border-[#fde047]": session.track === "Research", // Lighter yellow
                      "border-[#f87171]": session.track === "Regulation", // Lighter red
                      "border-[#c4b5fd]": session.track === "Workshop", // Lighter purple
                      "border-[#fdba74]": session.track === "Academic Forum", // Lighter orange
                      "gradient-border": session.track === "TBC'25", // Gradient for TBC
                    },
                  )}
                >
                  <Text
                    textType={"small"}
                    className={classNames({
                      "text-[#22d3ee]": session.track === "Application", // Lighter cyan
                      "text-[#60a5fa]": session.track === "Ecosystem", // Lighter blue
                      "text-[#4ade80]": session.track === "Education", // Lighter green
                      "text-[#fde047]": session.track === "Research", // Lighter yellow
                      "text-[#f87171]": session.track === "Regulation", // Lighter red
                      "text-[#c4b5fd]": session.track === "Workshop", // Lighter purple
                      "text-[#fdba74]": session.track === "Academic Forum", // Lighter orange
                    })}
                  >
                    {session.track}
                  </Text>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-x-8 flex-col md:flex-row">
            <div className="flex items-center gap-1">
              <MapPin className="text-white" />
              <Text>
                {session.room === "Stage 1"
                  ? "Turing Stage"
                  : session.room === "Stage 2"
                    ? "Hopper Stage"
                    : session.room === "Stage 3"
                      ? "Nakamoto Stage"
                      : session.room === "Workshop Room"
                        ? "Lovelace Room"
                        : session.room}
              </Text>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="text-white" />
              <Text>
                {startTime.toLocaleDateString("en-DE", {
                  weekday: "short",
                  timeZone: "Europe/Berlin",
                })}
                ,{" "}
                {startTime.toLocaleTimeString("en-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "Europe/Berlin",
                })}{" "}
                -{" "}
                {endTime.toLocaleTimeString("en-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "Europe/Berlin",
                  timeZoneName: "short",
                })}
              </Text>
            </div>
            <div>
              {/* <svg // Here is the Bell
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="text-white cursor-pointer select-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={() => setActive(!active)}
              >
                {active && (
                  <path
                    d="M6 9a6 6 0 0 1 12 0c0 3.93 1.02 5.3 2.28 6.62A1 1 0 0 1 20 17H4a1 1 0 0 1-.28-1.38C5.02 14.3 6 12.93 6 9Z"
                    fill="currentColor"
                  />
                )}
                <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
              </svg> */}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col text-wrap">
          <Text
            ref={lineClampRef}
            className={classNames("w-full text-wrap", {
              "line-clamp-3": clamped,
              "line-clamp-none": !clamped,
            })}
          >
            {session.description}
          </Text>
          {isLineClampClamped && (
            <Text
              onClick={() => setClamped(!clamped)}
              className={classNames("cursor-pointer", {
                "text-green-400": session.track === "Education",
                "text-yellow-400":
                  session.track === "Research" || !session.track,
                "text-blue-400": session.track === "Ecosystem",
                "text-orange-400": session.track === "Research",
                "text-red-400": session.track === "Regulation",
                "text-[#E9D5FF]": session.track === "Workshop",
                "text-teal-400": session.track === "Application",
              })}
            >
              {clamped ? "Show More" : "Show Less"}
            </Text>
          )}
          {session.registrationLink && (
            <div className="mt-5 mb-4">
              <Button asChild>
                <Link
                  href={session.registrationLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Register for Workshop
                </Link>
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div>
            Speaker
            {session.speakers &&
              Object.keys(session.speakers).length > 1 &&
              "s"}
            :
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {session.speakers && Object.keys(session.speakers).length > 0 ? (
              Object.values(session.speakers).map((name, index) => {
                const details = speakerMap.get(name.toLowerCase().trim());

                return (
                  <div className="flex gap-3 items-center" key={index}>
                    {/* Show profile photo if found */}
                    {details?.profile_photo && (
                      <Link href={details.url || "#"}>
                        <Image
                          src={details.profile_photo?.url || ""}
                          loader={contentfulImageLoader}
                          alt={details.name}
                          width={60}
                          height={60}
                          className="rounded-full object-cover"
                          quality={100}
                        />
                      </Link>
                    )}
                    <div className="flex flex-col max-w-[200px]">
                      <Text className="font-medium leading-tight">
                        {details?.name || name}
                      </Text>
                      {details?.position && (
                        <Text
                          textType="small"
                          className="text-gray-300 leading-snug"
                        >
                          {details.position}
                          {details.company_name
                            ? `, ${details.company_name}`
                            : ""}
                        </Text>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <Text>Coming soon...</Text>
            )}
          </div>
        </div>
      </div>
    );
  },
);
Session.displayName = "Session";

export default Session;
