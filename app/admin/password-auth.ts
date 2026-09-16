import {env} from 'cloudflare:workers';
export const ADMIN_EMAIL='amaan2982@gmail.com';
export const COOKIE='__Host-learn2x-admin';
const encoder=new TextEncoder();
export function authDb(){if(!env.DB)throw Error('Authentication unavailable');return env.DB;}
export async function digest(value:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(value))),b=>b.toString(16).padStart(2,'0')).join('');}
export function token(){return Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');}
export async function verifyPassword(password:string){
 const config=(env as unknown as {ADMIN_PASSWORD_HASH?:string}).ADMIN_PASSWORD_HASH;
 if(!config)throw Error('Admin password not configured');
 const {salt,hash,iterations}=JSON.parse(config);
 if(iterations!==100000||typeof salt!=='string'||typeof hash!=='string')throw Error('Invalid password configuration');
 const key=await crypto.subtle.importKey('raw',encoder.encode(password),'PBKDF2',false,['deriveBits']);
 const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:encoder.encode(salt),iterations},key,256);
 const actual=Array.from(new Uint8Array(bits),b=>b.toString(16).padStart(2,'0')).join('');
 let difference=actual.length^hash.length;for(let i=0;i<actual.length;i++)difference|=actual.charCodeAt(i)^(hash.charCodeAt(i)||0);
 return difference===0;
}
export async function passwordVersion(){const value=(env as unknown as {ADMIN_PASSWORD_HASH?:string}).ADMIN_PASSWORD_HASH;if(!value)throw Error('Admin password not configured');return digest(value);}
export function cookieValue(raw:string|null){const value=raw?.split(';').map(p=>p.trim()).find(p=>p.startsWith(COOKIE+'='))?.slice(COOKIE.length+1);return value&&/^[a-f0-9]{64}$/.test(value)?value:null;}
export function sameOrigin(request:Request){return request.headers.get('origin')===new URL(request.url).origin;}
export function json(data:unknown,status=200,headers:Record<string,string>={}){return Response.json(data,{status,headers:{'Cache-Control':'private, no-store',...headers}});}
export async function rateAllowed(request:Request){
 const db=authDb(),now=Date.now(),windowMs=15*60*1000,start=Math.floor(now/windowMs)*windowMs;
 const ip=request.headers.get('cf-connecting-ip')||'unknown';const keys=[await digest('login-ip:'+ip),await digest('login-global')];
 const results=await db.batch(keys.map(key=>db.prepare('INSERT INTO admin_login_limits (id,window_start,attempts) VALUES (?,?,1) ON CONFLICT(id) DO UPDATE SET attempts = CASE WHEN window_start = excluded.window_start THEN attempts + 1 ELSE 1 END, window_start = excluded.window_start RETURNING attempts').bind(key,start)));
 return Number(results[0].results[0].attempts)<=10&&Number(results[1].results[0].attempts)<=100;
}
