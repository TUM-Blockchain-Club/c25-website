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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Event
          key={index}
          className="h-[520px] md:h-[560px] lg:h-[600px] xl:h-[640px]"
          title={item.title}
          description={item.description}
          image={item.image}
          startTime={item.startTime}
          endTime={item.endTime}
          link={item.link}
        />
      ))}
    </div>
  );
};
