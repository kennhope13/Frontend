import DogCart from "./DogsCart";
import "./Dogs.css";
import { Typography } from "@mui/material";
const DogsPage = (props) => {
    const { alldogs } = props;
    // console.log("all dog: ",props);
    return (

        <div className="container">
            <Typography variant="h4" sx={{ color: '#9c6644', fontFamily: "Inter, sans-serif" }} textAlign={"center"} gutterBottom>DANH SÁCH CHÓ</Typography>
            <section className="dogs-container">
            {alldogs.map((alldogs) => {
                return (
                    <div key={alldogs.id}>
                        <DogCart id={alldogs.id} name={alldogs.name} breed={alldogs.breed} decription={alldogs.decription} price = {alldogs.price} imageUrl = {alldogs.imageUrl}/>
                    </div>
                )
            })}
        </section>
        </div>

    );
}
export default DogsPage;