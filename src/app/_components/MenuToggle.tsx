
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
type Props = {
    setButtonClose: (value: boolean) => void,
    onRefresh: () => void
}

export default function MenuToggle({ setButtonClose, onRefresh}: Props) {
    const router = useRouter()
    return (
        <div className="fixed top-0 left-0 z-20 w-[30vh] h-[100vh] bg-[rgb(235,231,255)] flex flex-col">
            <button onClick={() => setButtonClose(false)} className="absolute m-4 text-3xl right-0"><RxCross2 /></button>
            <div className="flex flex-col items-start mt-[100%] px-4 gap-4 font-semibold text-lg text-[rgb(77,74,94)]">
                <button onClick={()=>router.push(`/es/dashboard`)} className=" hover:bg-[rgb(215,206,253)] p-2 mb-4 mx-4 rounded-xl">Inicio</button>
                <button className="hover:bg-[rgb(215,206,253)] p-2  mb-4  mx-4 rounded-xl">Favoritos</button>
                <button onClick={()=>router.push(`/es/dashboard/historial`)} className=" hover:bg-[rgb(215,206,253)] p-2 mb-4 mx-4 rounded-xl">Historial completo</button>
                <button onClick={onRefresh} className="hover:bg-[rgb(215,206,253)] p-2  mb-4 mx-3 text-left rounded-xl">Generar nueva<br />devolucion</button>
            </div>
        </div>
    )
}