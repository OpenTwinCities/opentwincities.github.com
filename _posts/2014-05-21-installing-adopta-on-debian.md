---
layout: blog
published: true
title: Installing Adopt-A on Debian/Ubuntu with rbenv 
author: <a href="https://twitter.com/wbushey">Bill Bushey</a>
social_image: http://adoptahydrant.org/assets/logos/adopt-a-hydrant-a8f4216f8de0441457e1909bf5997666.png
tags: 
  - open source
  - adopta
  - adopt-a-hydrant
  - installation
  - debian
  - linux
  - ruby
---

Inspired and helped by the [documentation work of Chad Foley in Raleigh](http://localwiki.net/raleigh/Adopta_App/Development?&docuredirected_from=raleigh%20adopta%20app/development),
I wanted to share some notes I took as I went through the process of installing Adopt-a-Hydrant on Debian (Jessie in my case), while being a total n00b to Ruby.

##Adopt-A System Package Requirements

Most of Adopt-a-Hydrants' requirements will be taken care of by Ruby's own requirements system, but there are a few system packages
that will need to be installed:

* Postgres
* SQLite 3 Development Files
* node.js

Of course, you'll also need git, and a few required packages for rbenv (build packages and ssl development packages).

To install all of these, run

    apt-get install postgresql libsqlite3-dev nodejs build-essential libssl-dev libcurl4-openssl-dev libreadline-dev -y

##Setting up the DB

With Postgres installed, you'll now want to setup a DB user for Adopt-a-Hydrant. By default, Adopt-a wants to use a DB user with the name **adopta** and **no password**. To create that, run:

    sudo -u postgres createuser -d adopta

To enable Adopt-a-Hydrant to connect to Postgres without a password, you'll need to configure Postgres to allow the adopta user to login without a password. To do that, edit */etc/postgresql/\{version number\}/main/pg_hba.conf* and add the following line to the bottom:

    local   all             adopta                                  trust

Save and close the file. If you have multiple versions of Postgres installed, you'll probably have to make this same change to pg_hba.conf in each version's folder, unless you already know which Postgres DB/version Adopt-a-Hydrant is going to use. 

Finally, run:

    service postgresql restart

##Get rbenv

As somebody new to Ruby but experienced with Python, I found a lot of similarity in projects sometimes being tied to specific versions of the language. So I was happy to discover [rbenv](https://github.com/sstephenson/rbenv), which is *kind of* like virtualenv for Python. OK, they're fairly different, but like virtualenv, rbenv makes it a whole lot easier to install versions of Ruby and manage which version a project is using.

[DigitalOcean provides good instructions on how to install rbenv](https://www.digitalocean.com/community/articles/how-to-install-ruby-on-rails-with-rbenv-on-debian-7-wheezy). For the really impaitient, the process is

    git clone https://github.com/sstephenson/rbenv.git ~/.rbenv

    echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc

    echo 'eval "$(rbenv init -)"' >> ~/.bashrc

    git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build

    git clone https://github.com/sstephenson/rbenv-gem-rehash.git ~/.rbenv/plugins/rbenv-gem-rehash

Note that this will also install a couple or rbenv plugins that actually let you install Ruby and update rbenv when that happens.

##Get Adopt-a-Hydrant

Now it's time to get the thing we want! If you haven't already, fork the [Adopt-a-Hydrant repo](https://github.com/codeforamerica/adopt-a-hydrant). Then move to your favorite development directory, and `git clone` your fork. Or, if you just want to grab what's on the main repo right now, run

    git clone https://github.com/codeforamerica/adopt-a-hydrant.git

##Get Ruby and Bundle(r)

Move into the adopt-a-hydrant folder. Through the magic of a .ruby-version file, the repository sets the version of Ruby that it needs to run. You can either look in this file, or run

    rbenv version

to find out what version of Ruby the repo needs. Once you know what version of Ruby is needed, simply run:

    rbenv install <version number> -k

The -k switch tells rbenv to keep source files, which will be needed later to install Adopt-a-Hydrant.

With the required version of Ruby installed, it is now time to install bundle for the required version of Ruby. Assuming you are still in the adopt-a-hydrant folder, you can simply run

    gem install bundler

Even though the package is named `bundler`, the program is named `bundle`. Bundle is what will actually install Adopt-a-Hydrant and get all of its remaining requirments.

###Ruby 2.1.1 and Debian

This note is more for the sake of information than instruction, since the latest commits to Adopt-a-Hydrant now have the platform running on Ruby 2.1.2. During my initial attempts to install Adopt-a-Hydrant, the platform required Ruby 2.1.1, and I found that attempts to install 2.1.1 would end with an error related to openssl and readline.

If, for whatever reason, you *really* want Ruby 2.1.1, there are [instructions out there on how to install it on Debian/Ubuntu](http://blog.blenderbox.com/2014/04/21/installing-ruby-2-1-1-on-ubuntu-14-04-x86_64/). [rbenv's own documentation suggests you can apply a patch for this issue when installing Ruby](https://github.com/sstephenson/ruby-build/wiki#openssl-bindings-on-debian-80-jessie), but I wasn't able to get this to work.

Or you can just avoid this whole mess by getting a version of Adopt-a-Hydrant that doesn't require Ruby 2.1.1.

##Install Adopt-a-Hydrant

W00t, we finally have everything we need to install and run Adopt-a-Hydrant. To do that, we just run the following, taken straight from [Adopt-a-Hydrant's README](https://github.com/codeforamerica/adopt-a-hydrant#installation):

    bundle install

    bundle exec rake db:create

    bundle exec rake db:schema:load

Assuming this finishes, you can start Adopt-a-Hydrant with

    rails server

Congrats! And happy hacking!
