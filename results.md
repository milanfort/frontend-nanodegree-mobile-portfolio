# Web Performance Optimization Results

## Overview

This documents summarizes the performance optimization results measured on the
[current version](http://www.milanfort.com/frontend-nanodegree-mobile-portfolio/dist/)
of the web page.

| Version | DOMContentLoaded Event | Load Event | PageSpeed Insights Mobile | PageSpeed Insights Desktop |
| ------- | ---------------------- | ---------- | ------------------------- | -------------------------- |
| 1       | 755ms                  | 24.21s     | 28/100                    | 30/100                     |
| 2       | 702ms                  | 913ms      | 76/100                    | 89/100                     |
| 3       | 296ms                  | 1.74s      | 75/100                    | 89/100                     |
| 4       | 254ms                  | 774ms      | 75/100                    | 89/100                     |
| 5       | 132ms                  | 440ms      | 85/100                    | 92/100                     |
| 6       | 113ms                  | 397ms      | 85/100                    | 92/100                     |


## Detailed Version Explanation

1. Initial web page from the assignment

2. Optimize images

3. Optimize JavaScript - Eliminated parser-blocking JavaScript.
Moved scripts to the bottom of the page, defer execution/remove from CRP via async attribute.
Externalize script in order to allow browser caching.
Minify scripts to reduce download size.

4. Optimize CSS - Minify CSS, add media attribute for print stylesheet,
(Inlining did not improve performance)

5. Avoid the use of Google Web Fonts, replace with generic fonts

6. Minify HTML
