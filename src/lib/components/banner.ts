import { c } from "./base"

export const banner = (variant: 'success' | 'danger' | 'neutral') => {
    let color = 'slate'
    switch(variant) {
        case 'success':
            color = 'green'
            break
        case 'danger':
            color = 'red'
            break
    }
    return c(`
        border border-${color}-500
        text-${color}-800
        bg-${color}-100
        rounded-md
        px-3 py-2
    `)
}