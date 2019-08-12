# torunonthebike-client

This is react client responsible for running https://torun.onthe.bike website.
It's based on Leaflet.js map library using React context API to make it available to all layers.

## Architectural decisions

1. I could not use react-leaflet library here, as it was incompatible with Leaflet.js extension libraries required for this project to run. That's why I had to use pure Leaflet.js lib which in result produced some less-react'ish code that could use some heavy refactoring - this is something I will have to work on in future updates.
2. I've decided to use pure OpenStreetMaps tile server as this website will not hit high traffic - it's local, relevant to only one city, and it's not including any functionalities that would justify using this website often by anyone. Downside to this is speed of tile server, which would be way better with Mapbox service - but first I need to gather long-term traffic data to decide.