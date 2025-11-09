const {
   getHighestPickrate,
   getHighestPickratePerTier,
   getHighestHeroRating,
   getHighestHeroRatingPerTier
} = require('../../db/indexQueries');

const ROW_LIMIT = 10;

const getIndex = async (req, res, next) => {
   try {
      const [ highestPickRate, highestHeroRate ]  = await Promise.all([
         getHighestPickrate(ROW_LIMIT),
         getHighestHeroRating(ROW_LIMIT)
      ])
      res.render('index', {
         highestPickRate: highestPickRate,
         highestHeroRate: highestHeroRate
      })
   } catch (error) {
      console.log(error)
   }
   
}

module.exports = {
   getIndex
}

// FOR COMIT: implement controllers, ejs and updated db query implementation