const pool = require('./pool');
import SQL from 'sql-template-strings';

const ROW_LIMIT = 10;

async function getHighestPickrate() {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            p.main_tier_id,
            p.nickname,
            h.hero_img_url,
            h.name
         FROM players_heroes ph
         JOIN players p ON ph.player_id = p.id
         JOIN heroes h ON ph.hero_id = h.id
         ORDER BY pick_rate DESC
         LIMIT $1;
         `,
         [ROW_LIMIT]
      )

      return rows;
   } catch (error) {
      console.error('Database query failed:', error.message);
      throw error;
   }
}

async function getHighestPickratePerTier(tier) {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            p.main_tier_id,
            p.nickname,
            h.hero_img_url,
            h.name,
			   pick_rate
         FROM players_heroes ph
         JOIN players p ON ph.player_id = p.id
         JOIN heroes h ON ph.hero_id = h.id
         WHERE p.main_tier_id = $1
         ORDER BY pick_rate DESC
         LIMIT $2;
         `,
         [tier, ROW_LIMIT]
      )
      return rows;
   } catch (error) {
      console.error('Database query failed:', error.message);
      throw error;
   }
}

async function getHighestHeroRating() {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            p.main_tier_id,
            p.nickname,
            h.hero_img_url,
            h.name,
            ph.hero_rating
         FROM players_heroes ph
         JOIN players p ON ph.player_id = p.id
         JOIN heroes h ON ph.hero_id = h.id
         ORDER BY hero_rating DESC
         LIMIT $1;
         `,
         [ROW_LIMIT]
      )
      return rows;
   } catch (error) {
      console.error('Database query failed:', error.message);
      throw error;
   }
}

async function getHighestHeroRatingPerTier(tier) {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            p.main_tier_id,
            p.nickname,
            h.hero_img_url,
            h.name,
			   ph.hero_rating
         FROM players_heroes ph
         JOIN players p ON ph.player_id = p.id
         JOIN heroes h ON ph.hero_id = h.id
         WHERE p.main_tier_id = $1
         ORDER BY hero_rating DESC
         LIMIT $2;
         `,
         [tier, ROW_LIMIT]
      )
      return rows;
   } catch (error) {
      console.error('Database query failed:', error.message);
      throw error;
   }
}

module.exports = {
   getHighestPickrate,
   getHighestPickratePerTier,
   getHighestHeroRating,
   getHighestHeroRatingPerTier
}