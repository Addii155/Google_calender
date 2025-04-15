import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { useDrop } from "react-dnd";
import GlobalContext, { colorMap } from "../context/GlobalContext";
import DraggableEvent from "./DraggableEvent"; // New component
import { ItemTypes } from "../util";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    savedEvents,
    setSelectedEvent,
    dispatchCalEvent
    // updateEventDate,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = savedEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.EVENT,
    
    drop: (item) => {
      const fromDate = dayjs(item.day).format("DD-MM-YYYY");
      const toDate = day.format("DD-MM-YYYY");
      const calendarEvent = {
        title: item.day.title,
        description : item.day.description,
        label: item.day.label,
        day: day.valueOf(),
        id: Date.now(),
      };
      // console.log(calendarEvent)
      dispatchCalEvent({ type: "delete", payload: { id: item.id } });
      dispatchCalEvent({ type: "push", payload: calendarEvent });
      // console.log("Dragged From:", item);
      // console.log("Dropped To:", day.format("DD-MM-YYYY"));
    
      // updateEventDate(item.id, day.toDate()); // if needed
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [day]);

  return (
    <div
      ref={dropRef}
      className={`border border-gray-200 flex flex-col ${
        isOver ? "bg-green-100" : ""
      }`}
    >
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt) => (
          <DraggableEvent key={evt.id} event={evt} />
        ))}
      </div>
    </div>
  );
}
