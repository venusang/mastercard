# Getting Started 

This is a skeleton application based on Bootstrap.  It is intended for use with
an AnyPresence JavaScript SDK.

1. Generate a JavaScript SDK.
2. Copy `ap_sdk.coffee` into `app/assets/javascripts/sdk/`.
3. Edit `app/assets/javascripts/app/init/init.coffee`:  change the SDK name to
match your SDK.  Change `AP.baseUrl` to the URL of the server to which requests
should be made.

Follow the directions below.

# Running the Application

You may serve the application locally using [Pow](http://pow.cx).  Follow
the directions in the Pow documentation for serving static-only sites.
For example:

    ln -s path/to/app ~/.pow/app

Then access the app in a web browser at `http://app.dev`


# Developing with Grunt

Grunt is a NodeJS-based task runner.  It helps automate common tasks, such as
asset compilation, minification, and testing.  Grunt tasks are included for this
application in `Gruntfile.coffee`.

Follow the directions below to get up and running with Grunt.

## Prerequisites

- [Ruby 2.0.0](http://www.ruby-lang.org/en/)
- [Bundler](http://gembundler.com)
- [NodeJS](http://nodejs.org)

## Install NodeJS Modules

From the root directory of the application (where `Gruntfile.coffee` is
located), install NodeJS modules:

    npm install

## Build for Production

To compile assets and create a full minified production build, run the
build task:

    grunt build

## Development

During development, a full minified application build is unnecessary.  To
compile assets without minifying:

    grunt compile

Normally `public/index.html` loads the fully compiled and minified assets.
During development, however, it should load unminified assets.  Edit
`public/index.html` and follow the directions in the comments to enable development.

## Automatic Compilation & Testing

Since it's cumbersome to manually compile assets after every change during
development, the application's `Gruntfile.coffee` includes a `watch` task.  The
task monitors changes to the application's `coffee` and `sass` assets,
automatically compiling (but not minifying) them.  Run the following command
before making changes:

    grunt watch
