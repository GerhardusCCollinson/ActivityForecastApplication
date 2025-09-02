import { ApolloServer } from '@apollo/server';
import { typeDefs } from './gql_typedefs';
import { resolvers } from './resolvers';
import { startStandaloneServer } from '@apollo/server/standalone';

const server = new ApolloServer({
	typeDefs,
	resolvers,
});


async function main () {
	const { url } = await startStandaloneServer(server, {
	  listen: { port: 4000 },
	});
	console.log(`Apollo Server ready at: ${url}`);
}

main();




