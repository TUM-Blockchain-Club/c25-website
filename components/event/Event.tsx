"use client";

import { Text } from "@/components/text";
import classNames from "classnames";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
import { Button } from "../button";

interface EventModel {
  title: string;
  image: string;
  description: string;
  startTime: string;
  endTime: string;
  link: string;
}

type EventElement = React.ElementRef<"div">;
export type EventProps = React.ComponentPropsWithoutRef<"div"> & EventModel;

export const Event = React.forwardRef<EventElement, EventProps>(
  (props, ref) => {
    const {
      className,
      image,
      title,
      description,
      startTime,
      endTime,
      link,
      ...restProps
    } = props;

    const start = new Date(startTime);
    const end = new Date(endTime);
    const sameDay =
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate();

    const berlinDateOptions: Intl.DateTimeFormatOptions = {
      timeZone: "Europe/Berlin",
      weekday: "long",
      month: "long",
      day: "numeric",
    };

    const berlinDateTimeOptions: Intl.DateTimeFormatOptions = {
      timeZone: "Europe/Berlin",
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const berlinTimeOptions: Intl.DateTimeFormatOptions = {
      timeZone: "Europe/Berlin",
      hour: "2-digit",
      minute: "2-digit",
    };

    // Determine if the given date is in Berlin daylight saving time
    const isBerlinDST = (date: Date): boolean => {
      const year = date.getUTCFullYear();

      // DST starts: last Sunday of March at 01:00 UTC
      const lastDayOfMarch = new Date(Date.UTC(year, 3, 0));
      const lastSundayOfMarchDate =
        lastDayOfMarch.getUTCDate() - lastDayOfMarch.getUTCDay();
      const dstStartUTC = new Date(
        Date.UTC(year, 2, lastSundayOfMarchDate, 1, 0, 0),
      );

      // DST ends: last Sunday of October at 01:00 UTC
      const lastDayOfOctober = new Date(Date.UTC(year, 10, 0));
      const lastSundayOfOctoberDate =
        lastDayOfOctober.getUTCDate() - lastDayOfOctober.getUTCDay();
      const dstEndUTC = new Date(
        Date.UTC(year, 9, lastSundayOfOctoberDate, 1, 0, 0),
      );

      return (
        date.getTime() >= dstStartUTC.getTime() &&
        date.getTime() < dstEndUTC.getTime()
      );
    };

    const tzLabel = isBerlinDST(start) ? "CEST" : "CET";

    const dateDisplay = sameDay
      ? `${start.toLocaleDateString(undefined, berlinDateOptions)} | ${start.toLocaleTimeString([], berlinTimeOptions)} - ${end.toLocaleTimeString([], berlinTimeOptions)} ${tzLabel}`
      : `${start.toLocaleString(undefined, berlinDateTimeOptions)} - ${end.toLocaleString(undefined, berlinDateTimeOptions)} ${tzLabel}`;

    return (
      <div
        className={classNames(
          className,
          "flex flex-col border border-white p-6 hover:scale-[102%] duration-500 ease-in-out overflow-hidden rounded-none",
        )}
        ref={ref}
        {...restProps}
      >
        <div className="relative w-full aspect-square overflow-hidden rounded-none">
          <Image
            className={"object-cover"}
            src={image}
            alt={title}
            title={title}
            fill
          />
        </div>
        <Text textType={"sub_title"} as="p" className="mt-6 line-clamp-2">
          {title}
        </Text>
        <Text className="mt-2 underline truncate" textType={"small"} as="p">
          {dateDisplay}
        </Text>
        <Text
          className="mt-2 text-gray-400 line-clamp-3"
          textType={"small"}
          as="p"
        >
          {description}
        </Text>
        <NextLink
          className="mt-auto"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="mt-4" buttonType={"cta"}>
            Learn More
          </Button>
        </NextLink>
      </div>
    );
  },
);
Event.displayName = "Event";
