## What is PostgreSQL?

**PostgreSQL** is an advanced, open-source relational database management system (RDBMS) known for its extensibility, robustness, and compliance with SQL standards. It supports ACID (Atomicity, Consistency, Isolation, Durability) transactions, making it a preferred choice for high-performance applications.

### How is PostgreSQL Different from Other Databases?

- **Compared to MySQL**: PostgreSQL provides more advanced features like full ACID compliance, better support for JSON, and richer indexing options.
- **Compared to MongoDB**: PostgreSQL is relational, whereas MongoDB is NoSQL (document-based). PostgreSQL supports structured data with strict schema constraints, while MongoDB provides schema flexibility.
- **Compared to Firebase**: Firebase is a NoSQL real-time database, whereas PostgreSQL is relational. PostgreSQL is better suited for complex queries and analytics, while Firebase is ideal for real-time applications.

## PostgreSQL in Supabase

Supabase is a backend-as-a-service (BaaS) built on **PostgreSQL**. It provides:

- **Database Hosting**: A managed PostgreSQL instance with automatic backups.
- **Row-Level Security (RLS)**: Fine-grained access control at the database level.
- **Auto-Generated APIs**: RESTful APIs and RPC endpoints based on PostgreSQL functions.
- **Realtime Database**: PostgreSQL with real-time capabilities for instant updates.
- **Extensions**: Support for advanced PostgreSQL extensions like PostGIS (geospatial queries) and pgvector (AI embeddings).

## What is RPC (Remote Procedure Call)?

**RPC (Remote Procedure Call)** is a method that allows executing functions on a remote server as if they were local functions. In Supabase, PostgreSQL functions can be called as RPC endpoints, enabling efficient data retrieval and manipulation without exposing direct database queries.

## Why Do We Need RPC in Supabase?

- It allows executing complex database logic on the server, reducing client-side processing.
- Prevents exposing direct database queries, improving security.
- Simplifies frontend code by encapsulating logic inside PostgreSQL functions.
- Improves performance by reducing the number of API calls and optimizing SQL execution.

## Benefits of Using PostgreSQL Functions as RPCs

✅ **Performance**: Executes directly on the database, reducing network overhead.  
✅ **Security**: Business logic runs securely on the backend, preventing direct table access.  
✅ **Reusability**: Encapsulates logic, making it easier to maintain.  
✅ **Reduced Latency**: Minimizes round trips between the client and the database.

```sql
-- Creating a PostgreSQL function in Supabase
CREATE OR REPLACE FUNCTION get_user_by_id(uid UUID)
RETURNS TABLE(id UUID, name TEXT, email TEXT)
LANGUAGE sql
SECURITY DEFINER
AS $$
SELECT id, name, email FROM users WHERE id = uid;
$$;
```

```javascript
// Calling the function using Supabase RPC
import { supabase } from '../supabaseClient'; // Ensure you've initialized Supabase

async function getUserById(userId) {
  const { data, error } = await supabase.rpc('get_user_by_id', { uid: userId });

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}
```

```sql
-- Creating a function to insert a new user
CREATE OR REPLACE FUNCTION create_user(name TEXT, email TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id UUID;
BEGIN
  INSERT INTO users (name, email) VALUES (name, email)
  RETURNING id INTO new_user_id;

  RETURN new_user_id;
END;
$$;
```

```javascript
// Calling the create_user function
async function createUser(name, email) {
  const { data, error } = await supabase.rpc('create_user', { name, email });

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }

  return data; // Returns the new user ID
}
```

```sql
-- Granting execution privileges for authenticated users
ALTER FUNCTION get_user_by_id(UUID) OWNER TO postgres;
GRANT EXECUTE ON FUNCTION get_user_by_id(UUID) TO authenticated;
```
