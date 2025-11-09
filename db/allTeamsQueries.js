const pool = require('./pool');
const SQL = require ('sql-template-strings');

async function getAllTeams() {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            name,
            team_prof_img_url
            FROM teams;
         `
      )
      return rows;
   } catch (error) {
      console.error('getAllTeams query failed:', error.message);
      throw error;
   }
}

module.exports = {
   getAllTeams
}