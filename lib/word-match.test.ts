import { test } from 'node:test';
import assert from 'node:assert/strict';
import { escapeLikePattern, pickBestRow, type ZborRow } from './word-match';

const row = (overrides: Partial<ZborRow>): ZborRow => ({
  id: 1,
  zbor: 'тест',
  vid: '',
  rod: null,
  znacenje: 'значење',
  random: false,
  ...overrides,
});

test('escapeLikePattern escapes LIKE metacharacters', () => {
  assert.equal(escapeLikePattern('a%b'), 'a\\%b');
  assert.equal(escapeLikePattern('a_b'), 'a\\_b');
  assert.equal(escapeLikePattern('a\\b'), 'a\\\\b');
  assert.equal(escapeLikePattern('plain'), 'plain');
});

test('pickBestRow returns null for no rows', () => {
  assert.equal(pickBestRow([]), null);
});

test('pickBestRow prefers entries with a part of speech', () => {
  const stub = row({ id: 1, vid: '', znacenje: 'долго значење овде' });
  const tagged = row({ id: 2, vid: 'Именка', znacenje: 'кратко' });
  assert.equal(pickBestRow([stub, tagged])?.id, 2);
});

test('pickBestRow breaks ties by longest definition then lowest id', () => {
  const short = row({ id: 1, vid: 'Именка', znacenje: 'кратко' });
  const long = row({ id: 2, vid: 'Именка', znacenje: 'подолго значење' });
  assert.equal(pickBestRow([short, long])?.id, 2);

  const a = row({ id: 5, vid: 'Именка', znacenje: 'исто' });
  const b = row({ id: 3, vid: 'Именка', znacenje: 'исто' });
  assert.equal(pickBestRow([a, b])?.id, 3);
});
