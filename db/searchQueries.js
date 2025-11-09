const pool = require('./pool');
const SQL = require ('sql-template-strings');

async function getPlayersTeamsList() {
   try {
      const playerQuery = SQL`
         SELECT
            id as id,
            nickname as name,
            'player' as type
            FROM players
            ORDER BY nickname ASC
      `;

      const teamQuery = SQL`
         SELECT
            id as team_id,
            name as name,
            'team' as type
            FROM teams
            ORDER BY name ASC;
      `
      const [playerResult, teamResult] = await Promise.all([
         pool.query(playerQuery),
         pool.query(teamQuery)
      ])

      return [ playerResult.rows, teamResult.rows ]
   } catch (error) {
      console.error('Database query failed:', error.message);
      throw error;
   }
}

module.exports = {
   getPlayersTeamsList
}