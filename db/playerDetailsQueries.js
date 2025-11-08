const pool = require('./pool');
import SQL from 'sql-template-strings';

async function getPlayerDetails(id) {
   try {
      const { rows } = await pool.query(
         SQL`
         WITH ps AS (
            SELECT
            pps.player_id,
            JSON_AGG(
               JSON_BUILD_OBJECT(
                  'playstyle', ps.type,
                  'description', ps.description,
                  'key_traits', ps.key_traits
               )
               ORDER BY ps.id
            ) as playstyles
            FROM players_playstyles pps
            JOIN playstyles ps ON ps.id = pps.playstyle_id
            GROUP BY pps.player_id
         )
         SELECT
            p.nickname,
            p.mmr,
            COALESCE(t.name, 'No team'),
            r.type as position,
            ti.tier,
            ti.tier_icon_url,
            subti.sub_tier_icon_url,
            p.player_prof_img_url,
            p.extra_description,
            playstyles
            FROM players p
            LEFT JOIN teams t ON p.team_id = t.id
            JOIN tiers ti ON ti.id = p.main_tier_id
            JOIN sub_tiers subti ON subti.id = p.main_sub_tier_id
            JOIN roles r ON r.id = p.main_role_id
            LEFT JOIN ps ON ps.player_id = p.id
            WHERE p.id = $1;
         `,
         [id]
      )
      return rows;
   } catch (error) {
      console.error('Database query failed:', error.message);
      throw error;
   }
}

async function getPlayerRoles(id) {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            r.type,
            ti.tier,
            ti.tier_icon_url,
            subti.sub_tier_icon_url,
            pr.is_main
            FROM players_roles pr
            JOIN roles r ON r.id = pr.role_id
            JOIN tiers ti ON ti.id = pr.tier_id
            JOIN sub_tiers subti ON subti.id = pr.sub_tier_id
            WHERE pr.player_id = $1;
         `,
         [id]
      )
      return rows;
   } catch (error) {
      console.error('Database query failed:', error.message);
      throw error;
   }
}

async function getPlayerHeroes(id) {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            ph.player_id,
            r.type as role_type,
            COALESCE(pr.is_main, false) as is_main,
            JSON_AGG(
               JSON_BUILD_OBJECT(
                  'hero_name', h.name,
                  'hero_rating', ph.hero_rating,
                  'hero_pick_rate', ph.pick_rate
               )
               ORDER BY ph.hero_rating DESC
            ) as heroes_played
            FROM players_heroes ph
            JOIN heroes h ON h.id = ph.hero_id
            JOIN roles r ON r.id = ph.role_id
            LEFT JOIN players_roles pr ON pr.role_id = ph.role_id AND pr.player_id = ph.player_id
            WHERE ph.player_id = $1
            GROUP BY r.type, ph.player_id, pr.is_main;
         `,
         [id]
      )
      return rows;
   } catch (error) {
      console.error('Database query failed:', error.message);
      throw error;
   }
}

module.exports = {
   getPlayerDetails,
   getPlayerHeroes,
   getPlayerRoles
}