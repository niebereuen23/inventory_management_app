const REFERENCE_TABLES_CREATION = `
CREATE TABLE tiers (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tier VARCHAR(25) NOT NULL UNIQUE,
  tier_icon_url VARCHAR(2048) UNIQUE CHECK (tier_icon_url ~ '^https?://.+$')
);


CREATE TABLE sub_tiers (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sub_tier_icon_url VARCHAR(2048) NOT NULL UNIQUE CHECK (sub_tier_icon_url ~ '^https?://.+$')
);


CREATE TABLE roles (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  type VARCHAR(50) UNIQUE NOT NULL
);


CREATE TABLE playstyles (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  type VARCHAR(25) NOT NULL UNIQUE,
  description VARCHAR(255) NOT NULL,
  key_traits VARCHAR(255) NOT NULL
);


CREATE TABLE heroes (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(50) UNIQUE NOT NULL,
  name_code VARCHAR(50) UNIQUE NOT NULL,
  hero_img_url VARCHAR (2048) NOT NULL CHECK (hero_img_url ~ '^https?://.+$') DEFAULT 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/images/no_hero_mango.png'
);
`

const ENTITY_TABLES_CREATION = `
CREATE TABLE teams (
   id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   name VARCHAR(50) UNIQUE NOT NULL,
   creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   team_prof_img_url VARCHAR(2048) NOT NULL CHECK (team_prof_img_url ~ '^https?://.+$') DEFAULT 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/images/default_team_img_pig.jpg',
   extra_description VARCHAR(255)
);


CREATE TABLE players (
   id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   nickname VARCHAR(50) NOT NULL UNIQUE,
   mmr INT NOT NULL CHECK (mmr > 0),
   join_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   team_id INT,
   main_role_id INT NOT NULL,
   main_tier_id INT NOT NULL,
   main_sub_tier_id INT NOT NULL,
   playstyle_id INT NOT NULL,
   player_prof_img_url VARCHAR(2048) NOT NULL CHECK (player_prof_img_url ~ '^https?://.+$') DEFAULT 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/images/default_profile_img_pig.jpeg',
   extra_description VARCHAR(255),
   
   CONSTRAINT FK_Team_ID
   	FOREIGN KEY (team_id)
    REFERENCES teams (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,

   CONSTRAINT FK_Main_Role_ID
   	FOREIGN KEY (main_role_id)
    REFERENCES roles (id)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,

   CONSTRAINT FK_Main_Tier_ID
   	FOREIGN KEY (main_tier_id)
    REFERENCES tiers (id)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
   
   CONSTRAINT FK_Main_Sub_Tier_ID
   	FOREIGN KEY (main_sub_tier_id)
    REFERENCES sub_tiers (id)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,

   CONSTRAINT FK_Playstyle_ID
    FOREIGN KEY (playstyle_id)
    REFERENCES playstyles (id)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);
`

