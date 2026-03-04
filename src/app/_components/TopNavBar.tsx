import { MdMenu } from "react-icons/md";
import UseImg from "./UseImg";
export default function TopNavBar() {

    return (
        <div className="flex justify-between w-[90%] sm:w-[80%]">
            <MdMenu size={34} />
            <UseImg />
        </div>
    )
}