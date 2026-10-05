import {useState} from 'react'
import {geoNaturalEarth1,geoPath,geoGraticule10} from 'd3-geo'
import {feature} from 'topojson-client'
import world from 'world-atlas/countries-110m.json'
import {Plus,Minus,RotateCcw} from 'lucide-react'
import {Region} from '../types/cloud'
const W=960,H=500
const col={ok:'#22C55E',warn:'#F59E0B',error:'#EF4444'}
const label={ok:'Operativa',warn:'Latencia elevada',error:'Mantenimiento'}
const always=new Set(['us-east-1','eu-west-1','sa-east-1','ap-southeast-1']) // regiones con etiqueta permanente
const reduce=typeof matchMedia!=='undefined'&&matchMedia('(prefers-reduced-motion: reduce)').matches
const proj=geoNaturalEarth1().fitSize([W,H],{type:'Sphere'} as any),path=geoPath(proj)
const land=(feature(world as any,(world as any).objects.countries) as any).features as any[]
const sphere=path({type:'Sphere'} as any)!,grat=path(geoGraticule10())!
const P=(r:Region)=>proj(r.pos)!
const arc=(a:number[],b:number[])=>`M${a[0]},${a[1]} Q${(a[0]+b[0])/2},${Math.min(a[1],b[1])-60} ${b[0]},${b[1]}`
export default function WorldMap({all,list,sel,onSelect}:{all:Region[];list:Region[];sel:string;onSelect:(c:string)=>void}){
const [z,setZ]=useState(1),[c,setC]=useState<[number,number]>([W/2,H/2]),[hov,setHov]=useState('')
const vw=W/z,vh=H/z,x=Math.min(Math.max(c[0]-vw/2,0),W-vw),y=Math.min(Math.max(c[1]-vh/2,0),H-vh)
const hub=P(all.find(r=>r.code==='us-east-1')!),cur=all.find(r=>r.code===sel)
const pick=(r:Region)=>{onSelect(r.code);if(z>1)setC(P(r))}
const zoom=(d:number)=>setZ(Math.min(4,Math.max(1,z+d)))
const links=list.filter(r=>r.code!=='us-east-1')
return <div className="relative overflow-hidden rounded-xl bg-[#0B1220]"><svg viewBox={`${x} ${y} ${vw} ${vh}`} className="w-full" role="group" aria-label="Mapa de regiones AWS">
<path d={sphere} fill="#0C1B3F" stroke="#1E3A6E" strokeWidth={1.2/z}/>
<path d={grat} fill="none" stroke="#2B4C8C" strokeWidth={0.5/z} opacity={0.35}/>
{land.map((f,i)=><path key={i} d={path(f)??''} fill="#1F3B73" stroke="#3B5BA0" strokeWidth={0.4/z}/>)}
{links.map(r=>{const p=P(r),a=r.code===sel;return <path key={r.code} d={arc(hub,p)} fill="none" stroke="#38BDF8" strokeWidth={(a?2.4:1.6)/z} strokeDasharray={`${6/z} ${5/z}`} opacity={a?1:0.75}/>})}
{links.map((r,i)=>{const p=P(r),d=arc(hub,p);return reduce
?<circle key={r.code} cx={(hub[0]+2*(hub[0]+p[0])/2+p[0])/4} cy={(hub[1]+2*(Math.min(hub[1],p[1])-60)+p[1])/4} r={3.5/z} fill="#fff"/>
:<circle key={r.code} r={3.5/z} fill="#fff"><animateMotion dur="5s" begin={`${i*0.8}s`} repeatCount="indefinite" path={d}/></circle>})}
{list.map(r=>{const p=P(r),a=r.code===sel,show=always.has(r.code)||a||hov===r.code,left=p[0]>W-130
return <g key={r.code} tabIndex={0} role="button" aria-label={`${r.name}, ${r.code}, ${label[r.status]}`} className="cursor-pointer outline-none" onClick={()=>pick(r)} onKeyDown={e=>e.key==='Enter'&&pick(r)} onMouseEnter={()=>setHov(r.code)} onMouseLeave={()=>setHov('')} onFocus={()=>setHov(r.code)} onBlur={()=>setHov('')}>
<circle cx={p[0]} cy={p[1]} r={14/z} fill={col[r.status]} opacity={0.14}/>
<circle cx={p[0]} cy={p[1]} r={14/z} fill="none" stroke={a?'#fff':col[r.status]} strokeWidth={(a?2:1.4)/z} opacity={a?1:0.55}/>
<circle cx={p[0]} cy={p[1]} r={(a?8:7)/z} fill={col[r.status]} stroke="#fff" strokeWidth={1.5/z}/>
{show&&<text x={p[0]+(left?-14:14)/z} y={p[1]+4/z} textAnchor={left?'end':'start'} fontSize={12.5/z} fontWeight={700} fill="#fff" stroke="#0B1220" strokeWidth={3/z} paintOrder="stroke">{r.code}</text>}</g>})}
</svg>
<div className="pointer-events-none absolute left-2 top-2 max-w-[230px] rounded-lg bg-white/95 px-3 py-2 text-xs text-slate-500 shadow dark:bg-slate-100"><p>Haz clic en una región del mapa para ver su detalle.</p>{cur&&<p className="mt-1 font-semibold text-slate-800">{cur.code} · {label[cur.status]}</p>}</div>
<div className="absolute right-2 top-2 flex gap-1">{[[Plus,()=>zoom(1),'Acercar'],[Minus,()=>zoom(-1),'Alejar'],[RotateCcw,()=>{setZ(1);setC([W/2,H/2])},'Restablecer']].map(([I,f,l]:any)=><button key={l} aria-label={l} onClick={f} className="grid h-8 w-8 place-items-center rounded-lg border border-slate-600 bg-slate-800/90 text-slate-200 shadow-sm hover:bg-slate-700"><I size={15}/></button>)}</div></div>}
