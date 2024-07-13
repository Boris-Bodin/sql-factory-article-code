# SqlClient and SqlFactory for PostgreSQL

This repository contains a simple and efficient wrapper for interacting with PostgreSQL databases in a Node.js application. The implementation leverages the `pg` package, the Factory Pattern, and the AsyncDisposable concept to manage database connections and queries.

## Features

- **SqlClient**: Manages individual database connections and executes queries.
- **SqlFactory**: Supports multiple database configurations and provides a convenient interface for executing queries.
- **Connection Management**: Ensures proper connection handling with AsyncDisposable.
- **Query Execution**: Simplifies executing SQL queries and retrieving results.

## Installation

Install the required dependencies:

```bash
npm install
```

## Usage

### Registering a Remote Database

Use the `SqlFactory` to register your database configurations. Each configuration is identified by a unique key.

```typescript
import { SqlFactory } from "./sql-factory";

SqlFactory.registerRemote("R1", {
    host: 'localhost',
    port: 5432,
    user: 'user',
    password: 'password',
    database: 'database'
});

SqlFactory.registerRemote("R2", {
    host: 'remotehost',
    port: 5432,
    user: 'anotherUser',
    password: 'anotherPassword',
    database: 'anotherDatabase'
});
```

### Creating a Query Factory Function

Create a query factory function that generates the SQL query string based on the provided options.

```typescript
const queryFactory = (queryOpts) => `SELECT * FROM table WHERE id = ${queryOpts.id}`;
```

### Executing Queries

Use the `SqlFactory` to execute queries with the specified configuration and options.

```typescript
async function runQueries() {
    try {
        const result1 = await SqlFactory.query("R1", queryFactory, { id: 1 });
        console.log("Result 1:", result1);
        
        const result2 = await SqlFactory.query("R1", queryFactory, { id: 2 });
        console.log("Result 2:", result2);
    } catch (e) {
        console.error("Error executing queries:", e);
    }
}

runQueries();
```

### Code Structure

- **sql-client.ts**: Contains the `SqlClient` class for managing individual database connections.
- **sql-factory.ts**: Contains the `SqlFactory` class for managing multiple database configurations and executing queries.

### Improvements

While this implementation provides a solid foundation, it has some limitations, such as not reusing connections efficiently. Here are some suggested improvements:

1. **Connection Pooling**: Use a connection pool to manage and reuse connections efficiently.
2. **Caching Connections**: Implement a mechanism to cache and reuse `SqlClient` instances.
3. **Enhanced Error Handling**: Add retry mechanisms, better logging, and fallback strategies.
4. **Query Builder**: Implement a query builder to generate SQL queries dynamically.
5. **Parameterized Queries**: Use parameterized queries to prevent SQL injection attacks.
6. **Transaction Support**: Add support for transactions and rollbacks.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

## Further Reading and Resources

- [pg NPM package documentation](https://www.npmjs.com/package/pg)
- [Factory Pattern - Wikipedia](https://en.wikipedia.org/wiki/Factory_method_pattern)

Happy coding!
