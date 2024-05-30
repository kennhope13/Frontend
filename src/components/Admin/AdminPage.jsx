import Admin from "./Admin";
import "./Admin.css";
const AdminPage = (props) =>{
    const {allUsers} = props;
    return(
        <section>
            {allUsers.map((allUsers)=>{
                return(
                    <div key={allUsers._id}>
                        <Admin id={allUsers._id} Email={allUsers.Email} Name={allUsers.Name} Image={allUsers.Image}></Admin>
                    </div>
                )
            })}
        </section>
    )
}
export default AdminPage