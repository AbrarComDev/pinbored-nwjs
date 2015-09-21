![Pinbored](http://powergeek.nl/static-imgs/pinbored-logo-github.png)

<p align="center">
  [![David](https://img.shields.io/david/michahell/pinbored-webkit.svg)]()
  [![devDependency Status](https://david-dm.org/michahell/pinbored-webkit/dev-status.svg)](https://david-dm.org/michahell/pinbored-webkit/#info=devDependencies)
  [![Code Climate](https://codeclimate.com/github/michahell/pinbored-webkit/badges/gpa.svg)](https://codeclimate.com/github/michahell/pinbored-webkit)
  [![Codacy Badge](https://www.codacy.com/project/badge/8c9342d436414724bee17f6ab6f5076f)](https://www.codacy.com/app/maggelo/pinbored-webkit)
  [![Test Coverage](https://codeclimate.com/github/michahell/pinbored-webkit/badges/coverage.svg)](https://codeclimate.com/github/michahell/pinbored-webkit)
  [![GitHub issues](https://img.shields.io/github/issues/michahell/pinbored-webkit.svg)]()
</p>

<p align="center">
  [![GitHub release](https://img.shields.io/github/release/michahell/pinbored-webkit.svg)]()
  [![GitHub license](https://img.shields.io/github/license/michahell/pinbored-webkit.svg)]()
</p>

<p align="center">
[![Stories in Ready](https://badge.waffle.io/michahell/pinbored-webkit.png?label=In%20Progress&title=In%20Progress)](https://waffle.io/michahell/pinbored-webkit)
</p>

<p align="center">
[![Gitter](https://badges.gitter.im/JoinChat.svg)](https://gitter.im/michahell/pinbored-webkit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)<-
[![Flattr me](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=michahell&url=https://github.com/michahell/pinbored-webkit&title=pinbored-webkit&language=english&tags=github&category=software)
</p>

[Pinbored](http://michahell.github.io/pinbored-webkit) is a 'native' [Pinboard](https://pinboard.in/) client application built with Node-webkit and AngularJS. Currently only OSX binaries are offered, but that is only because I use OSX myself and have not yet started building on other OSes. See the [abandoned AS3 client version](https://github.com/michahell/pinbored) for more info on the history of this project.

features / functionality
------------------------

**SUPPORTED**

* **Bookmarks**
  * *currently:* update, delete, browse, (full-text) search, stale checking.
  * *planned:* create.
  
* **Tags**
  * *currently:* update, delete, browse, fold.
  * *planned:* create, search, fake tag hierarchy.

* **Search**
  * *currently:* full-text, tagname, switch between OR/AND search.
  * *planned:* fake tag hierarchy.

* **Batch editing**
  * *currently:* selection add tag, selection fold all tags, selection remove all tags, selection stale checking, delete selection.
  * *planned:* selection delete all tags, make selection public/private, share selection.

**NOT YET SUPPORTED**

* **Note(s)**
  * *currently*: NONE.
  * *planned:* create, update, delete, search.

* **Full collection stale checking**
  * *currently*: NONE.
  * *planned:* stale check your whole bookmark collection!


Fake tag hierarchy explanation
------------------------------

In most (bookmarking) applications, a collection of items is either a flat list or a hierarchical structure (usually a tree, like in your operating systems file browser). However, we can stick to a naming convention for naming tags such that we are able to parse that structure and construct a hierarchy from it. Say we would like the following hierarchy:

* programming (main tag)
  * tooling
  * talks

We could then name our tags like so: *programming*, *programming.tooling* and *programming.talks*. Similarly we could use **/**, **>**, **-**, **_** or some other **hierarchy denotation symbol**.

Why
---

Why use a separate bookmark service to manage bookmarks? I have < insert browser > for that?

* Access bookmarks across multiple browsers.
* Independant of browser crashes, sudden loss of all bookmarks, malware.
* Being sure that no google, mozilla or microsoft are using your bookmarks for whatever.

There are several apps that already do this but they are either commercial software or did not have the simple features that i want them to have.

For bookmark creation consider using:

* Shiori: http://aki-null.net/shiori/ or just: ```brew cask install shiori```
* browser dependant plugins or widgets.

I WILL add bookmark creation functionality in a later version, however this was never the intention of this app.
The app is aimed at **managing** one's bookmarks, for example after a switch from < insert browser >
to Pinboard with some 1000 unmanageable bookmarks. There appear to be users with 40.000 bookmarks. Yes. 40K bookmarks.
I wish to create something to allow for managing such a huge amount of bookmarks, even though that is not my own usecase.

Screenshots
-----------

Can be seen on [the project page](http://michahell.github.io/pinbored-webkit/#screenshots).

Download
--------

Downloads are available on the [project page](http://michahell.github.io/pinbored-webkit/#binary-downloads) or from the GH [releases page](https://github.com/michahell/pinbored-webkit/releases).


Building + running from source
==============================

quirks
------
~~On OSX ```ulimit -S -n 4096``` no longer neccesary due to the  [grunt-bowercopy](https://www.npmjs.org/package/grunt-bowercopy) task.~~

requirements
------------

* [Node.js and NPM](http://nodejs.org/)
* Global install of [Grunt](http://gruntjs.com/), [Bower](http://bower.io/).
* Some patience! the ```npm install``` command can take quite a while to finish. Among others this is due to the nodewebkit module being downloaded by [karma-nodewebkit-launcher](https://www.npmjs.org/package/karma-nodewebkit-launcher) which needs it to be able to test using node webkit.

steps
-----

1. clone or fork project.
2. run ```npm install``` in root (installs dev. and app dependancies and bower components)
3. run ```npm install``` in /App (installs app node module dependancies)
4. run:
    * ```grunt build``` (create App_release folder with minified source) OR
    * ```grunt release-osx``` [```release-win```, ```release-lin```]

note: releasing for Windows + Linux is possible but not (yet) tested by me.

warnings & errors
-----------------

Depending on your node version, you may see some of the following npm warnings:

* npm WARN engine xmlbuilder@2.2.1: wanted: {"node":"0.8.x || 0.10.x"} (current: {"node":"4.0.0","npm":"3.3.3"})
* npm WARN engine xmlbuilder@2.4.4: wanted: {"node":"0.8.x || 0.10.x || 0.11.x"} (current: {"node":"4.0.0","npm":"3.3.3"})

And errors:

* node-gyp rebuild errors for certain npm modules.



Caveats
-------
*  OSX
   * None!
*  Windows
   * Unknown. Help me build on windows!
*  Linux
   * On Ubuntu Linux, which I used to test & build for linux, there can be some hassle getting the 'node' command to work:
   see: https://stackoverflow.com/questions/18130164/nodejs-vs-node-on-ubuntu-12-04/18130296#18130296
   * removing the core node package using apt-get worked for me to get node and npm working together fine.
   * Also, on Ubuntu version 14.x.x and up there is a [libudev.so.0 issue](https://www.exponential.io/blog/install-node-webkit-on-ubuntu-linux) but following the guide and thus installing node-webkit outside of npm works flawlessly.
   * And finally, for some reason, the grunt-bowercopy task needs npm module 'esprima' on Ubuntu. Since on OSX that module is not needed, just installing it suffices: ```$ npm install esprima ```.

running development version
---------------------------
If you have node-webkit installed, you can use the following command in the root of the project dir to run the app:
```
$ <node-webkit executable location> App
```

Or, if you have the **nw** alias configured:

```
$ nw App
```

running release version
-----------------------
pinbored-webkit source css/js uglified + much less files in App_release dir.
This is the version that gets packaged into a native application when a version is released.
Do note that if you change the source code, and refresh inside node-webkit, it does not reflect changes as 
opposed to running the development version.

```
$ grunt build
$ nw App_release
```


Disclaimer
==========

Additional to the WTFPL license it is important that you know and understand the following:

*all requests performed by the application to the Pinboard API are sequences of consecutive, single operation REST requests and are not transactions with rollback history like in SQL transactions. They are 'destructive operations' by nature (that means no undo). Future versions might support custom undo history and functionality.


Roadmap
=======

all milestones and issues:
* [Milestones](https://github.com/michahell/pinbored-webkit/milestones)
* [Issues](https://github.com/michahell/pinbored-webkit/issues)

milestones list:
* [current v0.0.4](https://github.com/michahell/pinbored-webkit/milestones/0.0.4%20Yellow%20Mountain)
* [next    v0.0.5](https://github.com/michahell/pinbored-webkit/milestones/0.0.5%20Green%20Wrench)
* [next    v0.0.6](https://github.com/michahell/pinbored-webkit/milestones/0.0.6%20Rebel%20Dagger)

name generator used for milestone names:
[Project Name Generator](http://online-generator.com/name-generator/project-name-generator.php)


Shit used, Acknowledgements etc.
==============================
![WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl.svg)