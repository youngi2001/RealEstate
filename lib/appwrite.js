import { Query } from 'appwrite';
import { Client, Account, ID, Databases, Storage } from 'react-native-appwrite';
import { gallery } from '../constants/data';


export const config = {
    endpoint: 'http://192.168.10.60/v1',
    platform: "com.trackerhome.realestate",
    projectId: '6772ab9d003e2569fb31',
    databaseId: "6772ac7a002296b7a76b",
    userCollectionId: "6772ac87001a17f5e863",
    agentsCollectionId: "677691cb00038ba1df8a",
    galleriesCollectionId: "677692a9000c44fc60e6",
    reviewsCollectionId: "677692e7003a5777df8d",
    propertiesCollectionId: "67769365001955a9d431",
    storageId: "6772adc0001629268ff1",

}

const { endpoint, platform, projectId, databaseId, userCollectionId, storageId, agentsCollectionId, galleriesCollectionId, reviewsCollectionId, propertiesCollectionId } = config;


export const client = new Client();
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setPlatform(platform);



export const createUser = async ({ email, password, username }) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) {
            throw new Error("Account not created");
        }

        //sign user in
        const signInResponse = await signIn({ email, password });
        if (!signInResponse) {
            throw new Error("Sign in failed");
        } 

        // Create a new user in the database
        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
            ID.unique(),
            {
                userId: newAccount.$id,
                username: username,
                email: email,
            }
        )
        return newUser;

    } catch (error) {
        console.log(error)

    }
}

export const signIn = async ({ email, password }) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const signOut = async () => {
    try {
        const endSession = await account.deleteSession('current');
        return endSession;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) {
            throw new Error("No user found");
        }

        //getting the current use by comparing the account id of the logged in user with the user id in the database
        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [
                Query.equal("userId", currentAccount.$id)
            ]
        )

        if (!currentUser) {
            throw Error;
        }

        return currentUser.documents[0];

    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateUserDetails = async (fullName, phoneNumber, city, region, country, landmark) => {
    try {

        //get the current user
        const currentAccount = await account.get();
        if (!currentAccount) {
            throw new Error("No user found");
        }


        //get the current user info from the database
        const currentUserInfo = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [
                Query.equal("userId", currentAccount.$id)
            ]

        )

        //get the document id of the current user
        const documentId = currentUserInfo.documents[0].$id;


        const results = await databases.updateDocument(
            databaseId,
            userCollectionId,
            documentId,
            {
                fullName: fullName,
                phoneNumber: phoneNumber,
                city: city,
                region: region,
                country: country,
                landmark: landmark,
            }

        )

        return results;

    } catch (error) {
        console.log(error)
    }
}

export const uploadProfileImg = async (uri) => {
    try {
        const uploadProfileImg = await storage.createFile(
            storageId,
            ID.unique(),
            InputFile.fromFile(uri)
        );
        return uploadProfileImg;

    } catch (error) {
        console.log(error)
    }
}

export const getFeaturedProperties = async () => {
    try {
        const result = await databases.listDocuments(
            databaseId,
            propertiesCollectionId,
            [Query.orderAsc("$createdAt"), Query.limit(5)],
        )

        return result.documents;

    } catch (error) {
        console.log(error)
        return [];
    }
}

export const getProperties = async ({filter, query, limit}) => {
    try {

        const buildQuery = [Query.orderDesc("$createdAt")];
        
        //filter by type
        if (filter !== "All") {
            buildQuery.push(Query.equal("type", filter))
        } 

        if (query) {
            buildQuery.push(Query.or([
                Query.search("name", query),
                Query.search("address", query),
                Query.search("type", query),
            ]))
        }

        if (limit) {
            buildQuery.push(Query.limit(limit))
        }
        const result = await databases.listDocuments(
            databaseId,
            propertiesCollectionId,
            buildQuery
        )

        return result.documents;
    } catch (error) {
        console.log(error)
        return [];
        //throw new Error(error.message);
    }
}

export const getPropertiesByFilter = async (filter) => {
    try {
        

        const result = await databases.listDocuments(
            databaseId,
            propertiesCollectionId,
            [Query.equal("type", filter), Query.limit(6)]
        )
        //console.log(result.documents)
        return result.documents;
    } catch (error) {
        console.log(error)
        return []
    }
}