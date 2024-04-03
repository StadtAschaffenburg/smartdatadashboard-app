import React, { Suspense } from 'react'

const withSuspense = (
  WrappedComponent: () => JSX.Element | Promise<JSX.Element>,
  FallbackComponent: JSX.Element = <p>Lade Daten...</p>,
) =>
  function () {
    return (
      <Suspense fallback={FallbackComponent}>
        <WrappedComponent />
      </Suspense>
    )
  }

export default withSuspense
