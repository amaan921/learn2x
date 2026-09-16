import {adminAccess} from './access';
import {chatGPTSignInPath,chatGPTSignOutPath} from '../chatgpt-auth';
import Dashboard from './dashboard';
export const dynamic='force-dynamic';
export default async function AdminPage(){
 const {user,allowed}=await adminAccess();
 if(!allowed)return <main className="admin-gate"><a href="/" className="admin-brand">learn<span>2x</span></a><div className="admin-gate-card"><div className="eyebrow">TUTOR WORKSPACE</div><h1>{user?'This account has no admin access.':'Your students. One place.'}</h1><p>{user?'Sign in with the Learn2X owner’s ChatGPT account to view demo requests.':'Sign in with your ChatGPT account (amaan2982@gmail.com) to view student enquiries securely.'}</p><a className="primary-link" target="_top" href={user?chatGPTSignOutPath('/admin'):chatGPTSignInPath('/admin')}>{user?'Sign out and switch account':'Sign in with ChatGPT'}</a><a className="admin-back" href="/">Back to the website</a></div></main>;
 return <Dashboard/>;
}
