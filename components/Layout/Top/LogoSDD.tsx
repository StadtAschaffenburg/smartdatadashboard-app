import Image from 'next/image'
import SDDLogo from '@/assets/logos/logo_sdd.png'

export default function LogoSSD() {
  return (
    <div className="flex aspect-square h-32 items-center justify-center rounded bg-white p-4 md:h-48">
      <Image
        alt="Logo des SmartDataDashboards Aschaffenburg"
        className="pointer-events-none ml-auto w-full"
        src={SDDLogo}
      />
    </div>
  )
}
