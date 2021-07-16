import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList'

function HomePage(props) {
    return (<MeetupList meetups={props.meetups}/>);

}

// export async function getServerSideProps(context) {
//     // pobranie danych z API

//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }

export async function getStaticProps() {
    // pobranie danych z API
    const client = await MongoClient.connect(
        "mongodb+srv://michbodura:29TrDIwH7KNp7xwo@cluster0.v4ce2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    };
}


export default HomePage;