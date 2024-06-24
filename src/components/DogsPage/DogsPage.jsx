import DogCart from "./DogsCart";
import "./Dogs.css";
const DogsPage = (props) => {
    const { alldogs } = props;
    // console.log("all dog: ",props);
    return (

        <section className="dogs-container">
            {alldogs.map((alldogs) => {
                return (
                    <div key={alldogs.id}>
                        <DogCart id={alldogs.id} name={alldogs.name} breed={alldogs.breed} decription={alldogs.decription} price = {alldogs.price} imageUrl = {alldogs.imageUrl}/>
                    </div>
                )
            })}
        </section>

    );
}
export default DogsPage;