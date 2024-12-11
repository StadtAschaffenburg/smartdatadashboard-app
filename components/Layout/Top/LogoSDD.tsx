import Image from 'next/image'
import SDDLogo from '@/assets/logos/logo_sdd.svg'

export default function LogoSSD() {
  return (
    <div className="flex h-32 w-64 items-center justify-end bg-white p-4 pr-0 md:h-40 md:w-80">
      <Image
        alt="Logo des SmartDataDashboards Aschaffenburg"
        className="pointer-events-none ml-auto w-full"
        src={SDDLogo}
      />
    </div>
  )
}
