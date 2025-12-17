import Link from 'next/link'
import React from 'react'
import { BreadcrumbType } from '@schleegleixner/react-statamic-api'

type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbType[]
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs" className="breadcrumb-container flex gap-2 text-base font-medium text-white md:text-lg lg:text-xl">
      {breadcrumbs
        .filter(
          crumb => crumb.title && crumb.title.trim() && crumb.link?.trim(),
        )
        .map((crumb, index) => (
          <React.Fragment key={index}>
            <div className="hidden last:inline-block md:inline-block">
              {index > 0 && <span className="mx-4 hidden md:inline">›</span>}
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
            </div>
          </React.Fragment>
        ))}
    </nav>
  )
}
