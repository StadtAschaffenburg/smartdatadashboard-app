'use client'

import { Button } from '@/components/Elements/Button'
import Link from 'next/link'
import { removeParameterLink } from '@/utils/search'

export default function NoResults() {
  return (
    <>
      <div className="bg-primary-light text-primary">
        <div className="container mx-auto px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Keine Ergebnisse gefunden</h2>
            <p className="text-lg">
              Versuchen Sie es mit anderen Suchbegriffen.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href={removeParameterLink()}>
                <Button size={'sm'}>Suchbegriffe zurücksetzen</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
