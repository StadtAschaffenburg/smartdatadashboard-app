'use client'

import { Menu } from '@headlessui/react'
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline'
import Dropdown from './Dropdown'
import Title from './Title'

export default function SortTiles() {
  return (
    <Dropdown
      trigger={
        <div className="flex cursor-pointer items-center gap-1 text-primary">
          <ArrowsUpDownIcon className="h-6" />
          <Title as="h6" className="underline">
            Kacheln sortieren
          </Title>
        </div>
      }
    >
      <div className="flex flex-col gap-1 rounded-lg bg-white p-2 shadow">
        <Menu.Item>
          <Title
            as="h6"
            className="cursor-pointer rounded px-4 py-2 hover:bg-white"
            variant={'primary'}
          >
            Nach Kategorie
          </Title>
        </Menu.Item>
        <Menu.Item>
          <Title
            as="h6"
            className="cursor-pointer rounded px-4 py-2 hover:bg-white"
            variant={'primary'}
          >
            Neueste zuerst
          </Title>
        </Menu.Item>
      </div>
    </Dropdown>
  )
}
