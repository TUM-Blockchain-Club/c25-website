// components/workshops/WorkshopsContainer.tsx
// Note: no "use client" — this stays server-rendered unless you add filters later.

import React from "react";
import { WorkshopItem } from "./WorkshopItem";

export interface WorkshopItemModel {
  title: string;
  url: string;
  description: string;
  backgroundImg: string;
  starttime: string;
  endtime: string;
  room: string;
}

export interface WorkshopProps {
  items: WorkshopItemModel[];
}

export const WorkshopsContainer: React.FC<WorkshopProps> = ({ items }) => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {items.map((item, idx) => (
        <li key={item.title ?? idx} role="listitem">
          <WorkshopItem
            title={item.title}
            description={item.description}
            backgroundImg={item.backgroundImg}
            url={item.url}
            starttime={item.starttime}
            endtime={item.endtime}
            room={item.room}
          />
        </li>
      ))}
    </ul>
  );
};
