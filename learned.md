# LEARNED - SILVER LINING FROM THIS PROJECT:

## DEVELOPMENT RELATED TOPICS:
### USE TEMPLATE:
- Which should contain the following:
   - npm packages:
      - express
      - express-validator
      - ejs
      - dotenv (optional)
      - pg
   - folder structure
      - /views
      - /db
      - /controllers
      - /files (to serve directly?)
      - /errors
      - /routes

## CONCEPT LEARNING TOPICS:
### DATABASE DESIGN:
1. Requirements Analysis/Conceptual Modeling (The idea/business rules):
   1.  Define Core entities:
      - Players
      - Heroes
      - Roles
   2. Define entity attributes and unique identifier?
   transactional tables are the ones that are constantly adding new data
   reference tables are the one that contain standardized data that other tables point to via FKs
   The rule reference tables follow is: Insertions and Updates happen rarely, based on external changes (game updates), not on player transactions (playing a game).
      - Teams: has id, name, mmrtotal
      - Players has: player_id
      - Heroes has: hero_id
      - Roles has: role_id
   3. Determine relationships (The Business Logic):
   - Player to Hero: 
      - Rule: One player can play many heroes, and one hero can be played by many players.
      - Relationship: Many-to-Many (N:M)
      - Implementation: Requires a Junction Table (e.g., Player_Heroes). This table will track the transactions (like heroes played) between them.
   - Player-to-Role Relationship
      - Rule: One player can be proficient in many roles (player ability), and one role is shared by many players.
      - Relationship: Many-to-Many (N:M)
      - Implementation: Requires a Junction Table (e.g., Player_Roles). This table tracks which roles the player is able to play.
   - Hero to Role
      - IGNORED because it's not relevant for the business logic.
   
2. Schema Definition/Logical Design (The blueprint/tables, columns, keys)
   1. Finalize Core entity tables:
   2. Determine data types
   3. Finalize constraints (e.g. NOT NULL, UNIQUE, etc.)
3. Physical Design/Implementation (The actual SQL code and storage details)

### DATA CONSTRAINTS HELPS FIND ERRORS! UNIQUE IS THE BEST!

## QUERIES SCRIPT CREATION PROCESS:
| **Criterion**                          | **Description**                                                                                                                                                                              | **Key Focus Areas**                                                                                                                                                                                                                                                |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **1. Completeness and Coverage**       | Ensure the script includes all necessary queries to support the application's functionality (CRUD operations: Create, Read, Update, Delete).                                                 | **Functional Requirements:** Do you have queries for user login, fetching a list of products, updating a customer's address, deleting an expired record?                                                                                                           |
| **2. Correctness and Logic**           | The queries must execute as intended, returning the correct data based on the specified criteria and respecting relational integrity.                                                        | **Filtering/Joining Logic:** Use correct `WHERE` clauses, appropriate `JOIN` types (e.g., `INNER`, `LEFT`), and correct aggregation functions (`SUM`, `AVG`, `COUNT`).                                                                                             |
| **3. Performance and Efficiency**      | Queries should execute quickly, especially those used frequently or on large datasets. Optimization is critical.                                                                             | **Indexing:** Ensure appropriate indexes exist on columns used in `WHERE`, `JOIN`, and `ORDER BY` clauses. Avoid `SELECT *`; only retrieve necessary columns. Use `LIMIT` for pagination.                                                                          |
| **4. Security**                        | Queries must prevent common vulnerabilities, most notably SQL Injection.                                                                                                                     | **Parameterized Queries / Prepared Statements:** Always use prepared statements (or a similar mechanism provided by your programming language/framework) to separate SQL logic from user-provided data. Never concatenate user input directly into the SQL string. |
| **5. Readability and Maintainability** | The queries should be easy for you and others to understand, debug, and modify later.                                                                                                        | **Formatting:** Use consistent capitalization (e.g., `SELECT`, `FROM`, `WHERE`). Indent clauses. Use aliases for tables/columns to clarify joins and reduce verbosity. Add comments for complex logic.                                                             |
| **6. Idempotency**                     | When applicable (especially for structural or initial data scripts), a query or script segment should be able to be run multiple times without causing errors or incorrect data duplication. | **Conditional Logic:** Use constructs like `INSERT OR REPLACE` or check for existence before inserting/updating (e.g., `IF NOT EXISTS` or `UPSERT` commands).                                                                                                      |
| **7. Transaction Management**          | Group related data modifications (CUD operations) into transactions to ensure Atomicity, Consistency, Isolation, and Durability (ACID).                                                      | **BEGIN TRANSACTION, COMMIT, ROLLBACK:** If multiple updates must succeed or fail together (e.g., debiting one account and crediting another), wrap them in a transaction.                                                                                         |


## Technologies/Apps used:
- Render
- Neon
- Supabase
- psql

## Other software used:
- sql tagged template literal
- pgadmin4

## Order in which this app was created:
1. Write app goal to have a better understanding of the initial design of the app
2. Database design (probably views should have come first?)
3. Implement Very basic Views I (Sketch/Wireframe): on paper sketch for your main pages (Player Detail, Team List, etc.). Focus only on the data points.
4. Database implementation and initial seed
5. Implement Very basic Views  II: polish 1st view implementation and do basic ejs files.
6. Define queries (CURRENTLY HERE! 31-10-25!)
7. Implement the Views! (08-11-25)

## LEARNING FROM ERROR:
- filling out tables where the data in one (e.g. players_roles which obviously has a role column) depends on another (e.g. players_heroes which has a role column) adds more complexity when creating queries. For example, if a player does not add a role but still adds a hero which plays for a role he didn't add, the query must consider such cases (e.g. using LEFT JOIN instead of just JOIN).