const REFERENCE_DATA_INSERTION = `
INSERT INTO sub_tiers (sub_tier_icon_url)
  VALUES
    ('https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/images/chevron1.png'),
    ('https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/images/chevron2.png'),
    ('https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/images/chevron3.png')
;

INSERT INTO tiers (tier)
  VALUES
    ('1'),
    ('2'),
    ('3'),
    ('4'),
    ('5'),
    ('no tier')
;

INSERT INTO heroes (name, name_code, hero_img_url)
  VALUES
    ('Abaddon', 'abaddon', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/9121-abaddon.png'),
    ('Alchemist', 'alchemist', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/3204-alchemist.png'),
    ('Ancient Apparition', 'ancient_apparition', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/8396-death-prophet.png'),
    ('Anti-Mage', 'anti_mage', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/4121-anti-mage.png'),
    ('Arc Warden', 'arc_warden', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/6101-arc-warden.png'),
    ('Axe', 'axe', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/3000-axe.png'),
    ('Bane', 'bane', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/4198-bane.png'),
    ('Batrider', 'batrider', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/8490-batrider.png'),
    ('Beastmaster', 'beastmaster', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/4975-beastmaster.png'),
    ('Bloodseeker', 'bloodseeker', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/6038-bloodseeker.png'),
    ('Bounty Hunter', 'bounty_hunter', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/5578-bounty-hunter.png'),
    ('Brewmaster', 'brewmaster', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/6658-brewmaster.png'),
    ('Bristleback', 'bristleback', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/9302-bristleback.png'),
    ('Broodmother', 'broodmother', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/9302-broodmother.png'),
    ('Centaur Warrunner', 'centaur_warrunner', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/63736-centaur-warrunner.png'),
    ('Chaos Knight', 'chaos_knight', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/91614-chaos-knight.png'),
    ('Chen', 'chen', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/64865-chen.png'),
    ('Clinkz', 'clinkz', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/97155-clinkz.png'),
    ('Clockwerk', 'clockwerk', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/22510-clockwerk.png'),
    ('Crystal Maiden', 'crystal_maiden', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/91927-crystal-maiden.png'),
    ('Dawnbreaker', 'dawnbreaker', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/66832-dawnbreaker.png'),
    ('Dark Seer', 'dark_seer', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/25498-dark-seer.png'),
    ('Dark Willow', 'dark_willow', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/66832-dark-willow.png'),
    ('Dazzle', 'dazzle', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/8849-dazzle.png'),
    ('Death Prophet', 'death_prophet', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/8396-death-prophet.png'),
    ('Disruptor', 'disruptor', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/27656-disruptor.png'),
    ('Doom', 'doom', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/8396-doom.png'),
    ('Dragon Knight', 'dragon_knight', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/87784-dragon-knight.png'),
    ('Drow Ranger', 'drow_ranger', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/82699-drow-ranger.png'),
    ('Earth Spirit', 'earth_spirit', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/98968-earth-spirit.png'),
    ('Earthshaker', 'earthshaker', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/81732-earthshaker.png'),
    ('Elder Titan', 'elder_titan', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/93989-elder-titan.png'),
    ('Ember Spirit', 'ember_spirit', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/55767-ember-spirit.png'),
    ('Enchantress', 'enchantress', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/88353-enchantress.png'),
    ('Enigma', 'enigma', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/21269-enigma.png'),
    ('Faceless Void', 'faceless_void', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/81732-faceless-void.png'),
    ('Grimstroke', 'grimstroke', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/40357-grimstroke.png'),
    ('Gyrocopter', 'gyrocopter', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/22265-gyrocopter.png'),
    ('Hoodwink', 'hoodwink', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/29416-hoodwink.png'),
    ('Huskar', 'huskar', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/35428-huskar.png'),
    ('Invoker', 'invoker', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/78162-invoker.png'),
    ('Io', 'io', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/39185-io.png'),
    ('Jakiro', 'jakiro', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/7977-jakiro.png'),
    ('Juggernaut', 'juggernaut', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/12768-juggernaut.png'),
    ('Keeper of the Light', 'keeper_of_the_light', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/65564-keeper-of-the-light.png'),
    ('Kez', 'kez', DEFAULT),
    ('Kunkka', 'kunkka', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/65564-kunkka.png'),
    ('Legion Commander', 'legion_commander', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/67988-legion-commander.png'),
    ('Leshrac', 'leshrac', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/6966-leshrac.png'),
    ('Lich', 'lich', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/47988-lich.png'),
    ('Lifestealer', 'lifestealer', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/7138-lifestealer.png'),
    ('Lina', 'lina', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/47702-lina.png'),
    ('Lion', 'lion', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/72792-lion.png'),
    ('Lone Druid', 'lone_druid', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/85357-lone-druid.png'),
    ('Luna', 'luna', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/88758-luna.png'),
    ('Lycan', 'lycan', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/6525-lycan.png'),
    ('Magnus', 'magnus', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/30322-magnus.png'),
    ('Marci', 'marci', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/22105-marci.png'),
    ('Mars', 'mars', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/13335-mars.png'),
    ('Medusa', 'medusa', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/13335-medusa.png'),
    ('Meepo', 'meepo', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/28368-meepo.png'),
    ('Mirana', 'mirana', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/93457-mirana.png'),
    ('Monkey King', 'monkey_king', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/35923-monkey-king.png'),
    ('Morphling', 'morphling', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/76701-morphling.png'),
    ('Muerta', 'muerta', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/13700-muerta.png'),
    ('Naga Siren', 'naga_siren', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/33244-naga-siren.png'),
    ('Nature''s Prophet', 'natures_prophet', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/74134-natures-prophet.png'),
    ('Necrophos', 'necrophos', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/22629-necrophos.png'),
    ('Night Stalker', 'night_stalker', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/3090-night-stalker.png'),
    ('Nyx Assassin', 'nyx_assassin', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/38568-nyx-assassin.png'),
    ('Ogre Magi', 'ogre_magi', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/16011-ogre-magi.png'),
    ('Omniknight', 'omniknight', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/50131-omniknight.png'),
    ('Oracle', 'oracle', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/16011-oracle.png'),
    ('Outworld Destroyer', 'outworld_destroyer', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/75518-outworld-destroyer.png'),
    ('Pangolier', 'pangolier', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/25208-pangolier.png'),
    ('Phantom Assassin', 'phantom_assassin', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/97613-phantom-assassin.png'),
    ('Phantom Lancer', 'phantom_lancer', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/72278-phantom-lancer.png'),
    ('Phoenix', 'phoenix', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/54105-phoenix.png'),
    ('Primal Beast', 'primal_beast', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/31163-primal-beast.png'),
    ('Puck', 'puck', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/88603-puck.png'),
    ('Pudge', 'pudge', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/31584-pudge.png'),
    ('Pugna', 'pugna', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/72003-pugna.png'),
    ('Queen of Pain', 'queen_of_pain', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/58216-queen-of-pain.png'),
    ('Razor', 'razor', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/63673-razor.png'),
    ('Riki', 'riki', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/72003-riki.png'),
    ('Ringmaster', 'ringmaster', DEFAULT),
    ('Rubick', 'rubick', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/9695-rubick.png'),
    ('Sand King', 'sand_king', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/63525-sand-king.png'),
    ('Shadow Demon', 'shadow_demon', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/27110-shadow-demon.png'),
    ('Shadow Fiend', 'shadow_fiend', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/65542-shadow-fiend.png'),
    ('Shadow Shaman', 'shadow_shaman', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/61690-shadow-shaman.png'),
    ('Silencer', 'silencer', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/91604-silencer.png'),
    ('Skywrath Mage', 'skywrath_mage', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/34091-skywrath-mage.png'),
    ('Slardar', 'slardar', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/33050-slardar.png'),
    ('Slark', 'slark', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/36504-slark.png'),
    ('Snapfire', 'snapfire', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/33050-snapfire.png'),
    ('Sniper', 'sniper', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/76232-sniper.png'),
    ('Spectre', 'spectre', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/55299-spectre.png'),
    ('Spirit Breaker', 'spirit_breaker', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/31143-spirit-breaker.png'),
    ('Storm Spirit', 'storm_spirit', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/65740-storm-spirit.png'),
    ('Sven', 'sven', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/12891-sven.png'),
    ('Techies', 'techies', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/41022-techies.png'),
    ('Templar Assassin', 'templar_assassin', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/7828-templar-assassin.png'),
    ('Terrorblade', 'terrorblade', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/48781-terrorblade.png'),
    ('Tidehunter', 'tidehunter', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/48781-tidehunter.png'),
    ('Timbersaw', 'timbersaw', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/81172-timbersaw.png'),
    ('Tinker', 'tinker', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/63830-tinker.png'),
    ('Tiny', 'tiny', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/86868-tiny.png'),
    ('Treant Protector', 'treant_protector', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/15051-treant-protector.png'),
    ('Troll Warlord', 'troll_warlord', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/20418-troll-warlord.png'),
    ('Tusk', 'tusk', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/45865-tusk.png'),
    ('Underlord', 'underlord', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/5720-underlord.png'),
    ('Undying', 'undying', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/90520-undying.png'),
    ('Ursa', 'ursa', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/65968-ursa.png'),
    ('Vengeful Spirit', 'vengeful_spirit', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/9631-vengeful-spirit.png'),
    ('Venomancer', 'venomancer', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/95057-venomancer.png'),
    ('Viper', 'viper', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/56795-viper.png'),
    ('Visage', 'visage', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/30834-visage.png'),
    ('Void Spirit', 'void_spirit', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/56795-void-spirit.png'),
    ('Warlock', 'warlock', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/26411-warlock.png'),
    ('Weaver', 'weaver', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/96387-weaver.png'),
    ('Windranger', 'windranger', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/97794-windranger.png'),
    ('Winter Wyvern', 'winter_wyvern', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/41789-winter-wyvern.png'),
    ('Witch Doctor', 'witch_doctor', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/40290-witch-doctor.png'),
    ('Wraith King', 'wraith_king', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/65041-wraith-king.png'),
    ('Zeus', 'zeus', 'https://zlxwtsaoimgyrehgvtgm.supabase.co/storage/v1/object/public/hero_icons/76032-zeus.png')
;

INSERT INTO roles (type)
  VALUES
    ('hard-carry'),
    ('midlaner'),
    ('offlaner'),
    ('soft-support'),
    ('hard-support')
;

INSERT INTO playstyles (type, description, key_traits)
  VALUES
    ('Farmer Neto', 'Vive para el farm, escalar a late y ser imparable.', 'GPM alto, lectura de mapa, mantiene equilibrio de linea'),
    ('Doble Tempo', 'Se concentra en controlar el doble tempo del enemigo, evitando que juege a ritmo propio.', 'Agresividad basada en timing, constantes rotaciones'),
    ('Kamikaze', 'El primero en meterse de pepa para crear situacion favorable.', 'Posicionamiento, maneja timings, coordinado'),
    ('Disabler', 'Te tusea por media hora y mientras su team hace el resto.', 'Precision al castear poderes'),
    ('Sicario', 'De la nada ves a un support enemigo deleteado. Intenta pickoffear constantemente.', 'Lectura de mapa, calculador, toma de decision rapida'),
    ('Space Creator', 'Jala marca para que sus cores farmeen o pusheen aunque lo puteen de que no hace nada si muere.', 'Presion de mapa, sin miedo a divear, maneja timings'),
    ('Pusher Objetivo', 'Prioriza en tomar objetivos, con o sin ayuda, para ganar control de mapa y plata. Te puede bajar el ancient si no te das cuenta.', 'Manejo de lineas, lectura de mapa, carreta enjoyer'),
    ('Wombo Combo', 'Asegura objetivos concentrandose mientras hace wambo cambos. Lo tiltearas si no esperas sus cooldowns.', 'Paciente, coordina, wambo cambo'),
    ('Split-Pusher', 'Pushea las waves de manera calculada, evadiendo ñetes. A diferencia del space creator, se concentra en crear peleas favorables.', 'Lectura de mapa, escapista, control de lineas'),
    ('Defensivo', 'Se concentra en buena defensa de torres y hg. Juega cabro a esperar como los que practican jiujitsu.', 'Paciente, manejo de lineas, timea buybacks'),
    ('Utilidad', 'Gana peleas salvando o achorando a sus cores. Es un sneykingsoltero con skill 🥹 ... pickea y compra para su carry, aunque este ultimo a veces lo trate como la mierda.', 'Timing de item, lectura de tf y juego, posicionamiento'),
    ('Snowballer', 'Min 15 ya es late para este individuo. Aprovecha su alto winrate en fase de lineas para proponer juego agresivo y sofocante. Se tiltea si el enemigo no es bruto y sabe aguantar.', 'Laneo fuerte y agresivo, jugadas de alto riesgo-recompensa')
;
`

