const pool = require('./pool');
import SQL from 'sql-template-strings';

async function getAllPlayers() {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            player_id,
            main_tier,
            main_sub_tier,
            nickname,
            playstyle,
            main_role,
            -- Aggregate top 3 heroes for each player into a JSON array
            JSON_AGG(
               JSON_BUILD_OBJECT(
                  'hero_name', a.hn,
                  'hero_img_url', a.hi
               )
            ) AS top_picked_heroes
         FROM (
            SELECT
               p.id as player_id, -- player unique ID
               main_tier_id as main_tier, -- player’s tier of main role
               main_sub_tier_id as main_sub_tier,
               nickname,
               h.name hn,
               h.hero_img_url hi,
               ps.type as playstyle,
               r.type as main_role,
               ph.pick_rate,
               -- rank each hero per player by pick rate (1 = highest)
               row_number() OVER (
                     PARTITION BY ph.player_id
                     ORDER BY ph.pick_rate DESC
                  ) AS pick_rate_rank
            FROM players p
            JOIN playstyles ps ON p.playstyle_id = ps.id
            JOIN roles r ON p.main_role_id = r.id
            JOIN players_heroes ph ON ph.player_id = p.id
            JOIN heroes h ON h.id = ph.hero_id
            WHERE ph.role_id = p.main_role_id -- only include heroes matching the player’s main role
         ) AS a
         -- keep only the top 3 most-picked heroes per player
         WHERE pick_rate_rank <= 3
         -- group back by player so we can JSON_AGG the heroe names and images
         GROUP BY player_id, main_tier, main_sub_tier, nickname, playstyle, main_role
         ORDER BY player_id ASC
         `
      )
      return rows;
   } catch (error) {
      console.error('Database query failed:', error.message);
      throw error;
   }
}

module.exports = {
   getAllPlayers
}