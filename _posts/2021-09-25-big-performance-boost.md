---
layout: post
title: Big Performance Boost
---
While I was enrolled in a class to learn Python, we were given some example code that performed poorly.
### Scenario
- A word game similar to Scrabble.
- Player is dealt a hand with seven letters.
- Player then trys to come up with a word from the letters in the hand.
- Valid words are contained in a list of over eighty thousand words.
- With the computer as player, it searches through the list for valid words

The example code ran slow and, even though it was not part of the assignment, I decided to try fixing it. What follows is output that compares the performance of the example code to the modified code that I implemented.
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
I can only laugh at this. Naturally people want to know how I did it.
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
Of course, there's a trade off. The modified code doesn't guarantee that the word it chooses will be the highest possible score. There are cases when a word with fewer letters will produce a higher score. It wouldn't be too difficult to add a step to continue searching smaller words under certain circumstances. But for now, I decided to take the trade off and move on.
