import {ApolloServer, gql} from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "Hello world",
  },
  {
    id: "2",
    text: "Hello world 2",
  }
]
let users = [
  {
    id: "1",
    firstName: "Hira",
    lastName: "Sanae"
  },
  {
    id: "2",
    firstName: "Kana",
    lastName: "Owari"
  }
]

const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        fullName: String!
    }
    type Tweet {
        id: ID
        text: String
        author: User
    }
    type Mutation {
        postTweet(text: String, userId: ID): Tweet!
        deleteTweet(id: ID): Boolean
    }
    type Query {
        allUsers: [User!]!
        allTweets: [Tweet]!
        tweet(id: ID): Tweet
    }
`
const resolvers = {
  Query: {
    allUsers() {
      console.log("allUsers called")
      return users
    },
    allTweets() {
      return tweets
    },
    tweet(root, {id}) { // id === "1"
      console.log(root)
      return tweets.find(tweet => tweet.id === id)
    },
  },
  Mutation: {
    postTweet(root, {text, userId}) {
      console.log(root)
      const tweet = {
        id: tweets.length + 1,
        text,
      }
      tweets.push(tweet);
      return tweet;
    }
  },
  User: {
    fullName({firstName, lastName}) {
      console.log("fullName called")
      return `${firstName} ${lastName}`
    }
  }
}

const server = new ApolloServer({
  typeDefs, resolvers
})

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`)
})

