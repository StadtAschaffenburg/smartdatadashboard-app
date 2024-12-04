import Image from 'next/image'
import StadtLogo from '@/assets/logos/logo_ab.jpg'

export default function LogoAB() {
  return (
    <Image
      alt="Logo der Stadt Aschaffenburg"
      className="pointer-events-none ml-auto h-8 w-auto md:h-10"
      src={StadtLogo}
    />
  )
}
