# How to add a new tile layout?

Compared to the original project [https://klimadashboard.ms/](Klimadashboard Münster), the tile setup is much more data-driven. Instead of creating one file per tile, you can reuse tile types multiple times.

## 1. Create a File

Create a new file in your project at:

`klimadashboard-ms/components/Tiles/(category)/(name)/index.tsx`

For reusable tiles that appear in multiple categories, use the Prefab folder instead.

All tiles follow a similar structure and are rendered on the client side to enable the search functionality.

## 2. Create Simple Tile

Continuing with an example, the file might look like this:

`klimadashboard-ms/components/Tiles/mobility/sampleTile/index.tsx`:

```tsx
import { TileProps } from '@/types/tiles'
import BaseTile from '@/components/Tiles/Base/IconTile'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      {/*
       * Here you can add the content of the Tile
       * Don't forget to place the infoText
       */}
    </BaseTile>
  )
}
```

## 3. FPopulate It With Content

Most of the tile content is already provided via `tile_payload` (for example, the data source or title). For simple tiles, this is often enough to produce meaningful output.

If you want to extend the layout further, you can import custom tile components into the BaseTile, for instance:

```tsx
import TileContent from './MyChart'

export default function Tile({ type, tile_payload }: TileProps) {
  return (
    <BaseTile embedId={type} tile_payload={tile_payload}>
      <TileContent tile_payload={tile_payload} />
    </BaseTile>
  )
}
```

## 4. Add the Tile to `utils/TileFactory.tsx`

You must add any new tile type to the TileFactory. You can either link it by the tile ID or by the tile type (recommended).

## 5. Add the Tile to the Page in the CMS

Because the view is rendered using the provided tile collection, you don't need to add the new tile to any specific view file.

For details on adding the tile to the CMS, please refer to the [docs/2-cms.md](docs/2-cms.md) document.
