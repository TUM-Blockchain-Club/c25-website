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
    const dateDisplay = sameDay
      ? `${start.toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
        })} | ${start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      : `${start.toLocaleString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })} - ${end.toLocaleString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}`;

    return (
      <div
        className={classNames(
          className,
          "flex flex-col border border-white p-6 hover:scale-[102%] duration-500 ease-in-out overflow-hidden rounded-lg",
        )}
        {...restProps}
      >
        <div className="relative w-full aspect-square overflow-hidden rounded-md">
          <Image className={"object-cover"} src={image} alt={title} title={title} fill />
        </div>
        <Text textType={"sub_title"} as="p" className="mt-6 line-clamp-2">
          {title}
        </Text>
        <Text className="mt-2 underline truncate" textType={"small"} as="p">
          {dateDisplay}
        </Text>
        <Text className="mt-2 text-gray-400 line-clamp-3" textType={"small"} as="p">
          {description}
        </Text>
        <NextLink className="mt-auto" href={link} target="_blank" rel="noopener noreferrer">
          <Button className="mt-4" buttonType={"cta"}>
            Learn More
          </Button>
        </NextLink>
      </div>
    );
  },
);
Event.displayName = "Event";
