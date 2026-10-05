import {Boxes,MapPin,DollarSign,CalendarDays,ShieldCheck,Server,Activity} from 'lucide-react'
import StatCard from '../components/StatCard';import StatusBadge from '../components/StatusBadge'
import {services,security,defaultRows,rowCost,usd,useLS,palette} from '../data/awsServices';import {CostRow} from '../types/cloud'
export default function Dashboard(){const [rows]=useLS<CostRow[]>('cloudops-costs',defaultRows);const [reg]=useLS<string>('cloudops-region','us-east-1')
const m=rows.reduce((a,r)=>a+rowCost(r),0),max=Math.max(...rows.map(rowCost),1),all=Object.values(security).flat()
const c=(s:string)=>all.filter(i=>i.status===s).length
return <div className="space-y-6"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
<StatCard label="Servicios utilizados" value={String(services.filter(s=>s.used).length)} icon={<Boxes size={20}/>}/>
<StatCard label="Región seleccionada" value={reg} icon={<MapPin size={20}/>}/>
<StatCard label="Costo mensual estimado" value={usd(m)} icon={<DollarSign size={20}/>} color="#F59E0B"/>
<StatCard label="Costo anual estimado" value={usd(m*12)} icon={<CalendarDays size={20}/>} color="#F59E0B"/>
<StatCard label="Recursos Cloud" value={String(rows.reduce((a,r)=>a+r.qty,0))} icon={<Server size={20}/>}/>
<StatCard label="Estado de seguridad" value={c('error')?'Requiere acción':'Estable'} icon={<ShieldCheck size={20}/>} color="#16A34A"/>
<StatCard label="Estado de la arquitectura" value="Operativa" icon={<Activity size={20}/>} color="#16A34A"/></div>
<div className="grid gap-6 lg:grid-cols-3"><div className="card lg:col-span-2"><h2 className="mb-4 text-lg font-semibold">Costo mensual por servicio</h2><div className="space-y-3">{rows.map((r,i)=><div key={r.id}><div className="flex justify-between text-sm"><span>{r.service}</span><span className="text-mute">{usd(rowCost(r))}</span></div><div className="h-3 rounded bg-line"><div className="h-3 rounded" style={{width:`${rowCost(r)/max*100}%`,background:palette[i%7]}}/></div></div>)}</div></div>
<div className="card"><h2 className="mb-4 text-lg font-semibold">Resumen de seguridad</h2><div className="space-y-3"><div className="flex justify-between"><StatusBadge status="ok"/><b>{c('ok')}</b></div><div className="flex justify-between"><StatusBadge status="warn"/><b>{c('warn')}</b></div><div className="flex justify-between"><StatusBadge status="error"/><b>{c('error')}</b></div></div></div></div></div>}
