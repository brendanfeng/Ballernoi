# Ballernoi - A Voronoi Diagram Visualization of NBA Defenses

## Background
The NBA is always looking for better ways to understand how defenses can cover
space on the court, while also understanding their weak points. A Voronoi diagram
would be a great way to visualize the shape of a NBA defense - it would show
the regions of the court that is closest to any individual member, and if cross-
referenced with a player's range of coverage, would show the cracks in a defensive formation.

## MVP
My diagram generator would:

A) Render a Voronoi diagram given the position of all five players of a defense
B) Render a player's range of coverage given their speed
C) Be able to drag players' positions around and have the Voronoi diagram be rendered given the new position

In addition to these, my project will include a production README.

Speed stats will be provided by Second Spectrum's player tracking stats on NBA.com

## Wireframes
My app will be a single screen with a basketball half-court area,
and a created by footer with links to my Github, Portfolio, and LinkedIn pages,

Positions inside the basketball half-court will be represented by dots.
There will be a dropdown of basketball players with minimum 30 games played
that you can set each dot to (with speed displayed), or have a custom speed option.
The dot selected will be a different color, and will be draggable across the screen.
There will be a time slider that will show the size of the circle based on distance
covered - you will be able to slide between 1000 milliseconds to 2000 milliseconds.

## Technologies
My app will use these technologies:

A) JavaScript for clickable/draggable elements
B) D3 to calculate Voronoi diagrams + coverage circles and render them

Besides the main entry file, there will be three main scripts for my project:

`court.js`: The basketball half-court that will handle updating the different players
and rendering the Voronoi diagrams and the circles to the DOM
`player.js`: The dots involved within the board - will hold constructor and update
functions. Each player will have a coordinate and a speed.
`calc.js`: This script will include all of the logic behind calculating the Voronoi diagram,
as well as the circles. `court.js` will use `calc.js` to render the different shapes.

## Timeline
Day 1: Figure out how to use D3 - goal is to be able to calculate/render a Voronoi diagram by the end of the day.
Day 2: Gather data on players, render circles of their speed by end of day.
Day 3: Finish `player.js` and `court.js` - add necessary dropdowns and sliders + draggable players.
Day 4: Stylize - make everything look good, including adding backgrounds and color + links to portfolio.
