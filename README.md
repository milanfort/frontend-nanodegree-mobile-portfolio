# Website Optimization

## Introduction

This repository contains a solution to assignment #4 of the Udacity's Front-End Web Developer Nanodegree Programme.

The assignment consists of two parts.
In the first part, the task was to optimize the Critical Rendering Path of a provided website so that it achieves a target
[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) score.
 
In the second part, the task was to optimize another provided web page so that it runs at 60 frames per second.
 
 
## Live Version

This optimized websites are deployed through GitHub Pages at the following URLs:
* Part 1: [http://www.milanfort.com/frontend-nanodegree-mobile-portfolio/](http://www.milanfort.com/frontend-nanodegree-mobile-portfolio/)
* Part 2: [http://www.milanfort.com/frontend-nanodegree-mobile-portfolio/pizza/pizza.html](http://www.milanfort.com/frontend-nanodegree-mobile-portfolio/pizza/pizza.html)


## Critical Rendering Path Optimization 

The following list outlines the performed optimization steps of the critical rendering path:

1. Initial web page from the assignment

2. Optimize images

3. Optimize JavaScript
    * Move scripts to the bottom of the page - eliminates parser-blocking JavaScript
    * Defer execution/remove from CRP via async attribute
    * Externalize script in order to allow browser caching
    * Minify scripts to reduce download size

4. Optimize CSS 
    * Minify CSS
    * Add media attribute for print stylesheet

5. Avoid the use of Google Web Fonts, replace with generic fonts

6. Minify HTML

7. Inline critical CSS

The table below shows the performance optimization impact of each step.
Please not that the page load times depend on the network connection and other factors, and are 
provided only for illustrative purposes.

| Version | DOMContentLoaded Event | Load Event | PageSpeed Insights Mobile | PageSpeed Insights Desktop |
| ------- | ---------------------- | ---------- | ------------------------- | -------------------------- |
| 1       | 755ms                  | 24.21s     | 28/100                    | 30/100                     |
| 2       | 702ms                  | 913ms      | 76/100                    | 89/100                     |
| 3       | 296ms                  | 1.74s      | 75/100                    | 89/100                     |
| 4       | 254ms                  | 774ms      | 75/100                    | 89/100                     |
| 5       | 132ms                  | 440ms      | 85/100                    | 92/100                     |
| 6       | 113ms                  | 397ms      | 85/100                    | 92/100                     |
| 7       | 122ms                  | 364ms      | 92/100                    | 95/100


## Frame Rate Optimization

The following performance optimizations were performed in order to make the provided pizzeria site
run at 60 frames per second when scrolling:

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


## Computational Efficiency Optimization

The following performance optimizations were performed in order to speed up resizing of the pizza elements:

* Remove duplication when querying the DOM for the same elements
 
* Fix forced synchronous layout when resizing pizzas by moving computation of the new pizza size outside of the for loop
and performing the size changes in a batch.

As a result, the time required to resize pizzas decreased from initial ca. 160ms to under 1ms.


## Installation Instructions

To generate the fully optimized web site from source, follow these steps:

1. [Install Node.js](https://nodejs.org/en/download/)

2. Install [Gulp](http://gulpjs.com/) globally:
    ```
    $ npm install -g gulp
    ```

3. Clone this git repository:
    ```
    $ git clone https://github.com/milanfort/frontend-nanodegree-mobile-portfolio.git
    ```

4. Change your working directory to _frontend-nanodegree-mobile-portfolio_

5. Install development dependencies:
    ```
    $ npm install
    ```

6. Run `gulp` to deploy the code to _dist_ directory

7. Open file `dist/index.html` in your web browser
