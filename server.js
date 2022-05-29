import {ApolloServer, gql} from "apollo-server";

const tweets = [
    {
        id: "1",
        text: "Hello world",
        author: {
            id: "1",
            name: "Hira",
        }
    },
    {
        id: "2",
        text: "Hello world 2",
        author: {
            id: "2",
            name: "Jun99"
        }
    }
]

const typeDefs = gql`
    type User {
        id: ID
        username: String
    }
    type Tweet {
        id: ID
        text: String
        author: User
    }
    type Query {  
        allTweets: [Tweet]!  
        tweet(id: ID): Tweet
        ping: String!
    }
    type Mutation {
        postTweet(text: String, userId: ID): Tweet
        deleteTweet(id: ID): Boolean
    }
`

const resolvers = {
    Query: {
        allTweets() {
            return tweets
        },
        tweet(root, {id}) { // id === "1"
            console.log(typeof id)
            return tweets.find(tweet => tweet.id === id)
        },
        ping() {
            return "pong"
        }
    },
    Mutation: {

    }
}

const server = new ApolloServer({
    typeDefs, resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})

