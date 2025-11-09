const pool = require('./pool');
const SQL = require ('sql-template-strings');

async function getHighestPickrate(rowLimit) {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            p.main_tier_id as tier,
            st.sub_tier,
            p.nickname as player_name,
            h.hero_img_url as hero_img,
            h.name as hero_name,
            ph.pick_rate
         FROM players_heroes ph
         JOIN players p ON ph.player_id = p.id
         JOIN heroes h ON ph.hero_id = h.id
         JOIN sub_tiers st ON st.id = p.main_sub_tier_id
         ORDER BY pick_rate DESC
         LIMIT $1;
         `,
         [rowLimit]
      )

      return rows;
   } catch (error) {
      console.error('getHighestPickrate query failed:', error.message);
      throw error;
   }
}

async function getHighestPickratePerTier(tier, rowLimit) {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            p.main_tier_id as tier,
            st.sub_tier,
            p.nickname as player_name,
            h.hero_img_url as hero_img,
            h.name as hero_name,
			   pick_rate
         FROM players_heroes ph
         JOIN players p ON ph.player_id = p.id
         JOIN heroes h ON ph.hero_id = h.id
         JOIN sub_tiers st ON st.id = p.main_sub_tier_id
         WHERE p.main_tier_id = $1
         ORDER BY pick_rate DESC
         LIMIT $2;
         `,
         [tier, rowLimit]
      )
      return rows;
   } catch (error) {
      console.error('getHighestPickratePerTier query failed:', error.message);
      throw error;
   }
}

async function getHighestHeroRating(rowLimit) {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            p.main_tier_id as tier,
            st.sub_tier,
            p.nickname as player_name,
            h.hero_img_url as hero_img,
            h.name as hero_name,
            ph.hero_rating
         FROM players_heroes ph
         JOIN players p ON ph.player_id = p.id
         JOIN heroes h ON ph.hero_id = h.id
         JOIN sub_tiers st ON st.id = p.main_sub_tier_id
         ORDER BY hero_rating DESC
         LIMIT $1;
         `,
         [rowLimit]
      )
      return rows;
   } catch (error) {
      console.error('getHighestHeroRating query failed:', error.message);
      throw error;
   }
}

async function getHighestHeroRatingPerTier(tier, rowLimit) {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            ph.hero_rating,
            p.nickname as player_name,
            p.main_tier_id as tier,
            st.sub_tier,
            h.hero_img_url as hero_img,
            h.name as hero_name
         FROM players_heroes ph
         JOIN players p ON ph.player_id = p.id
         JOIN heroes h ON ph.hero_id = h.id
         JOIN sub_tiers st ON st.id = p.main_sub_tier_id
         WHERE p.main_tier_id = $1
         ORDER BY hero_rating DESC
         LIMIT $2;
         `,
         [tier, rowLimit]
      )
      return rows;
   } catch (error) {
      console.error('getHighestHeroRatingPerTier query failed:', error.message);
      throw error;
   }
}

module.exports = {
   getHighestPickrate,
   getHighestPickratePerTier,
   getHighestHeroRating,
   getHighestHeroRatingPerTier
}