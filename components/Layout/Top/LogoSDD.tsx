import Image from 'next/image'
import SDDLogo from '@/assets/logos/logo_sdd.svg'

export default function LogoSSD() {
  return (
    <div className="flex h-32 w-48 items-center justify-center rounded bg-white p-4 md:h-40">
      <Image
        alt="Logo des SmartDataDashboards Aschaffenburg"
        className="pointer-events-none ml-auto w-full"
        src={SDDLogo}
      />
    </div>
  )
}
