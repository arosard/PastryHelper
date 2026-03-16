import { test, expect } from '@jest/globals'
import { distanceDamerauLevenshtein, limitedDistanceDamerauLevenshtein, limitedDistanceDamerauLevenshteinSubstrings } from './damerauLevenshtein';

test('damerauLevenshtein is 0 for identical strings',() => {
    for (let i=0; i<100; i++) {
        const randomString = Math.random().toString(36).slice(2);
        expect(distanceDamerauLevenshtein(randomString, randomString)).toBe(0);
    }
});

test('damerauLevenshtein is string length for completely different strings',() => {
    const length = Math.ceil(Math.random()*20);
    const string1 = 'a'.repeat(length);
    const string2 = 'b'.repeat(length);
    expect(distanceDamerauLevenshtein(string1, string2)).toBe(length);
});

test('damerauLevenshtein is 1 for strings with one substitution',() => {
    expect(distanceDamerauLevenshtein('cake', 'bake')).toBe(1);
});

test('damerauLevenshtein is 1 for strings with one insertion',() => {
    expect(distanceDamerauLevenshtein('cake', 'cakes')).toBe(1);
});

test('damerauLevenshtein is 1 for strings with one deletion',() => {
    expect(distanceDamerauLevenshtein('cake', 'ake')).toBe(1);
});

test('damerauLevenshtein is 1 for strings with one transposition',() => {
    expect(distanceDamerauLevenshtein('butter', 'ubtter')).toBe(1);
    expect(distanceDamerauLevenshtein('butter', 'buttre')).toBe(1);
});

test('damerauLevenshtein for string bigger than reference',() => {
    expect(distanceDamerauLevenshtein('cake', '6')).toBe(4);
});

test('damerauLevenshtein for string smaller than reference',() => {
    expect(distanceDamerauLevenshtein('6', 'cake')).toBe(4);
});

test('damerauLevenshtein for empty string',() => {
    expect(distanceDamerauLevenshtein('', 'cake')).toBe(4);
});

test('damerauLevenshtein for empty reference',() => {
    expect(distanceDamerauLevenshtein('cake', '')).toBe(4);
});

test('limitedDistanceDamerauLevenshtein is true when distance is 1 and there is only a transposition', () => {
    expect(limitedDistanceDamerauLevenshtein('butter', 'ubtter', 1)).toBe(true);
    expect(limitedDistanceDamerauLevenshtein('butter', 'buttre', 1)).toBe(true);
    expect(limitedDistanceDamerauLevenshtein('butter', 'btuter', 1)).toBe(true);
});

test('limitedDistanceDamerauLevenshtein is true when distance is 1 and there is only an insertion', () => {
    expect(limitedDistanceDamerauLevenshtein('cake', 'cakes', 1)).toBe(true);
    expect(limitedDistanceDamerauLevenshtein('cake', 'scake', 1)).toBe(true);
    expect(limitedDistanceDamerauLevenshtein('cake', 'caske', 1)).toBe(true);
});

test('limitedDistanceDamerauLevenshtein is true when distance is 1 and there is only a deletion', () => {
    expect(limitedDistanceDamerauLevenshtein('cake', 'ake', 1)).toBe(true);
    expect(limitedDistanceDamerauLevenshtein('cake', 'cke', 1)).toBe(true);
    expect(limitedDistanceDamerauLevenshtein('cake', 'cak', 1)).toBe(true);
});

test('limitedDistanceDamerauLevenshtein should fail', () => {
    expect(limitedDistanceDamerauLevenshtein('cake', 'bake', 0)).toBe(false);
    expect(limitedDistanceDamerauLevenshtein('flour', 'sugar', 2)).toBe(false);
});

test('limitedDistanceDamerauLevenshteinSubstrings should succeed', () => {
    expect(limitedDistanceDamerauLevenshteinSubstrings('cak', 'bake', 1)).toBe(true);
    expect(limitedDistanceDamerauLevenshteinSubstrings('ake', 'bake', 1)).toBe(true);
    expect(limitedDistanceDamerauLevenshteinSubstrings('ubtter', 'butter', 1)).toBe(true);
    expect(limitedDistanceDamerauLevenshteinSubstrings('buttre', 'butter', 1)).toBe(true);
});

test('limitedDistanceDamerauLevenshteinSubstrings should fail', () => {
    expect(limitedDistanceDamerauLevenshteinSubstrings('chat', 'chocolate', 1)).toBe(false);
    expect(limitedDistanceDamerauLevenshteinSubstrings('cote', 'chocolate', 1)).toBe(false);
});
