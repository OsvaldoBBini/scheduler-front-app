import { useState } from "react";
import { useAuth } from "../../../../app/hooks/useAuth";
import { UserCircle, SignOut } from "@phosphor-icons/react";

export function ProfileInfos(): JSX.Element {
  
  const [isVisible, setIsVisible] = useState(false);
  const { signout, profileData } = useAuth();
  
  return (
    <div className="relative">
      <div className={`p-4 w-48 absolute bg-white top-10 right-0 rounded-2xl shadow-md ${isVisible ? 'block' : 'hidden'}`}>
        <div className="flex flex-col gap-y-3">
          {profileData && 
          
          <div className="flex flex-col">
            <span>{profileData.given_name}</span>
            <small>{profileData.email}</small>
          </div>
          }

          <button className="flex items-center justify-center gap-x-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-2xl " onClick={signout}> 
              <SignOut size={25} weight="thin" />
            <span>Logout</span>
          </button>
        
        </div>
      </div>

      <button className="flex" onClick={() => setIsVisible(!isVisible)}>
        <UserCircle size={35} weight="thin"/>
      </button>
    </div>
  )
}