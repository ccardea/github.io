---
layout: post
title: Big Performance Boost
---
While I was enrolled in a class to learn Python, we were given some example code that performed poorly.
### Scenario
- A word game similar to Scrabble.
- Player is dealt a hand with seven letters.
- Valid words are contained in a list of over eighty thousand words.
- With the computer as player, it searches through the list for valid words

The example code ran slow and, while it was not part of the assignment, I decided to try fixing it. What follows is output that compares the performance of the example code to the modified code that I implemented.
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
I was able to leverage my previous experience to improve the code. My solution focused on reducing the size of the data to be searched and eliminating some unnecessary and time consuming steps, but involved a lot of copying. I was able to get even better results using a different approach that leveraged Python's capabilities.

```
hand {'i': 1, 'u': 1, 'q': 1, 't': 1, 'j': 1, 'b': 1, 'g': 1}
ccw2 results: word qubit score: 80 time: 0:00:00.093693
ccw3 results: word qubit score: 80 time: 0:00:00.031243

hand {'e': 1, 'i': 1, 'x': 1, 'y': 1, 'l': 1, 'v': 1, 'm': 1}
ccw2 results: word xylem score: 85 time: 0:00:00.109351
ccw3 results: word xylem score: 85 time: 0:00:00.015581

```
This code uses exhaustive enumeration, so it is guaranteed to produce the best possible result, whereas the previous version was not. However, it does introduce exponential complexity with respect to the size of the hand.

Those experienced in computer science will no doubt consider this an elementary problem, but it's a good example of a real problem that I was able to solve. 
