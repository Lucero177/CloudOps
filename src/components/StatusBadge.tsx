import {Status} from '../types/cloud'
const m={ok:['Correcto','bg-green-100 text-sec dark:bg-green-500/15 dark:text-green-400'],warn:['Revisar','bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400'],error:['Problema','bg-red-100 text-alert dark:bg-red-500/15 dark:text-red-400']}
export default function StatusBadge({status,label}:{status:Status;label?:string}){const [t,c]=m[status];return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${c}`}><span className="h-1.5 w-1.5 rounded-full bg-current"/>{label??t}</span>}
