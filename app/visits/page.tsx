import getReservations from "../actions/getReservations";
import getSigninUser from "../actions/getSignedinUser";
import Empty from "../components/Empty";
import Visits from "./Visits";

const MyVisits = async () => {

    const signedInUser = await getSigninUser();

    if(!signedInUser)
        return <Empty title="Unauthorized Page" subTitle="Please sign in to access the page."/>

    const reservations = await getReservations({ userId: signedInUser.id});

    if(reservations.length === 0) 
        return <Empty title="No visits yet." subTitle="You haven't reserved any visits." />

    return <Visits reservations={reservations} signedInUser={signedInUser}/>
}
 
export default MyVisits;