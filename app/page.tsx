import { Suspense } from 'react';
import Container from './components/Container'
import ListingGrid from './components/listings/ListingGrid';

const Home = () => {

  return (<Container>
    <div className='pt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      <Suspense fallback={<div>Loading listings...</div>}>
        <ListingGrid />
      </Suspense>
    </div>
  </Container>)
}


export default Home;