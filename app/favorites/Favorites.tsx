import { FC } from "react";
import Container from "../components/Container";
import { SafeListing, SafeUser } from "../types";
import ListingCard from "../components/listings/ListingCard";

interface IFavoritesProps {
    favorites: SafeListing[];
    signedInUser?: SafeUser | null;
}

const Favorites:FC<IFavoritesProps> = ({ favorites, signedInUser }) => {
    return (<Container>
         <div className="text-lg font-bold py-4">My All Favorites</div>
        <div className="grid grid-cols-1 sm:grid-cols-12 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((fav) => (
                <ListingCard key={fav.id}
                    data={fav}
                    signedInUser={signedInUser}/>
            ))}
        </div>
    </Container>  );
}
 
export default Favorites;