---
layout: post
title: Big Performance Boost
---
In my Python class, we were given a piece of example code that performed poorly.
### Scenario
- A word game similar to Scrabble.
- Player is dealt a hand with seven letters.
- Player then trys to come up with a word from the given letters.
- Valid words are contained in a list of over eighty thousand words.
- With the computer as player, it searches through the list for valid words

The given code ran slow and, even though it was not part of the assignment, I had to fix it. What follows is output that compares the performance of the given code to the modified code that I implemented.
```
Loading word list from file...
   83667 words loaded.
hand {'a': 1, 'o': 1, 'w': 1, 'h': 1, 'x': 1, 's': 1, 'p': 1}
ccw1 results: word pshaw score: 65 time: 0:01:18.573297
ccw2 results: word pshaw score: 65 time: 0:00:00.093763
Modified code is 837 times faster
```
```
   83667 words loaded.
hand {'i': 1, 'o': 1, 'c': 1, 'v': 1, 'r': 1, 'g': 1, 'k': 1}
ccw1 results: word vigor score: 45 time: 0:00:55.997249
ccw2 results: word vigor score: 45 time: 0:00:00.062486
Modified code is 896 times faster
```
I think this is hilarious!. Naturally people want to know how I did it.
```
Created on Fri Sep 24 09:17:43 2021
Attempts to make compChooseWord() run faster.
1. Eliminates words longer than hand size. Hand size = 7 yields 53901 words
2. Assumes that the best score is produced by the longest words
3. Recursively searches the longest words first.
4. Search returns as soon as a list of candidates is found.
5. Does not search shorter words if longer candidates are found.
6. Only scores a small list of candidate words
7. Eliminates an unnecessary step in isWordValid
```
