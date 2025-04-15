import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  setLabels: () => {},
  updateEventDate:()=>{},
  currlabel: "work",
  labels: [
    "exercise",
    "work",
    "study",
    "social",
    "eating",
    "family",
    "other",
  ],
  updateLabel: () => {},
  filteredEvents: [],
});
export const labelsClasses = [
  "exercise",
  "work",
  "study",
  "social",
  "eating",
  "family",
];
export const colorMap = {
  exercise: "lightgreen",
  work: "lightblue",
  study: "lightpink",
  social: "lightyellow",
  eating: "lightgray",
  family: "lightskyblue",
  other: "lightgray",
};

export default GlobalContext;
