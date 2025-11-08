const { Client } = require("pg");
require('dotenv').config();
const SQL = require('./populateQueryVar');


async function dbSeed() {
   const client = new Client({
      connectionString: process.argv[2] || process.env.DATABASE_URL
   });

   

   try {
    console.log("connecting to client...");
    await client.connect();

    await client.query('BEGIN');

    console.log("seeding database...");
    await client.query(SQL.REFERENCE_TABLES_CREATION);
    await client.query(SQL.ENTITY_TABLES_CREATION);    
    await client.query(SQL.JUNCTION_TABLES_CREATION);
    await client.query(SQL.REFERENCE_DATA_INSERTION);

    await client.query('COMMIT');
  } catch (error) {
    console.error('Seeding failed:', `\n`, error);
    await client.query('ROLLBACK');
    throw error; // rethrow cause query error cannot be fixed, this doesn't end the block execution, just passes the error for the next catcher (or ends unhandled if no more catchers).
  } finally {
    await client.end();
    
  }

  console.log("database seeded");
  return;
}

dbSeed().catch(() => process.exit(1)); // catch it to handle it gracefully by exiting the process.