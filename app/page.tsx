import Image from 'next/image'
import Container from './components/Container'
import NoListing from './components/Empty';
import getListings, { IListingsParams } from './actions/getListings';
import ListingCard from './components/listings/ListingCard';
import getSigninUser from './actions/getSignedinUser';

interface IHomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: IHomeProps) => {

  const listings = await getListings(searchParams);
  const signedInUser = await getSigninUser();

  if(listings.length == 0) 
    return <NoListing showRest/>

  return (<Container>
    <div className='pt-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {listings.map(listing => {
        return <ListingCard key={listing.id} data={listing} signedInUser={signedInUser}/>
      })}
    </div>
  </Container>)
}


export default Home;