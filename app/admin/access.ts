import {headers} from 'next/headers';
import {authDb,cookieValue,digest,passwordVersion,ADMIN_EMAIL} from './password-auth';
export async function adminAccess(){
 const requestHeaders=await headers();const raw=cookieValue(requestHeaders.get('cookie'));
 if(!raw)return {user:null,allowed:false};
 try{const row=await authDb().prepare('SELECT token_hash FROM admin_sessions WHERE token_hash = ? AND expires_at > ? AND password_version = ?').bind(await digest(raw),Date.now(),await passwordVersion()).first();
 if(!row)return {user:null,allowed:false};
 return {user:{email:ADMIN_EMAIL},allowed:true};
 }catch{return {user:null,allowed:false}}
}
