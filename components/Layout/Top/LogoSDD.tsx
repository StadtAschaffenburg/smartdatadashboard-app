import Image from 'next/image'
import SDDLogo from '@/assets/logos/logo_sdd.svg'

export default function LogoSSD() {
  return (
    <div className="flex aspect-square h-32 items-center justify-end bg-white p-4 pr-0 md:h-40">
      <Image
        alt="Logo des SmartDataDashboards Aschaffenburg"
        className="pointer-events-none h-full w-full object-contain"
        src={SDDLogo}
      />
    </div>
  )
}
