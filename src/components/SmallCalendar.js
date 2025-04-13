import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";
import { labelsClasses } from "./EventModal";
export default function SmallCalendar() {
  return (
    <>
     <div className="border p-5 ">
      <h2>Goals</h2>
      <div className="flex flex-col overflow-y-auto">
        {labelsClasses.map((label) => (
          <div
            key={label}
            className={`p-2 rounded-lg bg-${label}-200 text-${label}-800`}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </div>
        ))}
      </div>
     </div>
    </>
  )
   
}
