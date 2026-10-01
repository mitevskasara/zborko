-- Mark the words that are suitable to be served as the random word of the day.
--
-- A row qualifies when:
--   * it has a non-empty definition
--   * "zbor" is a single Cyrillic word (no spaces, no quotes, no punctuation,
--     optional internal hyphen, 4-14 characters)
--   * "znacenje" is a real definition of 40-400 characters (fits on a card,
--     but is not an empty stub)
--   * it is not a meta entry describing a compound-word part
--     ("Прв дел од сложенки со значење: ...")
--   * it is not a pure cross-reference entry
--     ("хориста, мн. хористи м. в. хор.")
--
-- Only one row is marked per distinct "zbor" (the dictionary contains 1,272
-- duplicated headwords), preferring the entry that has a part-of-speech and
-- the longest definition.
--
-- This migration only ever sets "random" to true, so any hand-picked entries
-- stay selected.

WITH candidates AS (
    SELECT DISTINCT ON ("zbor") id
    FROM "zborovi"
    WHERE btrim("znacenje") <> ''
      AND "zbor" !~ '[^абвгдѓежзѕијклљмнњопрстќуфхцчџшАБВГДЃЕЖЗЅИЈКЛЉМНЊОПРСТЌУФХЦЧЏШ-]'
      AND "zbor" !~ '^-|-$'
      AND char_length("zbor") BETWEEN 4 AND 14
      AND char_length("znacenje") BETWEEN 40 AND 400
      AND "znacenje" !~ '^(Прв|Втор) дел од'
      AND NOT (
        ("znacenje" LIKE "zbor" || ',%' OR "znacenje" LIKE "zbor" || '.%')
        AND "znacenje" LIKE '%в. %'
      )
    ORDER BY "zbor", ("vid" <> '') DESC, char_length("znacenje") DESC, id
)
UPDATE "zborovi" AS z
SET "random" = true
FROM candidates AS c
WHERE z.id = c.id
  AND z."random" = false;