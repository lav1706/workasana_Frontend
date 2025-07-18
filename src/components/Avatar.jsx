const getColor = (name) => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];
  const index = name?.charCodeAt(0) % colors.length;
  return colors[index];
};

// Avatar Circle Component with Tooltip
const Avatar = ({ name }) => {
  const initial = name?.charAt(0).toUpperCase();
  const color = getColor(name);

  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${color}`}
      title={name}
    >
      {initial}
    </div>
  );
};

export default Avatar;
