import jwtDecode from "jwt-decode";
export function getuser(){
const token = localStorage.getItem('token');
console.log(token);
const decoded = jwtDecode(token);
const user_id = decoded.username;
return user_id;
}
