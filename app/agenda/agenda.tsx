"use client";

import * as Select from "@/components/select/Select";
import { Session as SessionComponent } from "@/components/session";
import { Text } from "@/components/text";
import { Toggle } from "@/components/toggle";
import { Session, Stages, Tracks } from "@/model/session";
import * as Separator from "@radix-ui/react-separator";
import classNames from "classnames";
import React, { useState } from "react";

type AgendaProps = { sessions: Session[] };

export const Agenda: React.FC<AgendaProps> = ({ sessions }) => {
  const [dayFilter, setDayFilter] = useState<Date>();
  const [trackFilter, setTrackFilter] = useState<Session["track"] & "all">();
  const [stageFilter, setStageFilter] = useState<Session["room"] & "all">();

  function isSameDay(d1: Date, d2: Date) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  let filteredSessions = null;

  if (sessions) {
    filteredSessions = sessions.filter(
      (item) =>
        (!dayFilter || isSameDay(dayFilter, new Date(item.startTime))) &&
        (trackFilter === "all" || !trackFilter || trackFilter === item.track) &&
        (stageFilter === "all" || !stageFilter || stageFilter === item.room),
    );
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
                      {stage}
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
                          track === "Education Track" && "bg-green-400",
                          track === "Research Track" && "bg-yellow-400",
                          track === "Ecosystem Track" && "bg-blue-400",
                          track === "Regulation Track" && "bg-red-400",
                          track === "Academic Track" && "bg-purple-400",
                          track === "Application Track" && "bg-teal-400",
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
          {filteredSessions?.map((item, index) => (
            <>
              {
                // Add divider when there is they change
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
              <SessionComponent session={item} key={index} />
            </>
          ))}
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
