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
| 7       | 122ms                  | 364ms      | 92/100                    | 95/100

## Detailed Version Explanation

1. Initial web page from the assignment

2. Optimize images

3. Optimize JavaScript - Eliminated parser-blocking JavaScript.
Moved scripts to the bottom of the page, defer execution/remove from CRP via async attribute.
Externalize script in order to allow browser caching.
Minify scripts to reduce download size.

4. Optimize CSS - Minify CSS, add media attribute for print stylesheet

5. Avoid the use of Google Web Fonts, replace with generic fonts

6. Minify HTML

7. Inline critical CSS


## Optimizations towards 60 frames per second execution

The following performance optimizations were performed on the pizza site 
in order to make it run at 60 frames per second when scrolling:

* Promote .mover elements to their own isolated layers using the 'will-change' CSS property.
Include also the
[Null transform hack](https://aerotwist.com/blog/on-translate3d-and-layer-creation-hacks/)
in order to make it work in older browsers.

* Reduce the number of .mover elements from 200 to 40, which is enough to cover the whole screen 

* Use requestAnimationFrame for updatePositions() methods 

* Fix forced synchronous layout (FSL) by moving computation involving scrollTop property out of the for loop,
and performing the style updates in a batch.
Accessing the scrollTop property, which causes browser to run layout, followed by the style updates within 
the same loop was the cause of the FSL.


## Optimizations of computational Efficiency

The following performance optimizations were performed in order to speed up resizing of the pizza elements:

* Remove duplication when querying the DOM for the same elements
 
* Fix forced synchronous layout when resizing pizzas by moving computation of the new pizza size outside of the for loop
and performing the size changes in a batch.

As a result, the time required to resize pizzas decreased from initial ca. 160ms to under 1ms.
