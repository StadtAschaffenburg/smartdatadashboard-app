import Image from 'next/image'
import SDDLogo from '@/assets/logos/logo_sdd.png'

export default function LogoSSD() {
  return (
    <Image
      alt="Logo des SmartDataDashboards Aschaffenburg"
      className="pointer-events-none ml-auto h-16 w-auto md:h-24"
      src={SDDLogo}
    />
  )
}
