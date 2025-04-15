// In your ContextWrapper component (e.g., ContextWrapper.jsx)
import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) =>
        evt.id === payload.id ? payload : evt
      );
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}
function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [dragdrop, setDragdrop] = useState([]);
  const [tasks, setTasks] = useState([]); // <-- add tasks state here
  const [filteredTasks, setFilteredTasks] = useState([]); // for storing tasks filtered by label
  const [currlabel, setCurrLabel] = useState("work");
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );
  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      evt.label==currlabel
    );
  }, [savedEvents, labels,currlabel]);
  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  // Update labels based on savedEvents
  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map(
        (label) => {
          const currentLabel = prevLabels.find(
            (lbl) => lbl.label === label
          );
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  const updateEventDate =(id, newDate) => {
    console.log(newDate)
    // dispatchCalEvent({
    //   type: "update",
    //   payload: {
    //     ...savedEvents.find((evt) => evt.id === id),
    //     day: newDate,
    //   },
    // });
  }
  function updateLabel(label) {
    setLabels(
      labels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        updateEventDate,
        savedEvents,
        setLabels,
        labels,
        currlabel,
        setCurrLabel,
        updateLabel,
        filteredEvents,
        tasks,            // new tasks state
        setTasks,         // function to update tasks, for example when fetching from an API
        filteredTasks,    // filtered tasks to show based on label
        setFilteredTasks, // function to update filtered tasks
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
