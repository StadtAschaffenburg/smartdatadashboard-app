import Image from 'next/image'
import SDDLogo from '@/assets/logos/logo_sdd.svg'

export default function LogoSSD() {
  return (
    <div className="flex aspect-square h-24 md:h-32 lg:h-40 items-center justify-end bg-white pr-0 ">
      <Image
        alt="Logo des SmartDataDashboards Aschaffenburg"
        className="pointer-events-none h-full w-full object-contain"
        src={SDDLogo}
      />
    </div>
  )
}
