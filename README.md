# opentwincities.github.com

Main website for the Open Twin Cities group

## About

This site is designed to run on Github (through [Github pages](https://pages.github.com/))
with [Jekyll](https://jekyllrb.com/).

## Run locally

1. Install Ruby and NodeJS
    1. If you are using rbenv, do a `rbenv version` and `ruby install`
       whatever rbenv version reports
2. Install OpenSSL dev files: `sudo apt-get install libssl-dev`
3. `gem install bundler`
4. `bundle install`
5. `bundle exec jekyll server --watch`
6. Go to `http://localhost:4000` in your web browser.

GitHub runs the close-to-newest release of Jekyll, so be sure to `bundle install` often.

This should watch for changes, so there is no need to restart server
while working on this.  Also, for reference see the [Jekyll install instructions](https://github.com/mojombo/jekyll/wiki/install).

## Editing content

The idea of Jekyll is that it compiles things into static HTML, so most of the content
is handled with basic HTML or Markdown in flat files in the repository.

If you just want to update content, consider using [prose.io](https://prose.io/), as
it is a nice web based interface for editing text files on Github.

If you want to include some type of icon in content, consider using an icon from
the [Foundation Icon Fonts](https://zurb.com/playground/foundation-icon-fonts-3)
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
  least 200px square). If not provided, the default image is the OTC logo.
* tags (Optional) - Similar to tags on any other blog. Used by other content types to
  list similar posts.

#### Events

A special type of Post for OTC associated events.

Event posts live in /events/_posts and use the **event** layout. All published
events will appear in post listing pages (ordered by publication date) *and*
event listing pages (ordered by date of the event). Again, the first paragraph
of a blog post will be displayed on post listing pages as an excerpt.

##### Metadata Variables

* title - Name of the event
* published - If True, the event will be visable to site goers. Otherwise, the
  event is a draft.
* meetup_id - ID of an associated Meetup event. If this is provided, a Meetup
  RSVP button will appear on the event's page.
* source_meetup_content - If True, the event's description will be pulled by
  the browser from Meetup's API and inserted into the body of the event post.
* rsvp_url - Absolute URL to a webpage that allows the user to register for the
  event. If meetup_id isn't provided, this will appear on the event's page.
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
* event_date - Date and time that the event will take place. Format is
  YYYY-MM-DD HH:MM:SS, and if set, event_date *must* be in this format or else
  the site will fail to build. If using Prose.io, this variable must currently
  be set via the Raw Metadata field in. If not set, event_date will default to
  the date of publication of the event post, and the event will always appear
  at the top of event lists. This will appear on the event's page and in post
  listings.

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
* [Foundation](https://foundation.zurb.com/)
* [Foundation Icon Fonts](https://zurb.com/playground/foundation-icon-fonts-3)
* [snaptortise's jekyll-rss-feeds](https://github.com/snaptortoise/jekyll-rss-feeds)
* Loading animation from [Wikipedia Commons](https://upload.wikimedia.org/wikipedia/commons/3/3a/Gray_circles_rotate.gif)
