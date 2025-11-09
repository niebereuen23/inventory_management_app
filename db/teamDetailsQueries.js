const pool = require('./pool');
const SQL = require ('sql-template-strings');

async function getTeamMainDetails(id) {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            name,
            team_prof_img_url,
            extra_description
            FROM teams
            WHERE id = $1
         `,
         [id]
      )
      return rows;
   } catch (error) {
      console.error('getTeamMainDetails query failed:', error.message);
      throw error;
   }
}

async function getTeamPlayers(id) {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            p.player_prof_img_url,
            p.nickname,
            p.main_tier_id,
            p.main_sub_tier_id,
            JSON_AGG(
               JSON_BUILD_OBJECT(
                  'hero_name', h.name,
                  'hero_img', h.hero_img_url
               )
               ORDER BY ph.pick_rate DESC
            ) as heroes_played
            FROM players p
            JOIN players_heroes ph ON ph.player_id = p.id
            JOIN heroes h ON h.id = ph.hero_id
            WHERE team_id = $1 AND ph.role_id = p.main_role_id
            GROUP BY p.player_prof_img_url, p.nickname, p.main_tier_id, p.main_sub_tier_id
         `,
         [id]
      )
      return rows;
   } catch (error) {
      console.error('getTeamPlayers query failed:', error.message);
      throw error;
   }
}

module.exports = {
   getTeamMainDetails,
   getTeamPlayers
}