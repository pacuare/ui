import type { QueryResponse } from "$lib/api/query.js";
import { resultToCSV } from "./csv.js";

export function downloadData(data: QueryResponse) {
    const csvBlob = new Blob([resultToCSV(data)], { type: 'text/tsv' })

    const url = URL.createObjectURL(csvBlob)

    const link = document.createElement('a')
    link.classList.add('hidden')
    link.href = url
    link.download = 'query.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
}