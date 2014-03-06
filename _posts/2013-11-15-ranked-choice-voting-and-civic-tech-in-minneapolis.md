---
layout: blog 
title: Ranked Choice Voting and Civic Tech in Minneapolis
tags: [ranked choice voting, rcv, mpls13, visualization, java, R, javascript, php]
---

Last week, the city of Minneapolis held an unprecedented election. The 2013
Minneapolis Mayoral race was the city's first contested mayoral election to use
Ranked Choice Voting (RCV). The 2013 Minneapolis Mayoral race also featured
quite possibly the longest list of candidates in city history, with 35 names
appearing on the ballot. Those two facts contributed to a long, post election
decision period, in which it took 3 days and 33  manually conducted rounds of
counting until the official winner of the Minneapolis Mayoral race could be
called.

<p style="text-align: center; margin-bottom: 0;"><a href="http://www.flickr.com/photos/44307810@N00/10502724584/in/photolist-h16d7m-5DkDEt-5wcMpn-ef2aSb-hcUkNn-5DpXM3-5wcMo4-5DpXTb"><img src="http://farm4.staticflickr.com/3706/10502724584_1aa01e3dba_z.jpg"/></a></p>
<p style="font-size: 10px; text-align: center;">Part of a sample ballot from the 2013 Minneapolis Mayoral Election. Photo from <a href="http://www.flickr.com/photos/crz/">KZiM</a>.</p>

Among election and democracy wonks, RCV spurs a lot of excitement and
discussion because it is levels the odds a bit for third party candidates.
Among civic technologists, RCV has spurred discussion for a number of other
reasons:

- Like traditional past-the-post elections, RCV is a fairly simple algorithm
  that can be quickly implemented as a computer program. However, RCV is a bit
  more complicated than past-the-post, making implementation of a program for
  it just a bit more challenging, and thus interesting to civic hackers.
  Interesting enough, in fact, that three software developers created four
  versions of a RCV program before the mayoral election was officially called:

  - Carl Magnuson was first with a 
    [Java implementation](https://github.com/cmagnuson/minneapolis-rcv/tree/master/MinneapolisRCV)
  - Winston Chang contributed a
    [version in R](https://github.com/wch/ranked-choice-vote)
  - Tyler Akins answered a challenge from Open Twin Cities and created a
    [JavaScript version](https://github.com/fidian/rcv)
  - For bonus points, Tyler also created a PHP version!
  - Following the official decision, William Cannon also answered a challenge
    from Open Twin Cities, creating a 
    [Python version](https://github.com/wcannon/ranked-choice-voting)
  - Continuing the fun, Brian Maddy implemented RCV in 
    [Clojure](https://github.com/bmaddy/ranked-choice-vote)

- Computerized vote counting machines exist for past-the-post elections, but
  not RCV. Why not? Open Twin Cities members have pointed out that:

  - Only a handful of municipalities use RCV, with San Francisco and
    Minneapolis being the largest of those; and
  - Election counting machines must earn a tough certification from the federal
    government.

  A small market combined with a significant barrier to entry results in little
  interest from counting machine manufacturers in producing a RCV counter.

- Data! RCV produces a mountain of data compared to past-the-post. All this
  data lends itself to analysis about voter preferences, issues of importance,
  and similarity of candidates (in the eyes of voters anyways).

  The City of Minneapolis released
  [ballot data for download](http://vote.minneapolismn.gov/results/2013/index.htm)
  on November 15th. That data is also available in a 
  [GitHub repository of the Twin Cities R User Group](https://github.com/tcrug/ranked-choice-vote-data).

  - Just one day after the election, 
    [John Schrom](https://twitter.com/johnschrom) already produced 
    [this visualization](http://imgur.com/R9lp9Ey) of which candidates picked
    up 2nd and 3rd choice votes from other candidates who were eliminated from
    the race. A day later, John produced 
    [this animation](http://www.john.mn/mpls-mayor-2013/), and you can check
    out some of his data on
    [Github](https://github.com/johnschrom/mpls-mayor-2013).
  - At the [Twin Cities Visualization Group's Hack Day](http://www.meetup.com/Twin-Cities-Visualization-Group/events/145477352/),
    Christian Miller created an [animated box diagram that represents votes in each round](http://rcv.gweb.io/).
  - Andy Zieffler of the University of Minnesota, and of the Citzen-Statistian
    blog, created an animated bar chart of the mayoral election, along with a
    great discussion of the RCV algorithm and events related to the election.
    A few days later, Andy posted a
    [great explanation of how he created the bar chart](http://citizen-statistician.org/2013/11/30/r-syntax-for-ranked-choice-voting/).

It's not just civic technologists who were talking about these issues.
[Minnesota Public Radio wrote about RCV](http://blogs.mprnews.org/cities/2013/11/ranked-choice-voting-review/),
including a note on the need for certification and, thanks to Winston Chang,
the ease of implementing a RCV program. In a 
[followup by MPR](http://www.mprnews.org/story/2013/11/22/politics/ranked-choice-vote-count-programmers),
Winston confirmed his ease of implementation estimate - he wrote his
implementation in an hour and a half while watching TV.

## Updates

### November 19th

- William Cannon implemented RCV in Python. His implementation was added to the
  above list.
- The paragraph and link on MPR's RCV article was added.

### November 27th

- Brian Maddy implemented RCV in Clojure. His implementation was added to the
  above list.

### December 6th

- Christian Miller created an animated box diagram of the Mayoral election
  rounds. His diagram has been added to the data section above.
- Andy Zieffler created an animated bar graph of the Mayoral election rounds.
  His chart, plus his detailed how-to, have been added to the data section
  above.
- A link to MPR's follow up on Ranked Choice Voting was added above.
- Links to the actual 2013 Minneapolis Mayoral ballot data were added above.
