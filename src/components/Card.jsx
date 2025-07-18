import React from "react";
import Avatar from "./Avatar";

// Card Component
const Card = ({ tag, heading, description, type, owners = [], dateAssign }) => {
  return (
    <div className="h-[180px] w-[280px] bg-gray-50 rounded-2xl p-3 mt-2">
      {type === "task" ||
        (type === "project" && (
          <div
            className={`px-4 py-1 w-fit text-sm rounded-md ${
              tag === "To Do"
                ? "bg-blue-100 text-blue-700"
                : tag === "In Progress"
                ? "bg-yellow-100 text-yellow-700"
                : tag === "Completed"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {tag}
          </div>
        ))}
      <h2 className="text-xl font-bold mt-2 mb-1">{heading}</h2>

      {type === "task" ? (
        <>
          <div className="text-sm text-gray-500 mb-1">Assigned to:</div>
          <p className="text-xs text-gray-400 mb-2">Due on: {dateAssign}</p>
          <div className="flex mb-1 group relative">
            {owners.map((person, i) => {
              const name =
                typeof person === "string" ? person : person?.name || "";
              const key =
                typeof person === "object" ? person._id || i : person + i;

              return (
                <div
                  key={key}
                  className={`transition-all duration-300 ease-in-out cursor-pointer 
        ${owners.length !== 0 ? "-ml-3 group-hover:ml-0" : ""}
      `}
                >
                  <Avatar name={name} />
                </div>
              );
            })}
          </div>
        </>
      ) : type === "project" ? (
        <p className="text-sm text-gray-600 mt-2 line-clamp-4">{description}</p>
      ) : null}

      {type === "team" && (
        <div className="flex mb-1 group relative">
          {owners.map((person, idx) => {
            const name =
              typeof person === "string" ? person : person?.name || "";
            const key =
              typeof person === "object" ? person._id || idx : person + idx;
            return (
              <div
                key={key}
                className={`transition-all duration-300 ease-in-out cursor-pointer 
        ${idx !== 0 ? "-ml-3 group-hover:ml-0" : ""}
      `}
              >
                <Avatar name={name} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Card;
