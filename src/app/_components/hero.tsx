import Link from 'next/link';
import Image from 'next/image';
import SpotiALogo from "@/public/SpotIALogo.png"
import IlustracionOnboarding from "@/public/IlustracionOnboarding.png"
import OnBoarding from "@/src/app/_components/OnBoarding"
export function Hero() {
    return (
        <div className=" flex flex-col items-center justify-center  w-full  font-sf-pro ">
            <Image
                className='mt-[20vh]'
                src={SpotiALogo}
                alt={"logo"}
                width={171}
                height={141} />


            <h6 className="font-medium text-base leading-none tracking-tight text-center w-full mt-2"> Bienvenido a la mejor app de música e IA </h6>
            <p className=' font-normal  text-sm text-center max-w-[30vh] mt-10  '> Analiza tu musica y descubri todo lo que eso puede decir sobre vos y tu personalidad </p>
            <div className=' relative  flex items-center  justify-center mt-10 '>
                <div className='absolute w-[40vh] h-[40vh] rounded-full  blur-xl  bg-[radial-gradient(50%_50%_at_50%_50%,#EBE7FF_0%,rgba(147,128,255,0.25)_100%)]' />
                <Image
                    className='z-10'
                    src={IlustracionOnboarding}
                    alt='IlustracionOnboarding'
                    width={318}
                    height={318}
                />

            </div>

            <OnBoarding page={1} />
        </div>
    )
}