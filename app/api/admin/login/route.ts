import {ADMIN_EMAIL,COOKIE,authDb,digest,json,passwordVersion,rateAllowed,sameOrigin,token,verifyPassword} from '../../../admin/password-auth';
export async function POST(request:Request){
 if(!sameOrigin(request))return json({error:'Please sign in from the Learn2X website.'},403);
 try{
 if(!await rateAllowed(request))return json({error:'Too many sign-in attempts. Please wait 15 minutes and try again.'},429,{'Retry-After':'900'});
 const raw=await request.text();if(raw.length>2048)return json({error:'Invalid sign-in details.'},400);
 let body;try{body=JSON.parse(raw)}catch{return json({error:'Invalid sign-in details.'},400)}
 if(typeof body.email!=='string'||typeof body.password!=='string'||body.password.length>128||body.email.length>254)return json({error:'Invalid email or password.'},401);
 const valid=await verifyPassword(body.password);
 if(body.email.trim().toLowerCase()!==ADMIN_EMAIL||!valid)return json({error:'Invalid email or password.'},401);
 const session=token(),now=Date.now();await authDb().batch([
 authDb().prepare('DELETE FROM admin_sessions WHERE expires_at <= ?').bind(now),
 authDb().prepare('INSERT INTO admin_sessions (token_hash,expires_at,password_version) VALUES (?,?,?)').bind(await digest(session),now+8*60*60*1000,await passwordVersion())]);
 return json({ok:true},200,{'Set-Cookie':`${COOKIE}=${session}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`});
 }catch{console.error('Admin sign-in unavailable');return json({error:'Sign-in is temporarily unavailable. Please try again.'},503)}
}
