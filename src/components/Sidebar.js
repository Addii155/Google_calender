// import React from "react";

// import Labels from "./Labels";
// export default function Sidebar() {
//   return (
//     <aside className="border p-5 w-64">
//       <CreateEventButton />
//       <SmallCalendar />
//       <Labels />
//     </aside>
//   );
// }
// Sidebar.jsx
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { labelsClasses } from "./EventModal";

// Helper: you could style the label display based on your labelsClasses
const getLabelColor = (label) => {
  const colorMap = {
    exercise: "lightgreen",
    work: "lightblue",
    study: "lightpink",
    social: "lightyellow",
    eating: "lightgray",
    family: "lightskyblue",
    other: "lightgray",
  };
  return colorMap[label] || "gray";
};

export default function Sidebar() {
  const {
    labels,
    tasks,
    setFilteredTasks,
    filteredTasks,
    currlabel,
    setCurrLabel,
    savedEvents,
    filteredEvents
    
  } = useContext(GlobalContext);
  const handleLabelClick = (label) => {
    setCurrLabel(label);
  }
  
  return (
    <div className="sidebar w-[12%]">
      <h3 style={{textAlign: "center"}}>Goals</h3>
      {labelsClasses.map((lbl, index) => (
        <div key={index} style={{ margin: "5px" ,
        display: "flex",
        justifyContent: "space-between",
        padding: "5px"
        }}>
          <button
            onClick={() => handleLabelClick(lbl)}
            style={{ backgroundColor: getLabelColor(lbl),
              width: "100%"
             }}
          >
            {lbl}
          </button>
        </div>
      ))}
      <hr />
      <h3 className="text-center">Tasks</h3>
      {
        filteredEvents.map((task, index) => (
          <div key={index} style={{ margin: "5px" }}>
            <button
              style={{ backgroundColor: getLabelColor(task.label),
              width: "100%"
             }}
            >
              {task.title}
            </button>
          </div>
        ))
      }
    </div>
  );
}
