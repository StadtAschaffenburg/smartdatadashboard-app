import { MsKlimadashboardIconsMRadlerLinks, MsKlimadashboardIconsMRadlerRechts } from '@/components/Icons/Mobilitaet'
import * as ProgressPrimitive from '@radix-ui/react-progress'

export default function BicycleProgress({ progress }: { progress: number }) {
  const myProgress = progress > 0 ? progress : 0

  return (
    <div className="flex w-full">
      <MsKlimadashboardIconsMRadlerLinks className="h-6 -translate-y-[3px] translate-x-0.5 md:h-12 md:translate-x-1" />
      <ProgressPrimitive.Root
        className="w-[calc(100%-4rem)]"
        value={myProgress}
      >
        <ProgressPrimitive.Indicator
          className="relative mt-[0.8px] flex h-1.5 bg-mobility transition-all md:mt-[4.5px] md:h-3"
          style={{ width: `${myProgress}%` }}
        >
          <MsKlimadashboardIconsMRadlerRechts className="absolute -right-4 top-0 h-6 -translate-y-[3.7px] md:-right-8 md:h-12 md:-translate-y-[7.5px]" />
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    </div>
  )
}
