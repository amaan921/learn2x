import {getChatGPTUser} from '../chatgpt-auth';
// This identity is supplied by the Sites dispatcher after ChatGPT sign-in.
// Never accept an email or role from form inputs, query parameters, or cookies.
export async function adminAccess(){
 const user=await getChatGPTUser();
 if(!user)return {user:null,allowed:false};
 return {user,allowed:user.email.toLowerCase()==='amaan2982@gmail.com'};
}
