"use client";

import * as Select from "@/components/select/Select";
import { Session as SessionComponent } from "@/components/session";
import { Text } from "@/components/text";
import { Toggle } from "@/components/toggle";
// import { Session, Stages, Tracks } from "@/model/session";
import * as Separator from "@radix-ui/react-separator";
import classNames from "classnames";
import React, { useState } from "react";
import {
  Session,
  Stages,
  Tracks,
  Speaker,
} from "@/components/service/contentStrapi_static";

type AgendaProps = { sessions: Session[]; speakers: Speaker[] };

export const Agenda: React.FC<AgendaProps> = ({ sessions, speakers }) => {
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [dayFilter, setDayFilter] = useState<Date>();
  const [trackFilter, setTrackFilter] = useState<Session["track"] & "all">();
  const [stageFilter, setStageFilter] = useState<Session["room"] & "all">();

  const stageDisplayNames: Record<string, string> = {
    "Stage 1": "Turing Stage",
    "Stage 2": "Hopper Stage",
    "Stage 3": "Nakamoto Stage",
    "Stage 4": "Lovelace Room",
  };

  function isSameDay(d1: Date, d2: Date) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  let filteredSessions = null;

  if (sessions) {
    filteredSessions = sessions.filter((item) => {
      const matchesDay =
        !dayFilter || isSameDay(dayFilter, new Date(item.startTime));
      const matchesTrack =
        trackFilter === "all" || !trackFilter || trackFilter === item.track;
      const matchesStage =
        stageFilter === "all" || !stageFilter || stageFilter === item.room;
      const matchesTitle =
        !titleFilter.trim() ||
        item.title.toLowerCase().includes(titleFilter.trim().toLowerCase());

      return matchesDay && matchesTrack && matchesStage && matchesTitle;
    });
  }

  return (
    <div className={"flex flex-col md:flex-row relative gap-8 mt-20"}>
      <div
        id="filter"
        className="bg-black md:sticky md:top-24 border border-white rounded-[5px] p-6 md:min-w-[250px] flex flex-col gap-4 md:gap-6 h-fit"
      >
        <Text textType={"sub_title"} className="text-left" as="p">
          Filter
        </Text>
        <div className="flex flex-col gap-2">
          <Text textType={"paragraph"} className="font-bold text-left" as="p">
            Title
          </Text>
          <input
            type="text"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            placeholder="Search agenda titles..."
            className="w-full rounded-lg text-white border py-2 px-3 bg-black placeholder-gray-500"
          />
        </div>
        <div className="flex flex-col gap-3 h-fit">
          <Text textType={"paragraph"} className="font-bold text-left" as="p">
            Days
          </Text>
          <div className="flex flex-row md:flex-col gap-2">
            {[new Date("2025-09-11"), new Date("2025-09-12")].map(
              (date, index) => (
                <Toggle
                  onClick={() =>
                    dayFilter !== undefined && isSameDay(dayFilter, date)
                      ? setDayFilter(undefined)
                      : setDayFilter(date)
                  }
                  pressed={
                    dayFilter !== undefined && isSameDay(dayFilter, date)
                  }
                  className="rounded-[5px] py-2 w-fit md:w-full w-full rounded-lg text-white border py-2 px-3"
                  key={index}
                >
                  <Text
                    textType={"small"}
                    className="!text-inherit text-center"
                    as="p"
                  >
                    {date.toLocaleDateString("en-DE", {
                      weekday: "long",
                      timeZone: "Europe/Berlin",
                    })}
                    <span className="hidden md:inline">
                      ,{" "}
                      {date.toLocaleDateString("en-DE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        timeZone: "Europe/Berlin",
                      })}
                    </span>
                  </Text>
                </Toggle>
              ),
            )}
          </div>
        </div>
        <div className="flex flex-row gap-6 md:flex-col w-full">
          <div className="flex flex-col gap-3">
            <Text textType={"paragraph"} className="font-bold text-left" as="p">
              Stages
            </Text>
            <div className="flex md:flex-col flex-wrap gap-2">
              <Select.Root
                onValueChange={(value: (typeof Stages)[number] & "all") => {
                  setStageFilter(value);
                }}
              >
                <Select.Trigger
                  placeholder={"Any Stage"}
                  className="w-full rounded-lg text-white border py-2 px-3"
                />
                <Select.Content>
                  <Select.Item value={"all"}>Any Stage</Select.Item>
                  {Stages.map((stage, index) => (
                    <Select.Item value={stage} key={index}>
                      {stageDisplayNames[stage] || stage}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Text textType={"paragraph"} className="font-bold text-left" as="p">
              Tracks
            </Text>
            <div className="flex md:flex-col flex-wrap gap-2">
              <Select.Root
                onValueChange={(value: (typeof Tracks)[number] & "all") => {
                  setTrackFilter(value);
                }}
              >
                <Select.Trigger
                  placeholder={"Any Track"}
                  className="w-full rounded-lg text-white border py-2 px-3"
                />
                <Select.Content>
                  <Select.Item value="all">Any Track</Select.Item>
                  {Tracks.map((track, index) => (
                    <Select.Item
                      value={track}
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <span
                        className={classNames(
                          "inline-block w-3 h-3 rounded-full mr-2",
                          track === "Education" && "bg-green-400",
                          track === "Research" && "bg-yellow-400",
                          track === "Ecosystem" && "bg-blue-400",
                          track === "Regulation" && "bg-red-400",
                          // track === "Academic" && "bg-purple-400",
                          track === "Application" && "bg-teal-400",
                        )}
                      />
                      {track}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>
          </div>
        </div>
      </div>
      <div id="sessions" className="flex w-full flex-col gap-y-4">
        <div className="flex w-full flex-col items-center md:items-start">
          {filteredSessions?.map((item, index) => {
            // --- Warnings if Strapi data is missing ---
            if (!item.title) {
              console.warn(
                `⚠️ Session at index ${index} is missing a title`,
                item,
              );
            }
            if (!item.startTime || !item.endTime) {
              console.warn(
                `⚠️ Session "${item.title ?? "?"}" has no start or end time`,
                item,
              );
            }
            if (!item.room) {
              console.warn(
                `⚠️ Session "${item.title ?? "?"}" has no room assigned`,
                item,
              );
            }
            if (!item.track) {
              console.warn(
                `⚠️ Session "${item.title ?? "?"}" has no track assigned`,
                item,
              );
            }
            if (!item.speakers || Object.keys(item.speakers).length === 0) {
              console.warn(
                `⚠️ Session "${item.title ?? "?"}" has no speakers`,
                item,
              );
            }
            // -----------------------------------------

            return (
              <React.Fragment key={index}>
                {
                  // Divider between days
                  index > 0 &&
                    new Date(filteredSessions[index - 1].startTime).getDate() <
                      new Date(item.startTime).getDate() && (
                      <Separator.Root
                        attr-text={new Date(item.startTime).toLocaleDateString(
                          "en-DE",
                          {
                            weekday: "long",
                            timeZone: "Europe/Berlin",
                          },
                        )}
                        className={classNames(
                          "h-px my-16 bg-gradient-tbc w-full text-center overflow-visible",
                          "after:bg-black after:px-4 after:relative after:-top-[0.75em]",
                          "after:content-[attr(attr-text)]",
                        )}
                      />
                    )
                }
                <SessionComponent session={item} speakers={speakers} />
              </React.Fragment>
            );
          })}

          {filteredSessions?.length === 0 && (
            <Text className="text-gray-500">
              There is no session with that filter :(
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};
Agenda.displayName = "Agenda";

export default Agenda;
