import {NavLink} from 'react-router-dom';import {LayoutDashboard,ClipboardList,DollarSign,Globe,ShieldCheck,Network,Boxes,Cloud,X} from 'lucide-react'
export const nav=[
{to:'/dashboard',label:'Dashboard',sub:'Resumen general de la solución Cloud',icon:LayoutDashboard},
{to:'/planning',label:'Planificación Cloud',sub:'Registra tu propuesta de solución',icon:ClipboardList},
{to:'/costs',label:'Costos',sub:'Estimación de costos y economía Cloud',icon:DollarSign},
{to:'/infrastructure',label:'Infraestructura Global',sub:'Regiones y servicios desplegados',icon:Globe},
{to:'/security',label:'Seguridad',sub:'Responsabilidad compartida, IAM y cumplimiento',icon:ShieldCheck},
{to:'/network',label:'Arquitectura de Red',sub:'Internet, Route 53, CloudFront y VPC',icon:Network},
{to:'/services',label:'Servicios AWS',sub:'Catálogo de servicios',icon:Boxes}]
export default function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}){return <>{open&&<div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose}/>}<aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-side p-4 text-slate-300 transition-transform lg:translate-x-0 ${open?'':'-translate-x-full'}`}><div className="mb-6 flex items-center gap-2 px-2 text-lg font-bold text-white"><Cloud className="text-brand"/>CloudOps<button className="ml-auto lg:hidden" aria-label="Cerrar" onClick={onClose}><X size={18}/></button></div><nav className="space-y-1">{nav.map(n=><NavLink key={n.to} to={n.to} onClick={onClose} className={({isActive})=>`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${isActive?'bg-brand text-white':'hover:bg-slate-800'}`}><n.icon size={18}/>{n.label}</NavLink>)}</nav></aside></>}
