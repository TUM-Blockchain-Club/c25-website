"use client";

import React from "react";
import { Event } from "./Event";

export interface SideEventItem {
  title: string;
  description: string;
  image: string;
  startTime: string;
  endTime: string;
  link: string;
}

export interface SideEventProps {
  items: SideEventItem[];
}

export const Events: React.FC<SideEventProps> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <Event
          key={index}
          title={item.title}
          description={item.description}
          image={item.image}
          startTime={item.startTime}
          endTime={item.endTime}
          link={item.link}
        />
      ))}
    </>
  );
};
