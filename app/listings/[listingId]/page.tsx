import getListing from "@/app/actions/getListing";
import getSigninUser from "@/app/actions/getSignedinUser";
import Empty from "@/app/components/Empty";
import Listing from "./Listing";
import getReservations from "@/app/actions/getReservations";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params } : { params: IParams }) => {

    const listing = await getListing(params);
    const reservations = await getReservations(params);
    const signedInuser = await getSigninUser();

    if(!listing) return <Empty />
    
    return (<Listing listing={listing} 
                reservations={reservations}
                signedInuser={signedInuser}/>);
}
 
export default ListingPage;