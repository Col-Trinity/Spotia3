import { MdMenu } from "react-icons/md";
import UseImg from "./UseImg";
import MenuToggle from "./MenuToggle";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function TopNavBar({ onRefresh }: { onRefresh: () => void }) {
const [button,setButton]= useState(false)
const router = useRouter()



    return (
        <div className="  flex justify-between w-[90%] sm:w-[80%]">
            <div className="relative">
                 <button className="" onClick={()=>setButton((prev)=>!prev) }>
                <MdMenu size={34} />
            </button>
            {button && (
                <MenuToggle setButtonClose={setButton}onRefresh={onRefresh}/>
            )}
            </div>
           <button onClick={()=>router.push("/es/dashboard/perfil")}>            <UseImg />
</button>
        </div>
    )
}