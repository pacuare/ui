import { twMerge } from "tailwind-merge";

export const c = (styles: string, attrs: object = {}) => (userStyles: string = '') => ({
    ...attrs,
    class: twMerge(styles, userStyles)
})