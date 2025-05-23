import { c } from "./base";

export const button = (variant: 'primary' | 'outline') =>
    c(`px-3 py-2 border rounded-md
        ${variant == 'outline' && 'border-slate-200 hover:border-slate-300'} 
        ${variant == 'primary' && 'bg-black text-white hover:bg-slate-800 disabled:bg-slate-600 disabled:border-slate-600'}
        cursor-pointer
        disabled:cursor-not-allowed
        transition-colors`)