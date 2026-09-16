import {COOKIE,authDb,cookieValue,digest,json,sameOrigin} from '../../../admin/password-auth';
export async function POST(request:Request){
 if(!sameOrigin(request))return json({error:'Invalid request origin.'},403);
 try{const raw=cookieValue(request.headers.get('cookie'));if(raw)await authDb().prepare('DELETE FROM admin_sessions WHERE token_hash = ?').bind(await digest(raw)).run();
 return new Response(null,{status:303,headers:{Location:'/admin','Cache-Control':'no-store','Set-Cookie':`${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`}});
 }catch{return json({error:'Could not sign out. Please try again.'},503)}
}
