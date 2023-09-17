import getReservations from "../actions/getReservations";
import getSigninUser from "../actions/getSignedinUser";
import Empty from "../components/Empty";
import Reservations from "./Reservations";

const MyReservations = async () => {

    const signedInUser = await getSigninUser();

    if(!signedInUser)
        return <Empty title="Unauthorized Page" subTitle="Please sign in to access the page."/>

    const reservations = await getReservations({ ownerId: signedInUser.id });

    if(reservations.length === 0) 
        return <Empty title="No reservations yet." subTitle="You haven't reserved anything yet." />

    return <Reservations reservations={reservations} signedInUser={signedInUser}/>
}
 
export default MyReservations;