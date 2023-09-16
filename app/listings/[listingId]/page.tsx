import getListing from "@/app/actions/getListing";
import getSigninUser from "@/app/actions/getSignedinUser";
import NoListing from "@/app/components/NoListing";
import Listing from "./Listing";
import getReservations from "@/app/actions/getReservations";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params } : { params: IParams }) => {

    const listing = await getListing(params);
    const reservations = await getReservations(params);
    const signedInuser = await getSigninUser();

    if(!listing) return <NoListing />
    
    return (<Listing listing={listing} 
                reservations={reservations}
                signedInuser={signedInuser}/>);
}
 
export default ListingPage;