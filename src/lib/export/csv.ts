import type { QueryResponse } from "$lib/api/query";

export function resultToCSV(result: QueryResponse) {
    if(result.values.length == 0) return '';

    const csvEscape = (row: any[]) => row
        .map(v => v?.toString() ?? '')
        .map(v => v.replace('"', '""'))
        .map(v => ['\t' , '\n', '\r'].some(c => v.includes(c)) ? `"${v}"` : v)
    
    return (
        csvEscape(result.columns).join('\t') + '\r\n' +
        result.values.map((v) => csvEscape(v).join('\t'))
               .join('\r\n')
    )
}