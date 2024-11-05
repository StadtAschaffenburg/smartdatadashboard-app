export default async function NoResults() {
  return (
    <>
      <div className="bg-primary-light text-primary">
        <div className="container mx-auto py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Keine Ergebnisse gefunden</h2>
            <p className="text-lg">
              Versuchen Sie es mit anderen Suchbegriffen.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
