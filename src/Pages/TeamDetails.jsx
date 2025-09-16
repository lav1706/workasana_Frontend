import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddSingleTeamModal from "../components/AddSingleTeamModel";
import Avatar from "../components/Avatar";
import { getTeamById } from "../store/features/team/teamSlice";

const TeamDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  // Redux se state
  const { selectedTeam, loading, error } = useSelector((state) => state.team);

  useEffect(() => {
    if (id) {
      dispatch(getTeamById(id));
    }
  }, [dispatch, id, showModal]);
  // showModal dependency rakha hai taki jab modal band ho tab naya fetch ho jaye

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link
        to="/team"
        className="text-blue-600 hover:underline text-sm flex items-center gap-1 mb-6"
      >
        ← Back to Teams
      </Link>

      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {selectedTeam && (
        <>
          <h1 className="text-2xl font-bold text-gray-50">
            {selectedTeam.name}
          </h1>

          <h2 className="text-sm font-semibold text-gray-200 mt-6 mb-2">
            MEMBERS
          </h2>

          <ul className="space-y-3 mb-4">
            {selectedTeam.member?.map((member, index) => (
              <li
                key={member._id || index}
                className="flex items-center gap-2 text-gray-200"
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
          />
        </>
      )}
    </div>
  );
};

export default TeamDetail;
