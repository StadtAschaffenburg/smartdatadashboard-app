'use client'

type QualityBarProps = {
  progress: number
  low_label?: string
  high_label?: string
}

export default function QualityBar({
  progress,
  low_label = 'Geringe Belastung',
  high_label = 'Hohe Belastung',
}: QualityBarProps) {
  return (
    <div className="pt-4">
      <div className="relative rounded-full border-2 border-primary p-[.25rem]">
        <div className="h-5 w-full rounded-full bg-gradient-to-l from-[#f28443] via-yellow-400 to-[#34c17b]">
          <div className="relative box-border h-full w-full px-2">
            <div className="relative h-full">
              <div
                className="absolute top-[-5%] h-[110%] translate-x-[-1px] border-l-2 border-l-primary"
                style={{ left: `${progress}%` }}
              ></div>
              <div
                className="absolute top-[-24px] translate-x-[-50%] px-2"
                style={{ left: `${progress}%` }}
              >
                <div className="h-0 w-0 border-l-[15px] border-r-[15px] border-t-[15px] border-primary border-l-transparent border-r-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-1 text-primary">
        <span>{low_label}</span>
        <span className="text-right">{high_label}</span>
      </div>
    </div>
  )
}
