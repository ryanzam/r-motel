import Image from 'next/image'
import Container from './components/Container'
import NoListing from './components/Empty';
import getListings from './actions/getListings';
import ListingCard from './components/listings/ListingCard';
import getSigninUser from './actions/getSignedinUser';

export default async function Home() {

  const listings = await getListings();
  const signedInUser = await getSigninUser();

  if(listings.length == 0) 
    return <NoListing showRest/>

  return (<Container>
    <div className='pt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {listings.map(listing => {
        return <ListingCard key={listing.id} data={listing} signedInUser={signedInUser}/>
      })}
    </div>
  </Container>)
}
