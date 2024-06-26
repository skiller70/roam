import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

// LUCKY ID CONFIG
export const Config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.lucky.aora",
  projectId: "6668460c002d2242b9ea",
  databaseId: "666bdeff002e44728d34",
  userCollectionId: "666bdf2200131a5ea6aa",
  videoCollectionId: "666bdf460028973c9409",
  storageId: "666be0e600362a6ff499",
  placesId: "6676b1de002ecd0ee82e",
};

// export const Config = {
//   endpoint: "https://cloud.appwrite.io/v1",
//   platform: "com.dhanda.dhandaboys",
//   projectId: "666ea91d002ece323adf",
//   databaseId: "666eaa270026ea0e7bdc",
//   userCollectionId: "666eaa53001a3a42bc3f",
//   videoCollectionId: "666bdf460028973c9409",
//   storageId: "666be0e600362a6ff499",
// };
const { databaseId, userCollectionId, videoCollectionId, storageId, placesId } =
  Config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(Config.endpoint) // Your Appwrite Endpoint
  .setProject(Config.projectId) // Your project ID
  .setPlatform(Config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

// Register User

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    const newUser = await database.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new error();
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log(error);
    throw new error();
  }
};

export const getAccount = async () => {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId);
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt", Query.limit(7)),
    ]);
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query),
    ]);

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getAllPlace = async () => {
  try {
    const posts = await database.listDocuments(databaseId, placesId, [
      Query.orderDesc("$createdAt", Query.limit(7)),
    ]);

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
