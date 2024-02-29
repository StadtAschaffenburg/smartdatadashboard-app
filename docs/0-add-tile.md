# How to add a new Tile?

### 0. Prerequisites:

- Name of the Tile
- Category (`climate`, `mobility`, `energy`, `building`)
- ID (you can choose by yourself)
- Name of the Data Source (e.g. Stadt Münster - Amt für Mobilität)

### 1. Create Tile ID

Add the Tile ID to the `types/tile.d.ts` file. If you intend to add a `mobility` tile with the ID `sampleTile`, please append it to the `MobilityTypes` list:

```
export type MobilityTypes = ... | 'sampleTile'
```

### 2. Create File

Create a new file: `klimadashboard-ms/components/Tiles/(category)/(name)/index.tsx`

All tiles follow the same structure. It's best practice to keep the tile itself a Server Component and create seperate client components for interactivity (e.g. charts etc).

### 3. Create Simple Tile

Keeping out example, the file would look like the following:

`klimadashboard-ms/components/Tiles/mobility/sampleTile/index.tsx`:

```tsx
import Title from '@/components/Elements/Title'
import MobilityTile from '../MobilityTile'
import getTileData from '@/lib/api/getTileData'

export default async function GarbageTile() {
  const data = await getTileData('mobility-sampleTile')
  const infoText = data?.info ?? ''

  return (
    <MobilityTile
      dataSource="Stadt Münster - Amt für Mobilität"
      embedId="mobility-sampleTile"
      title="Sample Tile"
    >
      {/*
       * Here you can add the content of the Tile
       * Don't forget to place the infoText
       */}
    </MobilityTile>
  )
}
```

### 4. Fill it with content

As said, it's best to create a seperate component with the content of the Tile. One example, which also includes the usage of the `infoText`:

```tsx
<MobilityTile
  dataSource="Stadt Münster - Amt für Mobilität"
  embedId="mobility-sampleTile"
  title="Sample Tile"
>
  <TileSplitView>
    {' '}
    {/* <-- This is a useful wrapper for a full width tile, left the content, right the info text */}
    <TileSplitView.Left>
      <SampleTileContent /> {/* <-- This would be the content */}
    </TileSplitView.Left>
    <TileSplitView.Right>
      <Title as="h5" variant={'dark'}>
        {infoText} {/* <-- Rendering the info Text*/}
      </Title>
    </TileSplitView.Right>
  </TileSplitView>
</MobilityTile>
```

### 5. Add the Tile to the `utils/TileFactory.tsx`

The TileFactory is useful to map the IDs to the Tile. Please add the new Tile to the TileFactory.

**ts-expect-error Server Component**: We need to add this line before the usage of a server component to resolve a current TypeScript issue: (https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error)

### 6. Add the Tile to the Page

To add the Tile to the Page, you need to add it to its corresponding `View` (here: `components/Views/MobilityView.tsx`)

You need to add the `@ts-expect-error Server Component` comment here as well.

### 7. Connect CMS

Please refer to the [docs/1-connect-cms.md](docs/1-connect-cms.md) document on how to add the tile to the CMS
