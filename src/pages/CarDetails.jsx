import { useParams } from "react-router"


function CarDetail() {
  const { id } = useParams();
  return (<>
    <h1>Car Detail </h1>
    <p>{ id }</p>
    </>
  )
}

export default CarDetail