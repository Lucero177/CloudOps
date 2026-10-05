import {useState,useEffect} from 'react'
import {Service,Region,SecItem,CostRow} from '../types/cloud'
export const services:Service[]=[
{id:'EC2',name:'Amazon EC2',category:'Cómputo',desc:'Servidores virtuales redimensionables en la nube.',fn:'Ejecutar aplicaciones',used:true,price:0.0116},
{id:'S3',name:'Amazon S3',category:'Almacenamiento',desc:'Almacenamiento de objetos escalable y duradero.',fn:'Guardar archivos y backups',used:true,price:0.023},
{id:'RDS',name:'Amazon RDS',category:'Base de datos',desc:'Bases de datos relacionales administradas.',fn:'Gestionar datos relacionales',used:true,price:0.034},
{id:'IAM',name:'AWS IAM',category:'Seguridad',desc:'Control de identidades y permisos.',fn:'Autenticar y autorizar',used:true,price:0},
{id:'VPC',name:'Amazon VPC',category:'Redes',desc:'Red virtual aislada con subredes y rutas.',fn:'Aislar recursos de red',used:true,price:0.005},
{id:'Route53',name:'Amazon Route 53',category:'Redes',desc:'Servicio DNS altamente disponible.',fn:'Resolver dominios',used:true,price:0.0007},
{id:'CloudFront',name:'Amazon CloudFront',category:'Redes',desc:'Red de entrega de contenido (CDN).',fn:'Reducir latencia global',used:false,price:0.085}]
export const regions:Region[]=[
{name:'EE.UU. Este (N. Virginia)',code:'us-east-1',loc:'Norteamérica',country:'Virginia, Estados Unidos',zones:6,edge:32,pos:[-77.4,38.9],services:['EC2','S3','RDS','VPC','CloudFront'],status:'ok'},
{name:'EE.UU. Oeste (Oregón)',code:'us-west-2',loc:'Norteamérica',country:'Oregón, Estados Unidos',zones:4,edge:18,pos:[-122.7,45.6],services:['EC2','S3','RDS'],status:'ok'},
{name:'Europa (Irlanda)',code:'eu-west-1',loc:'Europa',country:'Dublín, Irlanda',zones:3,edge:14,pos:[-6.3,53.3],services:['EC2','S3','CloudFront'],status:'ok'},
{name:'Europa (Fráncfort)',code:'eu-central-1',loc:'Europa',country:'Fráncfort, Alemania',zones:3,edge:16,pos:[8.7,50.1],services:['EC2','S3','RDS','CloudFront'],status:'ok'},
{name:'Asia Pacífico (Bombay)',code:'ap-south-1',loc:'Asia Pacífico',country:'Bombay, India',zones:3,edge:12,pos:[72.9,19.1],services:['EC2','S3'],status:'ok'},
{name:'Asia Pacífico (Singapur)',code:'ap-southeast-1',loc:'Asia Pacífico',country:'Singapur',zones:3,edge:10,pos:[103.8,1.35],services:['EC2','S3'],status:'warn'},
{name:'Asia Pacífico (Tokio)',code:'ap-northeast-1',loc:'Asia Pacífico',country:'Tokio, Japón',zones:4,edge:15,pos:[139.7,35.7],services:['EC2','S3','CloudFront'],status:'ok'},
{name:'Sudamérica (São Paulo)',code:'sa-east-1',loc:'Sudamérica',country:'São Paulo, Brasil',zones:3,edge:8,pos:[-46.6,-23.5],services:['EC2','S3','RDS'],status:'ok'}]
export const security:Record<string,SecItem[]>={
'Protección de cuentas':[{title:'MFA en usuario raíz',detail:'Activado',status:'ok'},{title:'Rotación de claves de acceso',detail:'3 claves con más de 90 días',status:'warn'}],
'IAM':[{title:'Usuarios con permisos mínimos',detail:'12 de 14 usuarios',status:'warn'},{title:'Roles para servicios',detail:'EC2 y Lambda con rol propio',status:'ok'},{title:'Política AdministratorAccess',detail:'Asignada a 2 usuarios',status:'error'}],
'Protección de datos':[{title:'Cifrado en S3 y RDS',detail:'AES-256 activo',status:'ok'},{title:'Backups automáticos',detail:'Retención de 7 días',status:'ok'}],
'Cumplimiento':[{title:'ISO 27001 / SOC 2',detail:'Evidencia disponible en AWS Artifact',status:'ok'},{title:'Registro con CloudTrail',detail:'Habilitado en una región',status:'warn'}]}
export const defaultRows:CostRow[]=[{id:1,service:'EC2',qty:3,hours:730},{id:2,service:'RDS',qty:1,hours:730},{id:3,service:'S3',qty:500,hours:730}]
export const price=(id:string)=>services.find(s=>s.id===id)?.price??0
export const rowCost=(r:CostRow)=>price(r.service)*r.qty*r.hours
export const usd=(n:number)=>'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
export const palette=['#2563EB','#16A34A','#F59E0B','#DC2626','#64748B','#7C3AED','#0891B2']
export function useLS<T>(k:string,d:T):[T,(v:T)=>void]{
const [v,s]=useState<T>(()=>{try{const r=localStorage.getItem(k);return r?JSON.parse(r):d}catch{return d}})
useEffect(()=>{localStorage.setItem(k,JSON.stringify(v))},[k,v]);return [v,s]}
