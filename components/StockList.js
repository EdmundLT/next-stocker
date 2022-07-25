import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";


  
function StockList({symbol, name}) {
    const [user] = useAuthState(auth);
    const docRef = db.collection("users").doc(user.uid);
  return (
    <div className="bg-[#A5C9CA] text-[#2C3333] grid grid-cols-5 rounded-xl px-4 py-4 space-x-10">
    <div className="bg-[#2C3333] text-[#E7F6F2] rounded-full p-4">
    <p className="text-lg font-semibold">{symbol}</p>
    </div>
    <div className="pt-4 col-span-3">

    <p className="text-xl">{name.substring(0,30)}..</p>
    </div>
    <div className="pt-4 pr-4 text-right cursor-pointer">
    <p>Delete</p>
    </div>
    </div>
  )
}

export default StockList