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

Biking is strong in the Twin Cities, thanks to miles of trails and lanes, a big 
community, and lots of bike focused organizations. There are also a number of
applications out there for bikers, but none that really meet the needs of Twin
Cities bikers. The Minnesota Bike Ways team set out to fix that, and was able 
to deploy a responsive prototype baed on Open Street Maps and Leaflet.

In building their prototype, the Minnesota Bike Ways team put a lot of thought
into identifying the needs of Twin Cities bikers, including: 

 - Maps of trails and paths from multiple jurisdictions
 - Locations of Fix-It stations
 - Information on Nice Ride locations
 - Trail and path repair and maintenance information
 - Bike routes by infrastructure
 - Offline access to directions

Addressing many of these needs is now put of future work the team intends to 
perform on their prototype. In addition, spurred by the work and requests of the
Minnesota Bike Ways team, Hennepin County is now working to add data on County
bike trails to their open data portal.

## Hennepin Mobility App

- Brian Nguyen
- Alan Armstrong
- Tom Sayward
- Donn O'Malley

Datasets that cover locations, transportation, or almost anything, often 
overlook the needs of people with disabilities. This can make it difficult for
people with disabilities to plan meetings or visits, and can also prevent the
operators of buildings or the governments that manage public space from 
realizing that a given location has accessibility issues.

To address this issue, the Hennepin Mobility App team decided to build a 
crowd-sourced dataset of their own, and a mobile app to enable Twin Cities 
residents to use and contribute to this dataset. Their goal is to create a
dataset that can suplement existing datasets, so that applications (including
their own app) can pull accessibility data from their dataset and mash it up
with the information in existing datasets. As the team said, this accessibility
dataset could cover any location. And by making it crowd-sourced, the Hennepin
Mobility App team is also creating a Yelp for Accessibility by enabling people
to comment and vote on locations based on their accessibility.

By the end of the weekend, the team had already put together a prototype
Android app that included information on food shelves, farmers markets,
Hennepin County facilities, and more. The prototype also included graphics for
locations based on their accessibility ratings.

## Digital Time Travel

- Tom Edwards
- Marv Bunnell
- Emmett Davis

There is a lot of historical information out there about locations. For any
given address in Hennepin County, there might be photographs, plat maps, census
data, purchase information, construction information, business records, or any
of a variety of other types of information from the past. This can be extremely
interesting and useful information about the history of a location. The Digital
Time Travelers spent the Geo:Code weekend exploring where all of this 
information is and how it can be investigated.

In their exploration, the Digital Time Travelers created a concept for a 
general historical information investigation web application. Such an 
application would pull and mash up data from multiple sources to create 
summaries and displays of historical information about locations. Researchers,
geneologists, social science analysts, or anybody interested in the history of
a place would be able to find a location and view information associated with 
that location, organized by the time.

The Digital Time Travlers discovered some significant issues that would need to
be addressed before or during the development of their application. Historical
information about locations is scattered across a lot of organizations, and a 
lot of media. In many cases, data is currently in non-digital media. They also 
found that the availability, integrity, and security of data can vary a lot by 
time, medium, and managing organization. Finally, licensing on available data
might prevent or discourage the reuse of historical information.

## Accessibility Guidelines for Maps

- Alison Link
- Jessie Wang
- Liz Puhl
- Mitch Schaps
- Github Page: http://github.com/OpenTwinCities/map-accessibility-guidelines/wiki

At an event named Geo:Code, it's no surprise most of the projects involved a
map in some way. This is also not surprising given how useful maps can be for
presenting location based information, especially digital maps that can 
dynamicly adjust what and how they present. Unfortunately, maps often present 
usability problems for people with visual impairments, and have thus far seen
little energy put into improving their accessibility. This team decided to work
on a set of guidelines for digital maps as a way to prevent these usability
issues.

Over the weekend, the Accessibility Guidelines for Maps team looked through
existing research on accessibility practises and technologies. Out of this
research came a set of principles for developers wishing to use maps, such as:

- make accessibility a developer-side concern
- consider diverse users
- don't have a map be your only format for displaying data
- use simple, high-contrast color schemes
- use smaller words and bigger text with highly legible typefaces

Currently, the team is sharing these principles with developers via a wiki
on the Open Twin Cities GitHub organization. The team's goal is to eventually
move this wiki to the Maptime GitHub organization to gain visability in the
national community of developers who create maps.

## Kids Just Wanna Have Fun

- Mai Xiong
- Pamela-Rose Virtucio
- Ashley Schweitzer
- Sean Guthnecht
- Dustin Huibregtse,
- Brad Neuhauser

There are a lot of things for families to do in the Twin Cities for low or no
cost. Yet, these events and organizations can sometimes be hard to find, and
there currently is no website focused on helping Twin Cities families to find 
fun and inexpensive activities. The Kids Just Wanna Have Fun team wants to fix
that by creating a responsive website that helps Twin Cities families find free
or low-cost activities.

This team spent much of its time focused on designing with an understanding 
their problem and their users. Thus, the team spent time defining what an 
"event" is, looking at sites like EventBrite and What's up 612 for inspiration,
and a lot of brainstorming. The team then organized everything they found and 
came up with into various sets of principles, needs, and wants for thier 
application.

With user experience ideas in order, prototyping began. Continuing their focus
on designing a user experience, the team started with paper prototypes to
express what they wanted and test out their ideas. From there, the team
developed a set of digital wireframes to guide future development of their 
site.

## Urban Agricultural Suitability

- Zach Aaberg
- Andrew Dahl
- Application: <http://www.minneapolismn.gov/sustainability/homegrown/vacant/index.htm>

Urban farming is an increasingly popular way to produce local food, and a novel
way to use land that otherwise sits vacant. The [Homegrown Minneapolis Food
Council](http://www.ci.minneapolis.mn.us/sustainability/homegrown/WCMS1P-130114)
has been working on policies and tools to promote urban farming in Minneapolis,
including a tool to help urban farmers, policy makers, and property owners 
identify suitable vacant lots for urban farming. During Geo:Code, the Urban
Agricultural Suitability team worked to further build out this tool.

Over the weekend, this team focused on adding features that would help 
government officials decide which government owned vacant lots would be good
candidates for urban farming. This led to the creation of an interactive map of
vacant lots in Minneapolis, with accompanying information about the size, 
zoning, estimated market value, and owner of the lot. The map can also be 
filtered by property type, zoning code, ward, and type of owner.

The team also created some long term feature goals for the application. To 
improve on the tool's ability to help individuals and organizations to find
suitable lots for farming, the team wants to add information from the state and
county on contamination, add locations of fire hydrants to help in watering, 
and include data on the solar suitability of a parcel.
