import { useWindowSize } from 'react-use'

export default function useDevice() {
  const { width } = useWindowSize()

  if (width > 1024) {
    return 'desktop'
  }
  if (width > 768) {
    return 'tablet'
  }
  return 'mobile'
}
