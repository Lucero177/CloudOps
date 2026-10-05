import {useState,FormEvent} from 'react'
import {services,regions,useLS} from '../data/awsServices';import {Proposal} from '../types/cloud'
const empty:Proposal={name:'',type:'Aplicación empresarial',desc:'',region:'us-east-1',users:100,availability:'Alta (99.99%)',services:['EC2'],goal:'Modernización de aplicación'}
export default function Planning(){const [list,setList]=useLS<Proposal[]>('cloudops-proposals',[]);const [f,setF]=useState<Proposal>(empty)
const set=(k:keyof Proposal,v:string|number|string[])=>setF({...f,[k]:v})
const tog=(id:string)=>set('services',f.services.includes(id)?f.services.filter(x=>x!==id):[...f.services,id])
const submit=(e:FormEvent)=>{e.preventDefault();setList([f,...list]);setF(empty)}
const L=({t,children}:{t:string;children:React.ReactNode})=><label className="block text-sm font-medium">{t}<div className="mt-1">{children}</div></label>
return <div className="grid gap-6 xl:grid-cols-2"><form onSubmit={submit} className="card grid gap-4 sm:grid-cols-2">
<L t="Nombre de la solución"><input required className="inp" value={f.name} onChange={e=>set('name',e.target.value)}/></L>
<L t="Tipo de aplicación"><select className="inp" value={f.type} onChange={e=>set('type',e.target.value)}>{['Aplicación empresarial','Sitio web','API / Backend','Análisis de datos'].map(o=><option key={o}>{o}</option>)}</select></L>
<div className="sm:col-span-2"><L t="Descripción"><textarea required rows={3} className="inp" value={f.desc} onChange={e=>set('desc',e.target.value)}/></L></div>
<L t="Región seleccionada"><select className="inp" value={f.region} onChange={e=>set('region',e.target.value)}>{regions.map(r=><option key={r.code} value={r.code}>{r.code} · {r.name}</option>)}</select></L>
<L t="Número estimado de usuarios"><input type="number" min={1} className="inp" value={f.users} onChange={e=>set('users',+e.target.value)}/></L>
<L t="Nivel de disponibilidad"><select className="inp" value={f.availability} onChange={e=>set('availability',e.target.value)}>{['Estándar (99.9%)','Alta (99.99%)','Crítica (99.999%)'].map(o=><option key={o}>{o}</option>)}</select></L>
<L t="Objetivo de la migración"><select className="inp" value={f.goal} onChange={e=>set('goal',e.target.value)}>{['Modernización de aplicación','Reducción de costos','Escalabilidad global','Recuperación ante desastres'].map(o=><option key={o}>{o}</option>)}</select></L>
<div className="sm:col-span-2"><p className="mb-2 text-sm font-medium">Servicios Cloud seleccionados</p><div className="flex flex-wrap gap-2">{services.map(s=><button type="button" key={s.id} onClick={()=>tog(s.id)} className={`rounded-full border px-3 py-1 text-sm ${f.services.includes(s.id)?'border-brand bg-brand text-white':'border-line'}`}>{s.id}</button>)}</div></div>
<button className="btn sm:col-span-2">Guardar propuesta</button></form>
<div className="space-y-4">{list.length===0&&<div className="card text-sm text-mute">Aún no hay propuestas. Completa el formulario y guarda la primera.</div>}{list.map((p,i)=><div key={i} className="card"><h3 className="text-lg font-semibold">{p.name}</h3><p className="text-xs text-brand">{p.type} · {p.region}</p><p className="mt-2 text-sm text-mute">{p.desc}</p><dl className="mt-3 grid grid-cols-2 gap-2 text-sm"><div><dt className="text-xs text-mute">Usuarios</dt>{p.users.toLocaleString()}</div><div><dt className="text-xs text-mute">Disponibilidad</dt>{p.availability}</div><div className="col-span-2"><dt className="text-xs text-mute">Objetivo</dt>{p.goal}</div><div className="col-span-2"><dt className="text-xs text-mute">Servicios</dt>{p.services.join(', ')}</div></dl></div>)}</div></div>}
