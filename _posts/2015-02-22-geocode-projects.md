---
layout: blog
published: false 
title: Geo:Code 2015 Projects
tags: 
  - geocodehc
  - geocodehc2015
---

## Broader Needs Assessment

- Erin Callahan
- Anna Carpenter
- Tony Hirt
- Boise Jones
- Lindsey Van Klei
- Deb Grundmanis

Often times, the solution to a problem isn't to build a new tool, but to reuse
an existing tool.

The Broader Needs Assessment team spent the weekend figuring out how to shorten 
the time residents spend seeking out Hennepin County services. Currently, a
resident has to travel to a Hennepin County location and speak with a county
employee to find out what county services they may need or qualify for, and to
schedule follow up visits - a time consuming process that could be improved 
upon for many with an online tool. As it turns out, Hennepin County already has
this tool in the form of an internal Broader Needs Assessment website used by 
county staff.

With much of the required technology already being used by Hennepin County, 
this team focused on figuring out how to make the Broader Needs Assessment tool 
accessible and useable to the public. This involved defining some technical 
additions to the tool to be more user friendly, which the team presented at the
end of the weekend. However, the technical barriers to public access are small
compared to the administrative barriers. As such, this team spent quite a bit
of time researching and planning policy and business arguments to present to
County leadership on why the Broader Needs Assessment tool should be made 
publicly available.

## Parcels Through Time

- Michael Altman
- Jacob Dalton
- Kristen Murray
- Rosie Hoyem
- Eero Kilkson

We're in a building boom in the Twin Cities. Transit, buildings, and stadiums
are being constructed everywhere, prompting property owners near all this 
contruction to ask, what is going to happen to the value and taxes of their
property? The Parcels Through Time team aimed to find data and build a tool
that could help owners investigate that question, and did produce a rough
prototype web application that visualizes and animates the changes in a
property's valuation over time.

During Geo:Code, the Parcels Through Time team did find useful data for 
investigating property values over time. Though, in the words of one team 
member, "thank you for the data, and yes, we want more". The team found that
the availability and quality of data can differ alot depending on the 
jurisdiction providing the data, the time frame the data covers, the information
the data is meant to represent, and more.

This team also looked at existing tools for invetigating property value data
over time, but they wanted more. More data, more speed, more general. Thus,
the team started on a prototype of a general, map based, property value 
explorer capable of visualizing and animating changes in property over time.
Along the way, team members learned about QGIS, Leaflet, and how to prepare
data for these tools.

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
