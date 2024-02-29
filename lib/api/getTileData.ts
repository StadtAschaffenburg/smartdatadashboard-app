import directus, { tileCollectionName } from '../directus'
import fs from 'fs';
import path from 'path';

export default async function getTileData(id: string) {
  const filePath = path.join(process.cwd(), 'assets', 'tile_data', `${id}.json`);

  try {
    // try to read from file
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (err) {
    // if file does not exist, read from Directus
    const { data } = await directus.items(tileCollectionName).readByQuery({
      filter: {
        tile_id: id,
      },
    })

    // save to file
    fs.writeFile(filePath, JSON.stringify(data?.[0], null, 2), (err) => {
      if (err) {
        console.error("Can't save from Directus: ", err);
        return;
      }
      console.log("Saved: ", filePath);
    });

    return data?.[0]
  }
}
