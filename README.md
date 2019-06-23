# GBC Printer

[![Netlify Status](https://api.netlify.com/api/v1/badges/cc602651-0660-4e9e-acae-c0e765f22ae1/deploy-status)](https://app.netlify.com/sites/gbc-printer/deploys)
&nbsp;
[![CircleCI](https://circleci.com/gh/Jonic/gbc-printer.svg?style=svg)](https://circleci.com/gh/Jonic/gbc-printer)
&nbsp;
[![Maintainability](https://api.codeclimate.com/v1/badges/0adc3bbe5e58fe5cbb88/maintainability)](https://codeclimate.com/github/Jonic/gbc-printer/maintainability)
&nbsp;
[![Test Coverage](https://api.codeclimate.com/v1/badges/0adc3bbe5e58fe5cbb88/test_coverage)](https://codeclimate.com/github/Jonic/gbc-printer/test_coverage)

The Gameboy screen displayed 20 tiles horizontally, and 18 vertically, for a resolution of 160*144 pixels

One data line is 16 pairs of hexidecimal digits, representing one TILE of gameboy graphics data. Each pair of hexidecimal digits represents on BYTE, which in turn consists of eight BITS. Each bit is a color value between 0 and 3.

Let's say we've split the data up accordingly and we're trying to decode a BYTE. A byte is represented by two hexdecimal digits, like so:

L = 7C
R = C6

For each, we convert them to decimal:

L = 7C = 124
R = C6 = 198

...and then to binary, resulting in an 8 digit number:

L = 7C = 124 = 01111100
R = C6 = 198 = 11000110

We the loop through and compare each of the digits in the binary numbers

Depending on how the lo and hi bits match up with assign them a new value, which will be one a number between 0 and 3. These represent the shades of grey the Gameboy was able to display.

if (L = 0 && R = 0) value = 0 (white)
if (L = 1 && R = 0) value = 1 (light grey)
if (L = 0 && R = 1) value = 2 (medium grey)
if (L = 1 && R = 1) value = 3 (black)

So comparing the the binary values for our original pair of hex digits, we can get a row of pixels' color values:

L:      0 1 1 1 1 1 0 0
R:      1 1 0 0 0 1 1 0
pixels: 2 3 1 1 1 3 2 0