const JUNCTION_TABLES_CREATION = `
CREATE TABLE teams_heroes (
  team_id INT NOT NULL,
  hero_id INT NOT NULL,
  
  CONSTRAINT PK_team_heroes
    PRIMARY KEY (team_id, hero_id),
    
  CONSTRAINT FK_team_id
    FOREIGN KEY (team_id)
    REFERENCES teams (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT FK_hero_id_th
    FOREIGN KEY (hero_id)
    REFERENCES heroes (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE players_roles (
  player_id INT NOT NULL,
  role_id INT NOT NULL,
  tier_id INT NOT NULL DEFAULT 6,
  sub_tier_id INT NOT NULL DEFAULT 2,
  
  CONSTRAINT PK_player_role
    PRIMARY KEY (player_id, role_id),
    
  CONSTRAINT FK_player_id_pr
    FOREIGN KEY (player_id)
    REFERENCES players (id)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    
  CONSTRAINT FK_role_id
    FOREIGN KEY (role_id)
    REFERENCES roles (id)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    
  CONSTRAINT FK_tier_id
    FOREIGN KEY (tier_id)
    REFERENCES tiers (id)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,

  CONSTRAINT FK_sub_tier_id
    FOREIGN KEY (sub_tier_id)
    REFERENCES sub_tiers (id)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);


CREATE TABLE players_heroes (
  player_id INT NOT NULL,
  hero_id INT NOT NULL,
  hero_rating FLOAT NOT NULL CHECK (hero_rating >= 0 AND hero_rating <= 1),
  pick_rate FLOAT NOT NULL CHECK (pick_rate >= 0 AND pick_rate <= 1),
  
  CONSTRAINT PK_player_hero
    PRIMARY KEY (player_id, hero_id),
    
  CONSTRAINT FK_player_id_ph
    FOREIGN KEY (player_id)
    REFERENCES players (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    
  CONSTRAINT FK_hero_id_ph
    FOREIGN KEY (hero_id)
    REFERENCES heroes (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE TABLE players_playstyles (
  player_id INT NOT NULL,
  playstyle_id INT NOT NULL,
  
  CONSTRAINT PK_player_playstyle
    PRIMARY KEY (player_id, playstyle_id),
    
  CONSTRAINT FK_player_id_psty
    FOREIGN KEY (player_id)
    REFERENCES players (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    
  CONSTRAINT FK_playstyle_id
    FOREIGN KEY (playstyle_id)
    REFERENCES playstyles (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
`

module.exports = {
   ENTITY_TABLES_CREATION,
   REFERENCE_TABLES_CREATION,
   JUNCTION_TABLES_CREATION,
   REFERENCE_DATA_INSERTION
};