import { MongoClient } from "mongodb";

async function handler(req,res) {
    if (req.method === 'POST') {
        const data = req.body;
        
        const client = await MongoClient.connect(
            "mongodb+srv://michbodura:29TrDIwH7KNp7xwo@cluster0.v4ce2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        );
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
    
        const result = await meetupsCollection.insertOne(data);
    
        console.log(result);
    
        client.close();
       res.status(201).json({meesage:'Dodano meetup!'})
    }
}

export default handler;