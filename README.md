# CCDR
The Celeste Community Difficulty Rating system (CCDR) has a mission of making celeste maps more accessible by creating transparency around all aspects of a level's difficulty.

![Short Version](docs/res/example_2.png)

![Long Version](docs/res/example_4.png)

## What is the CCDR
In contrast to the current psuedo-standard "beginner", "intermediate", "advanced", etc. difficulty system in use by a large portion of the community now, the CCDR will use 4 numbers, 1-9, to indicate a map's difficulty level:
1. Tech Complexity
   - This number is used to indicate the kind of tech that is required to complete the level.
   - A rating of '1' corresponds to tech that is taught in the vanilla game, in the A/B-Sides. '2' corresponds to some C-Sides & farewell, and so on. A '9.9' here would indicate heavy use of obscure or highly difficult tech that would not be generally known to/practiced by most members of the community.
2. Precision Required
   - This number indicates how unforgiving a map is
   - This number will also increase as the lengths of rooms without checkpoints increases; Even if nothing in a room is particularly precise, chaining many sequences together without dying increases the required precision.
   - A rating of '1' would indicate that a map is as forgiving as an early vanilla A-Side, i.e. if you miss an input you are attempting, you can back it up and still succeed in the moment -- Much like how in 1A if you miss a dash to a platform, you can usually grab a wall and climb up, losing no progress. A '2' might indicate that you can save yourself from dying if you miss, but maybe not in a way that still progresses the level, like dashing backward on a missed jump.
   - A '9.9' in this category would likely indicate extensive use of setup-less frame perfect or pixel perfect tricks.
3. Chocolate Mechanics
   - This number increases with the number of modded (or "chocolate") mechanics that are used.
   - A '1' here would indicate that only vanilla mechanics are used; This means no helpers and no code mods to the original game, only a level.
   - A '1.5'/'2' would indicate the light/moderate (respectively) use of something like "Maddie's Helping Hand" -- Where technically those features are not vanilla, they are distinctly expansions on vanilla mechanics/make essentially-vanilla mechanics usable for mappers. Most maps will be at least a 2 on this scale.
   - A '9.9' indicates extensive use of new/modded mechanics, even to the exclusion of vanilla mechanics.
   - Something like 'Mindcrack' by CoryD_ would be around an 8 on this scale.
   - This rating will also increase when modifying core celeste mechanics; i.e. midair jumps, extended coyote time, dashes in dream blocks, etc.
4. Sight-unreadability
   - This rating indicates a level's 'puzzle' factor
   - Where a '1' would indicate that there is very little to figure out, and most people familiar with the mechanics at play would be able to know what to do on their first time in a section, a '9.9' would indicate that a level is highly obscure and will require significant thought on the player's part to figure out how to get through rooms.
   - Something like a '1.5' or '2' may indicate that a level isn't totally readable when just moving through it, but binos are placed that allow players to know what to do with little effort.

Numbers are displayed either in our badges, or in text in the form 1/2/3/4. Ratings can always be displayed as either all 4 numbers, or as only the first 2, depending on the preference of the mapper.

Our goal is to allow mappers to register their levels in the CCDR and get community feedback on their initial ratings.

The CCDR will have 3 levels of difficulty rating verification:
1. Level 1 ![ghost berry](static/res/GhostBerry.png) will indicate that a map has only been rated by the mapper themselves.
2. Level 2 ![red berry](static/res/RedBerry.png) will indicate that a map has been rated by the community in sufficient numbers to provide reasonable feedback.
3. Level 3 ![gold berry](static/res/GoldBerry.png) will indicate that a map has been reviewed by a large portion of the community and that its difficulty rating is relatively uncontroversial among those who have rated it.

## Dev notes
### Pages
- Level Browser
- Single level viewer
  - Ratings are done here
- Login (OAuth2; Support Discord & Twitch)
- Dashboard
  - Manage Levels
  - Link to GameBanana acc

### API
- /badge/:tech/:precision\[/:chocolateyness/:sightreadiness] (GET)
  - On-the-fly badges (Only ghost berry)
- /level (GET, POST, PATCH, DELETE)
  - Create/Modify a level registration
  - {name, gamebanana link, initial rating, thumbnail, description, author ID, tags, has_full_rating (bool, whether to use all 4 numbers, default true)}
- /level/rate (POST)
  - Create a rating for a level
  - Ratings are tied to a version in gamebanana (??)
    - Otherwise will be reset when an initial rating is changed by the level author