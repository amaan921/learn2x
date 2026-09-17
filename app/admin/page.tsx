export const metadata = {title:'Tutor login | Learn2X',robots:{index:false,follow:false}};
import {adminAccess} from './access';
import Dashboard from './dashboard';
import Login from './login';
export const dynamic='force-dynamic';
export default async function AdminPage(){const {allowed}=await adminAccess();return allowed?<Dashboard/>:<Login/>;}
