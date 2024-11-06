import Link from 'next/link'
import React from 'react'

// Definieren des Breadcrumb-Typs
export type BreadcrumbType = {
  title: string
  link?: string | null
}

type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbType[]
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumb-container flex gap-2 text-xl text-white lg:text-2xl">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="mx-4">›</span>}
          {crumb.link ? (
            <Link
              className="transition-colors hover:text-primary-light"
              href={crumb.link}
            >
              {crumb.title}
            </Link>
          ) : (
            <span>{crumb.title}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
