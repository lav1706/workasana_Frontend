import React from "react";
import Card from "../components/Card";
import { useState } from "react";
import AddTeamModal from "../components/AddTeamModel";
import { useTeam } from "../Context/TeamContext";
import { Link } from "react-router-dom";

const Team = () => {
  const [showTeamModal, setShowTeamModal] = useState(false);
  const { team } = useTeam();

  return (
    <div className="p-6 ">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-50">Team</h2>
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-blue-600"
          onClick={() => setShowTeamModal(true)}
        >
          + New Team
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {team?.map((team) => (
          <Link to={`/team/${team._id}`}>
            <Card
              key={team.id}
              type="team"
              heading={team?.name}
              owners={team.member}
            />
          </Link>
        ))}
      </div>
      <AddTeamModal
        show={showTeamModal}
        onClose={() => setShowTeamModal(false)}
      />
    </div>
  );
};

export default Team;
