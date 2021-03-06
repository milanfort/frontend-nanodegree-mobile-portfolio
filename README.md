# Website Optimization

## Introduction

This repository contains a solution to assignment #4 of the Udacity's Front-End Web Developer Nanodegree Programme.

The assignment consists of two parts.
In the first part, the task was to optimize the critical rendering path of a provided website so that it achieves a target
[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) score.
In the second part, the task was to optimize another provided web page so that it runs at 60 frames per second.
 
 
## Live Version

This optimized websites are deployed through GitHub Pages at the following URLs:
* Part 1: [http://www.milanfort.com/frontend-nanodegree-mobile-portfolio/](http://www.milanfort.com/frontend-nanodegree-mobile-portfolio/)
* Part 2: [http://www.milanfort.com/frontend-nanodegree-mobile-portfolio/pizza/pizza.html](http://www.milanfort.com/frontend-nanodegree-mobile-portfolio/pizza/pizza.html)


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


## Optimization Outline

### Critical Rendering Path Optimization 

The following list outlines the performed optimization steps of the critical rendering path:

1. Initial web page from the assignment

2. Optimize images

3. Optimize JavaScript
    * Move scripts to the bottom of the page - eliminates parser-blocking JavaScript
    * Defer execution/remove from CRP via _async_ attribute
    * Externalize script in order to allow browser caching
    * Minify scripts to reduce download size

4. Optimize CSS 
    * Minify CSS
    * Add `media="print"` attribute to the link referencing stylesheet for printing

5. Avoid the use of Google Web Fonts, replace with generic fonts

6. Minify HTML

7. Inline critical CSS

The table below shows the impact of each step on performance.
Please note that the page load times depend on the network connection and other factors,
and are therefore provided only for illustrative purposes.

| Step    | DOMContentLoaded Event | Load Event | PageSpeed Insights Mobile | PageSpeed Insights Desktop |
| ------- | ---------------------- | ---------- | ------------------------- | -------------------------- |
| 1       | 755ms                  | 24.21s     | 28/100                    | 30/100                     |
| 2       | 702ms                  | 913ms      | 76/100                    | 89/100                     |
| 3       | 296ms                  | 1.74s      | 75/100                    | 89/100                     |
| 4       | 254ms                  | 774ms      | 75/100                    | 89/100                     |
| 5       | 132ms                  | 440ms      | 85/100                    | 92/100                     |
| 6       | 113ms                  | 397ms      | 85/100                    | 92/100                     |
| 7       | 122ms                  | 364ms      | 92/100                    | 95/100


### Frame Rate Optimization

The following performance optimizations were performed in order to make the provided pizzeria site
run at 60 frames per second when scrolling:

* Promote .mover elements to their own isolated layers using the _will-change_ CSS property.
Include also the
[Null transform hack](https://aerotwist.com/blog/on-translate3d-and-layer-creation-hacks/)
in order to make it work in older browsers

* Reduce the number of .mover elements by dynamically calculating the necessary count based on the browser window size

* Invoke method `updatePositions()` inside
[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

* Fix forced synchronous layout (FSL) by moving computation involving
[scrollTop](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop)
property out of the for loop,
and performing the style updates in batch.
Accessing the scrollTop property, which causes browser to run layout, followed by the style updates within 
the same loop was the cause of the FSL.


### Computational Efficiency Optimization

The following performance optimizations were performed in order to speed up resizing of the pizza elements:

* Remove duplication when querying the DOM for the same elements

* Use [document.getElementById()](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
instead of [document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

* Use [document.getElementsByClassName()](https://developer.mozilla.org/en/docs/Web/API/Document/getElementsByClassName)
instead of [document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

* Move document element retrieval outside of the for loop to prevent repeated retrieval of the same element 
 
* Fix forced synchronous layout when resizing pizzas by moving computation of the new pizza size outside of the for loop
and performing the size changes in batch

As a result, the time required to resize pizzas decreased from initial ca. 160ms to under 1ms.


## Final Note

Please note that we made no attempt to improve the sub-par code quality of the provided code base.
The only thing we focused on in this assignment was to fix the performance issues and optimize the web site,
as discussed above.
