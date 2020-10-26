const axios = require('axios')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')
const server = 'http://localhost:3000'

const filmType = new GraphQLObjectType({
    name: 'film',
    fields: () => ({
      id: { type: GraphQLInt },
      title: { type: GraphQLString },
      director: { type: GraphQLString },
      year: { type: GraphQLInt },
      genre :{ type: GraphQLString },
      score :{ type: GraphQLInt },
      filmRate:{ type:GraphQLString }
    }),
  })

  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      films: {
        type: new GraphQLList(filmType),
        resolve(_parentValue_, _args_) {
          return axios.get(`${server}/films/`)
            .then(res => res.data)
        }
      }
    }
  })

  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addFilm: {
        type: filmType,
        args: {
          title: { type: new GraphQLNonNull(GraphQLString) },
          director: { type: new GraphQLNonNull(GraphQLString) },
          year: { type: new GraphQLNonNull(GraphQLInt) },
          genre :{ type: new GraphQLNonNull(GraphQLString) },
          score :{ type: GraphQLNonNull(GraphQLInt)},
          filmRate:{ type: GraphQLNonNull(GraphQLString) }
        },
        resolve(parentValue, args) {
          return axios.post(`${server}/films`, {
            title: args.title,
            film: args.film,
            year: args.year,
            genre: args.genre,
            score: args.score,
            filmRate: args.filmRate,

          }).then(res => res.data)
        },
      },
      findFilm: {
        type: filmType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve(parentValue, args) {
          return axios.get(`${server}/films/${args.id}`)
            .then(res => res.data)
        }
      },
      updateFilm: {
        type: filmType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
          title: { type: GraphQLString },
          director: { type: GraphQLString },
          year: { type: GraphQLInt },
          genre :{ type: GraphQLString },
          score :{ type: GraphQLInt },
          filmRate:{ type:GraphQLString }
        },
        resolve(parentValue, args) {
          return axios.put(`${server}/films/${args.id}`, args)
            .then(res => res.data)
        },
      },
      deleteFilm: {
        type: filmType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve(parentValue, args) {
          return axios.delete(`${server}/films/${args.id}`, args )
           .then(res => res.data)
        },
      },
    }
  })

  module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
  })