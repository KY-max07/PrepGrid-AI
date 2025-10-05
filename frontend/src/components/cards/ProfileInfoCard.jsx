import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import person from "../../../public/person.svg";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="flex items-center  justify-center  bg-white px-3 rounded-2xl gap-3">
        <img
          src={user.profileImageUrl ? user.profileImageUrl : person}
          alt=""
          className={`md:w-9 md:h-9 w-6 h-6 p-0.5 rounded-full bg-white  border-2 border-neutral-800 ${user.profileImageUrl}? *:  object-cover object-top  `}
        />
        <div>
          <div className="text-[10px] md:text-sm uppercase font-extrabold  pr-1 relative top-1 right-0.5 text-neutral-900">
            {user?.name?.split(" ")[0] || "MADMAX"}
          </div>
          <button
            className=" text-[10px] md:text-xs  relative bottom-1 text-neutral-400 hover:text-red-500 cursor-pointer"
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
