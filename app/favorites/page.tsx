import getFavorites from "../actions/getFavorites";
import getSigninUser from "../actions/getSignedinUser";
import Empty from "../components/Empty";
import Favorites from "./Favorites";

const MyFavorites = async () => {
    const signedInUser = await getSigninUser();

    if(!signedInUser)
        return <Empty title="Unauthorized Page" subTitle="Please sign in to access the page."/>

    const favorites = await getFavorites();

    if(favorites.length === 0) 
        return <Empty title="No favorites yet." subTitle="You have no favorites yet." />

    return <Favorites favorites={favorites} signedInUser={signedInUser}/>
}
 
export default MyFavorites;