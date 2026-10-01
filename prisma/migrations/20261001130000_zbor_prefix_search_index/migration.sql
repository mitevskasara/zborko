-- Serve case-insensitive headword prefix lookups ("racisticki" -> "rasist",
-- "mak" -> "makedonija") from an index instead of a sequential scan.
--
-- text_pattern_ops is required: the table uses en_US.utf8 collation, where the
-- default btree operator class cannot answer a LIKE 'prefix%' range scan.
CREATE INDEX IF NOT EXISTS zborovi_zbor_lower_prefix_idx
  ON "zborovi" (lower("zbor") text_pattern_ops);
