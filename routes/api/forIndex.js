const { Router } = require('express');
const { getHighestPickratePerTier, getHighestHeroRatingPerTier } = require('../../db/indexQueries');

const apiRouter = Router();

apiRouter.get('/pick-rate', async (req, res, next) => {
   let { tier, row_limit } = req.query;
   tier = Number(tier);
   row_limit = Number(row_limit);
   const rows = await getHighestPickratePerTier(tier, row_limit);
   res.json(rows);
   console.log('Pick Rate Api called')
});

apiRouter.get('/hero-rate', async (req, res, next) => {
   let { tier, row_limit } = req.query;
   tier = Number(tier);
   row_limit = Number(row_limit);
   const rows = await getHighestHeroRatingPerTier(tier, row_limit);
   res.json(rows);
   console.log('Hero Rate Api called')
});

module.exports = {
   apiRouter
}