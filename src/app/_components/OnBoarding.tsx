
'use client'
import { useRouter } from "next/navigation";
type Props = {
    page: number
}
export default function OnBoarding({ page }: Props) {
    const router = useRouter()
    const handleClick = () => {
        if (page === 1) {
            router.push('/es/login')
        } else {
            router.back()
        }
    }

    return (
        <div className="flex  z-10 flex-col items-center justify-center w-full ">
            <div
                className="flex gap-2 mt-6 cursor-pointer"
                onClick={handleClick}
                onTouchEnd={handleClick}
            >
                <div className={`w-3 h-3 rounded-full  ${page === 1 ? 'bg-purple-600' : 'bg-purple-200 '} `} />
                <div className={`w-3 h-3 rounded-full  ${page === 2 ? 'bg-purple-600' : 'bg-purple-200 '} `} />
            </div>
        </div>)

}