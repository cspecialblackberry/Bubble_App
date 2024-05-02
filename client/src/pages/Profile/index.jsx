// import Post from './components/Post';
// import ProfileImage from './components/ProfileImage';
// import PostSection from './components/PostSection';

//Hamburger Menu
// const EditMenu = () => {
//     return(

//     )
// }

//Profile will contain:
    //A given user ID (yours, or the person you clicked on)
    //Boolean about whether it's your profile or not (compare user in question ID to logged-in user ID)
    //Display:
        //User's name
        //User avatar
        //User Bio
        //User's latest "bubbles" (10?)
        //# of friends?
    
    //If it's your profile:
        //Give edit options:
            //Edit name
            //Edit avatar
            //Edit mycolor
            //Edit bio
            //Delete my posts
        

const Profile = () => {
    return(
        <>
            <h1>Name</h1>
            <ProfileImage></ProfileImage>
            <EditMenu></EditMenu>
            <Bio></Bio>
            <h2>My Bubbles:</h2>
            <PostSection></PostSection>
        </>
    )
}

export default Profile;
            