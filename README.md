# opentwincities.github.com

Main website for the Open Twin Cities group

## About

This site is designed to run on Github (through [Github pages](http://pages.github.com/))
with [Jekyll](http://jekyllrb.com/).

## Run locally

1. Install Ruby and NodeJS
2. ```gem install jekyll redcarpet```
3. ```jekyll server --watch```
4. Go to ```http://localhost:4000``` in your web browser.

GitHub runs the close-to-newest release of Jekyll, so be sure to `gem update jekyll` periodically.

This should watch for changes, so there is no need to restart server
while working on this.  Also, for reference see the [Jekyll install instructions](https://github.com/mojombo/jekyll/wiki/install).

## Editing content

The idea of Jekyll is that it compiles things into static HTML, so most of the content
is handled with basic HTML or Markdown in flat files in the repository.

If you just want to update content, consider using [prose.io](http://prose.io/), as
it is a nice web based interface for editing text files on Github.

If you want to include some type of icon in content, consider using an icon from
the [Foundation Icon Fonts](http://zurb.com/playground/foundation-icon-fonts-3)
that are already made available to all pages on OpenTwinCities.org.

### Content Types

There are three main types of content on Open Twin Cities.

#### Blog Posts

General articles. Updates, recaps, discussion pieices. Basically any general
content.

Blog posts live in /_posts and use the **blog** layout. All published blog 
posts will appear in the post listing pages. The first paragraph of a blog post
will be displayed on post listing pages as an excerpt. 

##### Metadata Variables

* title - Name of the post
* published - If True, the post will be visable to site goers. Otherwise, the
  post is a draft.
* author (Optional) - If provided, a by-line will be added to the post's page 
  and post's listing displaying this value. The author's name with a link to 
  some profile is recommended.
* social_image (Optional) - Absolute URL to an image that social media
  platforms should display with this post. Image should be fairly large (at
  least 500px square). If not provided, the default image is the OTC logo.
* tags (Optional) - Similar to tags on any other blog. Used by other content types to
  list similar posts.

#### Events

A special type of Post for OTC associated events.

Event posts live in /events/_posts and use the **event** layout. All published
events will appear in post listing pages *and* event listing pages. Again, the
first paragraph of a blog post will be displayed on post listing pages as an
excerpt.

##### Metadata Variables

* title - Name of the event
* published - If True, the event will be visable to site goers. Otherwise, the
  event is a draft.
* date - Date and time that the event will take place. This will appear on the
  event's page and in post listings. Format is YYYY-MM-DD HH:MM:SS
* rsvp_url - Absolute URL to a webpage that allows the user to register for the
  event. This will appear on the event's page.
* venue_name - Name of the place that the event is being held at. This will
  appear on the event's page.
* venue_location - Address (ideally full physical address) that this event will
  take place at. this will appear on the event's page.
* social_image (Optional) - Absolute URL to an image that social media
  platforms should display with this event. Image should be fairly large (at
  least 500px square). If not provided, the default image is the OTC logo.
* related_tag (Optional) - If provided, the event's page will list any blog
  posts that have this tag. Useful for gathering all content about an event
  on one page.

#### Everything Else

Most static content will be a Post or Event. Only special static pages should
not be a Post or Event (such as the Sponsorship page). Dynamic content pages,
such as post/event listing pages, also fall into this category.

All other content uses the **default** layout, except for the homepage, which
uses the **home** layout.

## RSS Feeds

OpenTwinCitis.org provides a couple of RSS feeds:

* /feed.xml - RSS of the 10 most recent posts of any type on the site
* /events/feed.xml - RSS of the 10 events with the latest date on the site

Both of these RSS feeds are linked to in the Head of every page on the site.

## Giants

* HTML5Boilerplate
* Modernizer
* jQuery
* [Foundation](http://foundation.zurb.com/) 
* [Foundation Icon Fonts](http://zurb.com/playground/foundation-icon-fonts-3)
* [snaptortise's jekyll-rss-feeds](https://github.com/snaptortoise/jekyll-rss-feeds)
