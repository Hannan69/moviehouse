import fs from 'fs'
import path from 'path'

export const getMoviesData = () => {
    const fPath = path.join(process.cwd(),'data.json')
    const data = fs.readFileSync(fPath)
    return JSON.parse(data)
}