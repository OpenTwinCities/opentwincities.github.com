---
layout: default
title: Open Data FAQ 
---

## {{page.title}}

### What is Open Data?

Most often, *open data* refers to the idea that data controlled by a government
body should be accessible to citizens and other government bodies in a
structured format. The concept of open data can be broken down into three
levels:

* Legal access to data - Citizens have the basic right to access government
  data
* Reasonable access to data - Government data can be accessed at a reasonable
  cost and within a reasonable time frame
* Access to structured data - Government data can be retrieved in an open
  format that computer programs can readily understand and process. For
  example, a CSV is an open, structured format, while a PDF is not.

### What is an Open Standard?

In the context of open data, an open standard typically refers to a data format
whose specification is freely available to be read and implemented by anybody.
Data available in an open standard is often the most accessible to analysts,
journalists, and programmers, as anybody can access the tools and information
needed to work with that data. Because of this, open standards often support
competitive markets of applications and organizations that perform similar
services on similar types of data.

### What is an API?

API stands for *Application Programmer Interface*.

A web page is an interface for people to be able to read and interact with
the information that a certain website or application provies. On well designed 
web pages, a lot of work goes into making a page so that people can find the 
information they want, understand that information, find all the ways to 
interact with that information (such as submiting new or updated information), 
and easily interact with that information.

An API does the same thing, except it is designed to be an **interface for
other computer programs**. The very things that can make a web page a great
inteface for people - images, layout, styling, interactive maps - make them
very difficult for a computer program to work with. Computer programs are only
interested in the actual data, everything else is clutter to the program. Thus,
APIs provide a way for a computer program to request and interact with that
data without the clutter.

As an example, consider [this page that displays weather information for St. Paul](http://openweathermap.org/city/5045360).
When a computer program visits the weather page, [this is what it sees](http://pastebin.com/raw.php?i=tqfqF6D5).
If a computer program instead uses an API to get whether and forecast
information, it will see [this](http://api.openweathermap.org/data/2.5/weather?q=St.%20Paul&mode=xml&units=imperial)
and [this](http://api.openweathermap.org/data/2.5/forecast/daily?q=St.%20Paul&mode=xml&units=imperial&cnt=7).
The API provides much cleaner and structured results for a computer program to
work with.

For those interested in learning more about what APIs are and how to create
them, [Zapier provides a free, great, and fairly quick introductory course to APIs](https://zapier.com/blog/free-api-course/).
      
### Do City reports provide access to city data?

Not to the level that open data does. A report published by the city represents
a finished presentation of data. The report includes analysis, formatting and
layout, and commentary that is meant to be read by people, and often meant to
be read by a certain audience. While these presentations of data are valuable,
they usually do not provide the raw, structured data required by others who
wish to create their own analyses, presentations, or new applications.

### Which cities officially support open data?

A [report by the San Diego Data Bank](http://www.sandiegodata.org/reports/municipal-open-data-policies/)
recently analyzed the policies of 8 major US and Canadian cities that have
implemented open data programs in the last seven years. These cities include
Austin, Chicago, Philadelphia, Portland, New York, San Francisco, Washington,
D.C. At the federal level, the White House has also implemented an open data
policy for the  executive branch.

### Is there more information available on Open Data?

Yes, tons more. The Kansas City Code for America Fellowship Class put together 
a [**fantastic open government and open data resource**](http://cfakc.tumblr.com/post/60775247513/digital-innovation-in-government-resources)
with dozens and dozens of links. The Kansas City resource includes links to 
example **open government policies**, **digital roadmaps**, **digital
government design principles**, **open data frameworks**, **open data policies**, **open
data schedules**, and **open data portals**.

The [Sunlight Foundation's Local Policy program](http://sunlightfoundation.com/policy/local/)
also provides a tremendous source of open data information. Based on the
experience of dozens of cities and states across the country, Sunlight created
an [exhaustive list of principals and guidelines](http://sunlightfoundation.com/opendataguidelines/)
that open data policies should or can elect to include. Sunlight also provides
case studies of open data's impact in specific issues, including crime,
campaign finance, and zoning.
