import {useEffect,useState} from 'react'
import {Moon,Sun} from 'lucide-react'
export default function ThemeToggle(){
const [dark,setDark]=useState(()=>document.documentElement.classList.contains('dark'))
useEffect(()=>{document.documentElement.classList.toggle('dark',dark);try{localStorage.setItem('cloudops-theme',dark?'dark':'light')}catch{}},[dark])
return <button type="button" onClick={()=>setDark(!dark)} aria-label={dark?'Activar modo claro':'Activar modo oscuro'} title={dark?'Modo claro':'Modo oscuro'} className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface text-mute transition-colors hover:bg-bg hover:text-ink">{dark?<Sun size={18}/>:<Moon size={18}/>}</button>}
