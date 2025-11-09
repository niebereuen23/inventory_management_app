const pool = require('./pool');
const SQL = require ('sql-template-strings');

async function getHeroeList() {
   try {
      const { rows } = await pool.query(
         SQL`
            SELECT
               name
               FROM heroes
               ORDER BY name ASC;
         `
      )
      return rows;
   } catch (error) {
      console.error('getHeroeList query failed:', err.message);
      throw error;
   }
}

async function getTeamsList() {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            id,
            name
            FROM teams;
         `
      )
      return rows;
   } catch (error) {
      console.error('getTeamsList query failed:', err.message);
      throw error;
   }
}

async function getPlaystyleList() {
   try {
      const { rows } = await pool.query(
         SQL`
         SELECT
            type as playstyle,
            description,
            key_traits
            FROM playstyles
            ORDER BY id ASC;
         `
      )
      return rows;
   } catch (error) {
      console.error('getPlaystyleList query failed:', err.message);
      throw error;
   }
}

// POST QUERIES

async function postNewPlayerMainDetails(playerObj) {
   const { nickname, mmr, team_id, main_role_id, main_tier_id, main_sub_tier_id, player_prof_img_url, extra_description } = playerObj;

   try {
      const results = await pool.query(
         SQL`
         INSERT INTO
            players(nickname, mmr, team_id, main_role_id, main_tier_id, main_sub_tier_id, player_prof_img_url, extra_description)
            VALUES
               ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id;
         `,
         [nickname, mmr, team_id, main_role_id, main_tier_id, main_sub_tier_id, player_prof_img_url, extra_description]
      )

      return results.rows[0].id

   } catch (error) {
      console.error('postNewPlayerMainDetails query failed:', err.message);
      throw error;
   }
}

async function postNewPlayerPlayStyle(playerId, playstyleIdArr) {
   try {
      for (let psId of playstyleIdArr) {
         await pool.query(
            SQL`
            INSERT INTO players_playstyles
               ($1, $2);
            `,
            [playerId, psId]
         )
      }
   } catch (error) {
      console.error('postNewPlayerPlayStyle query failed:', err.message);
      throw error;
   }
}


async function postNewPlayerRole(playerId, roleId, tierId, subtierId, isMain) {
   try {
      await pool.query(
         SQL`
         INSERT INTO players_roles
            VALUES
               ($1, $2, $3, $4, $5);
         `,
         [playerId, roleId, tierId, subtierId, isMain]
      )
   } catch (error) {
      console.error('postNewPlayerRole query failed:', err.message);
      throw error;
   }
}


async function postNewPlayerHero(playerId, heroId, heroRating, pickRate, roleId) {
   try {
      await pool.query(
         SQL`
         INSERT INTO players_heroes
            VALUES
               ($1, $2, $3, $4, $5);
         `,
         [playerId, heroId, heroRating, pickRate, roleId]
      )
   } catch (error) {
      console.error('Database query failed:', err.message);
      throw error;
   }
}

module.exports = {
   postNewPlayerMainDetails,
   postNewPlayerPlayStyle,
   postNewPlayerRole,
   postNewPlayerHero,
   getHeroeList,
   getPlaystyleList,
   getTeamsList,
}