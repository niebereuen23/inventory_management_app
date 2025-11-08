const pool = require('./pool');
import SQL from 'sql-template-strings';

async function postNewTeam(name, team_prof_img_url, extra_description) {
   try {
      const { rows } = await pool.query(
         SQL`
         INSERT INTO teams (name, team_prof_img_url, extra_description)
            VALUES
               ($1, COALESCE($2, DEFAULT), $3)
         RETURNING id
         `,
         [name, team_prof_img_url || null, extra_description]
      )
      return rows[0].id
   } catch (error) {
      console.error('Database query failed:', error.message);
      throw error;
   }
}
// CURRENTLY: DECIDING WHAT AND HOW TO IMPLEMENT FOR SEARCH BAR
async function getPlayersList() {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            id,
            nickname
            FROM players
            ORDER BY nickname ASC
         `
      )
      return rows;
   } catch (error) {
      console.error('Database query failed:', error.message);
      throw error;
   }
}

async function updatePlayerTeam(playerId, teamId) {
   try {
      await pool.query(
         SQL`
         UPDATE players
         SET team_id = $2
         WHERE id = $1
         `,
         [playerId, teamId]
      )
   } catch (error) {
      console.error('Database query failed:', error.message);
      throw error;
   }
}

module.exports = {
   postNewTeam,
   updatePlayerTeam,
   getPlayersList
}