import {env} from 'cloudflare:workers';
import {adminAccess} from '../../../admin/access';
export const dynamic='force-dynamic';
const response=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'private, no-store','Vary':'Cookie'}});
export async function GET(request:Request){
 const {user,allowed}=await adminAccess();
 if(!user)return response({error:'Please sign in to view requests.'},401);
 if(!allowed)return response({error:'This account has no admin access.'},403);
 const url=new URL(request.url);const search=(url.searchParams.get('search')||'').trim().slice(0,100);const grade=url.searchParams.get('grade')||'';const subject=url.searchParams.get('subject')||'';const page=Math.max(1,Math.min(10000,parseInt(url.searchParams.get('page')||'1',10)||1));
 const clauses:string[]=[];const args:string[]=[];
 if(search){clauses.push("(student LIKE ? ESCAPE '\\' OR contact LIKE ? ESCAPE '\\' OR email LIKE ? ESCAPE '\\' OR phone LIKE ? ESCAPE '\\' OR id LIKE ? ESCAPE '\\')");const pattern='%'+search.replace(/[\\%_]/g,'\\$&')+'%';args.push(...Array(5).fill(pattern));}
 if(grade){clauses.push('grade = ?');args.push(grade)}if(subject){clauses.push('subject = ?');args.push(subject)}
 const where=clauses.length?' WHERE '+clauses.join(' AND '):'';
 try{const db=env.DB;if(!db)throw new Error('Database unavailable');
 const result=await db.batch([
 db.prepare('SELECT * FROM demo_requests'+where+' ORDER BY created_at DESC, id DESC LIMIT 25 OFFSET ?').bind(...args,(page-1)*25),
 db.prepare('SELECT COUNT(*) AS count FROM demo_requests'+where).bind(...args),
 db.prepare("SELECT COUNT(*) AS total, SUM(CASE WHEN date(created_at,'+5 hours','+30 minutes')=date('now','+5 hours','+30 minutes') THEN 1 ELSE 0 END) AS today, SUM(CASE WHEN grade IN ('9','10') THEN 1 ELSE 0 END) AS senior FROM demo_requests")]);
 return response({requests:result[0].results,total:result[1].results[0].count,stats:result[2].results[0],page,pageSize:25});
 }catch(e){console.error('Admin requests unavailable',e instanceof Error?e.message:'Unknown error');return response({error:'Unable to load requests. Please try again.'},503)}
}
