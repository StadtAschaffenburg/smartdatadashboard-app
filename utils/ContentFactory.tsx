import directus from '@/lib/directus'

import fs from 'fs'
import path from 'path'

const directusUrl =
    process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'

export async function getContent(id: string, collection: string, query: object = {}, query_id: string = 'default') {
    const filePath = getFilePath(collection, id, query_id)
    let data = readFile(filePath)

    if (!data) {
        data = await directus.items(collection).readByQuery(setDefaultQuery(query))
        saveFile(filePath, data)
    }

    return data
}

export async function getOne(id: number | string, collection: string) {
    const filePath = getFilePath(collection, id, 'one')
    let data = readFile(filePath)

    if (!data) {
        data = await directus.items(collection).readOne(id)
        saveFile(filePath, data)
    }

    return data
}

export async function getCollections() {
    const filePath = getFilePath('collections')
    let data = readFile(filePath)

    if (!data) {
        data = await directus.items('collections').readByQuery(setDefaultQuery())
        saveFile(filePath, data)
    }

    return data;
}

export function getImage(image: string) {
    return '/images/placeholder.jpeg';
}

function getFilePath(folder: string, id: number | string = 'all', query_id: string = 'default') {
    return path.join(process.cwd(), 'assets', 'content', folder, `${query_id}@${id}.json`);
}

function readFile(filePath: string) {
    try {
        // try to read from file
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (err) {
        return 0;
    }
}

function saveFile(filePath: string, data: any) {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error("Can't save new file: ", err)
            return false
        }
        console.log(`💾 Saved new content: ${filePath}`,)
    });

    return true;
}

function setDefaultQuery(query: any = {}) {
    if (!query.filter) {
        query.filter = {}; // Setzt 'filter', falls es nicht existiert
    }

    query.filter.status = 'published'; // Fügt 'status: published' sicher hininzu

    return query;
}

export default getContent