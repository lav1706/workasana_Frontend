import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddSingleTeamModal from "../components/AddSingleTeamModel";
import { useTeam } from "../Context/TeamContext";
import Avatar from "../components/Avatar";

const TeamDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectTeam, setSelectTeam] = useState(null);
  const { getTeamById } = useTeam();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const result = await getTeamById(id);
          if (result) {
            setSelectTeam(result);
            setMembers(result.member || []);
          }
        } catch (err) {
          console.error("Failed to fetch team details:", err);
        }
      }
    };

    fetchData();
  }, [showModal]);

  const handleAddMember = (newMember) => {
    setMembers((prev) => [...prev, newMember]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link
        to="/team"
        className="text-blue-600 hover:underline text-sm flex items-center gap-1 mb-6"
      >
        ← Back to Teams
      </Link>

      <h1 className="text-2xl font-bold text-gray-50">{selectTeam?.name}</h1>

      <h2 className="text-sm font-semibold text-gray-200 mt-6 mb-2">MEMBERS</h2>

      <ul className="space-y-3 mb-4">
        {members.map((member, index) => (
          <li
            key={member._id || index}
            className="flex items-center text-gray-200"
          >
            <Avatar name={member.name || member.member} />
            <span>{member.name || member.member}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setShowModal(true)}
        className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Member
      </button>

      <AddSingleTeamModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddMember}
      />
    </div>
  );
};

export default TeamDetail;
