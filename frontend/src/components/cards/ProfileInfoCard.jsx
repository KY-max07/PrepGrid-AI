import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () =>{
    const {user, clearUser} =  useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.clear();
        clearUser();
        navigate('/');
    }
   
    return user && (
        <div className="flex items-center p-1">
            <img src={user.profileImageUrl} alt=""  className="w-10 h-10 rounded-full bg-gray-600 mr-3"/>
            <div>
                <div className="text-md uppercase font-extrabold">
                    {user.name || ""}

                </div>
                <button className="text-sm text-blue-700 underline relative bottom-1"
                onClick={handleLogout}>
                    logout
                </button>
            </div>
        </div>
    )
}

export default ProfileInfoCard;