---
layout: blog
published: false 
title: "Geo:Code 2015 Projects"
tags: 
  - minneapolis
  - budget
  - open data
---

## Broader Needs Assessment

- Erin Callahan
- Anna Carpenter
- Tony Hirt
- Boise Jones
- Lindsey Van Klei
- Deb Grundmanis

Making an existing internal Hennepin County tool publicly usable and accessible

Problem: if a rsident needs a service, they need to visit Hennepin County location
in person during business hours, very time consuming

Solution: Taking an exisitng Broader Needs Assessment tool that does scheduling
and needs assessment, and make it public so residents to go thought the process
itself

Prototype: Images of current BNA available to County 

What was did: Talk about chagnes to BNA for a public version - mobile friendly,
  more user centered design, device independent, includea analytics on site
  visitors

  Also talked about future wishlist: Push notifications, geo-fencing, lots of
  other ideas

  Looked at tools offering some similar services: Ohana, etc...

  Next step: Present idea to Hennepin County for public deployment

## Parcels Though Time

- Michael Altman
- Jacob Dalton
- Kristen Murray
- Rosie Hoyem
- Eero Kilkson

Visualizing economic information by parcel in Hennepin County

Problem: Can I know if property values have gone up or down over the long term 

Learned tools: QGIS, Leaflet, how to clean and process this data
Question - is the needed data already there?
  Yesish - depending on jurisdiction, date, domain, etc...
  Thank you for the data, and yes, we want more.

County had published a map along the lines of what they were looking for,
decided to see if they could use data to build their own map with a slider to
view a map overtime.

Created map of estimated property value change.

Created tool to create a map of animated changes of parcel data. Got a decent
way into a general tool that will generate these animations of maps.

## Minnesota Bike Ways / The Bike App

- Adam Gardner
- Boyd Johnson
- Marvin Monsah
- Kisha Delain
- Tyler Johnson
- Dylan Edwards

Bicycle map to help people navigate biking trails and resources

Built prototype of mobile responsive site deployed to Heroku

Problem: There are a lot of apps with data about biking, but wanted a tool that
  collects that data into a tool tailored to Twin Cities. Also trails provided
  by lots of different jurisdictions.

Using Open Street Maps (crowd sourced data) and Leaflet

Includes Fix-It stations.

Want to add more info about bike shops, Nice Ride (pretty close to getting that
into prototype), trail repair & maintenance info, bike routes by infrastructure
type layered on map, 

Hennepin County is working on getting County bike trails on their open data 
portal

Looked at Cyclopath, found it very slow in performance

## Hennepin Mobility App

- Brian Nguyen
- Alan Armstrong
- Tom Sayward
- Donn O'Malley

Yelp for Accessibility

Found that accessibility attributes are missing for locations. Looking to
augment existing datasets of locations with accessibility information by building
a new database with crowd-sourced info on accessibility attributes of locations.

Idea: send shame emails to locations that get a lot of downvotes based on
accessibility. Hennepin County data provides existing 

Android prototype includes food shelves, farmers markets, county facilities, etc...
  Includes graphics for accessibility ratings. Also ability to fetch more 
  information on lcoations.

Audience would be pretty much anybody in Hennepin County.

Still lots of types of data that can be integrated. Could cover virtually any
location (public, private, buildings, sidewalks, etc...)

## Digital Time Travel

- Tom Edwards
- Marv Bunnell
- Emmett Davis

A way to view/compare historical imagery, plat maps, historical census data,
photos, etc.

Given any geographic location, pull information from multiple sources, display
summaries and provide links to original items. Be able to see a location and
changes in that location overtime - changes in what was visiable, changes in
attributes. Thinking this could be useful for geneologists, researchers, social
science analysts.

Found issues with availablity or integrity of past data, evolving location data,
TOS on data or photographs, APIs across some of these data stores, security
implications of 

## Accessibility Guidelines for Maps

- Alison Link
- Jessie Wang
- Liz Puhl
- Mitch Schaps
- Github Page: http://github.com/OpenTwinCities/map-accessibility-guidelines/wiki


Principles to make maps more accessible to visually-impaired, color blind and
limited mobility users.

Looked through research to create guidelines for developers to make their maps
as accessible as possible. Found principles that could be applied across multiple
disability types.

Researched various usertypes that developers and designers might not consider
at first. Provided pages focused on some usertypes to help guide developers in
who to consider.

Placed this information on a set of Github pages

First principle - make accessibility a developer-side concern.

Cosider diverse users, offer both route and map options, don't have a map be
the only format for data display, use simple, high-contrast color scheme, use
smaller words and bigger test with highly legible typefaces, error on the side
of too few layers, display layer data 

## Kids Just Wanna Have Fun

- Mai Xiong
- Pamela-Rose Virtucio
- Ashley Schweitzer
- Sean Guthnecht
- Dustin Huibregtse,
- Brad Neuhauser

Mobile responsive website to find free or low-cost activities for kids in
Hennepin County

How do you find free or low-cost family activities right now?

Inspired by EventBrite, What's up 612/Sprockets, Padmapper, etc...

Did a lot of brainstorming around examples, types of info, etc...

Organized brainstorming into various principles and need/want

Developed base design principles, want to use as much data as already existing,
and allow users to submit things.

Spent a lot of time talking about just what an "event" is i.e. one time events
versous "on-going" events like libraries

Looked at lots of data sources, potential partnerships, created a paper 
wireframe, then a digital wireframe.

Gotta improve datasets -

Future ideas - app, API, push communications, account profiles, crowdsourcing,
etc.

folksonomy


## Urban Agricultural Suitability

- Zach Aaberg
- Andrew Dahl

Finding best places for urban gardening in Hennepin County

Problem: Which parcels are suitable for urban farming? Goal is to increase the
amount of urban farming that is occurring in the Twin Cities.

Trying to convence Minneapolis and Hennepin County argencies to allow for urban
farming on some of the land they own.

Weekend project was intended more for government officials. Presents a map
of vacant lots with information parcels, can filter by ward/type/owner.

Created dynamic frontend for investigating this data.

Long term goals - provide info on the suitability of a given vacant lot for
urban farming, link to state and county data on contamination. Include info
on fire hydrant locations for watering. Also include solar suitability for 
parcels.
