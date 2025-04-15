import React, { useContext } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../util";
import GlobalContext, { colorMap } from "../context/GlobalContext";

export default function DraggableEvent({ event }) {
  const { setSelectedEvent } = useContext(GlobalContext);

  const [{ opacity }, dragRef] = useDrag(() => ({
    type: ItemTypes.EVENT,
    item: { id: event.id, day: event }, // 👈 send current date of the event
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }), []);

  return (
    <div
      ref={dragRef}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedEvent(event);
      }}
      style={{ backgroundColor: colorMap[event.label], opacity }}
      className="border p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate cursor-move"
    >
      {event.title}
    </div>
  );
}
