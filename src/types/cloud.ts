export type Status='ok'|'warn'|'error'
export interface Service{id:string;name:string;category:string;desc:string;fn:string;used:boolean;price:number}
export interface Region{name:string;code:string;loc:string;country:string;zones:number;edge:number;pos:[number,number];services:string[];status:Status}
export interface CostRow{id:number;service:string;qty:number;hours:number}
export interface Proposal{name:string;type:string;desc:string;region:string;users:number;availability:string;services:string[];goal:string}
export interface SecItem{title:string;detail:string;status:Status}
