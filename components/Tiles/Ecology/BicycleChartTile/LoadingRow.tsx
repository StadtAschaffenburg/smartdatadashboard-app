export default function LoadingRow() {
  return (
    <div className="my-2 flex w-full animate-pulse items-center p-2">
      <div className="w-28 flex-none md:w-40">
        <div className="my-2 h-4 w-20 rounded-full bg-white" />
        <div className="h-4 w-16 rounded-full bg-white" />
      </div>
      <div className="flex-1">
        <div className="h-4 w-full rounded-full bg-white" />
      </div>
    </div>
  )
}
