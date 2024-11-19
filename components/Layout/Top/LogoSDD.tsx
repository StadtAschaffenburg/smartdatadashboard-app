import Image from 'next/image'
import SDDLogo from '@/assets/logos/logo_sdd.png'

export default function LogoSSD() {
  return (
    <div className="-translate-y-8 rounded bg-white p-4 ">
      <Image
        alt="Logo des SmartDataDashboards Aschaffenburg"
        className="pointer-events-none ml-auto h-16 w-auto md:h-24"
        src={SDDLogo}
      />
    </div>
  )
}
