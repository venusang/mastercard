# Developing with Grunt

Grunt is a NodeJS-based task runner.  It helps automate common tasks, such as
asset compilation, minification, and testing.  Grunt tasks are included for this
SDK in `Gruntfile.coffee`.

Follow directions below to get up and running with Grunt.

## Prerequisites

- [NodeJS](http://nodejs.org)

## Install NodeJS Modules

From the root directory of the SDK (where `Gruntfile.coffee` is
located), install NodeJS modules:

    npm install

## Build for Production

To compile assets and create a full production build, run the
build task:

    grunt build

## Development

During development, a full minified SDK build is unnecessary.  To
compile assets without minifying:

    grunt compile

## Automatic Compilation & Testing

Since it's cumbersome to manually compile assets after every change during
development, the SDK's `Gruntfile.coffee` includes a `watch` task.  The
task monitors changes to the SDK's `coffee` and `sass` assets,
automatically compiling (but not minifying) them.  Run the following command
before making changes:

    grunt watch

SDK tests are also executed by the `watch` task.  If changing the SDK
significantly, some or all tests may fail.  You may disable auto-testing by
editing the `watch` task in `Gruntfile.coffee`.

## Running Tests

The SDK comes with a complete test suite.  Execute tests from grunt:

    grunt test

Or execute tests directly in a browser.  Open `test/index.html` and click
"Run Tets".


# Using the SDK

Before using the SDK, make sure to initialize it with the server URL:

    $ ->
      AppSdk.init()
      AP.baseUrl = 'http://www.path.com/to/api'

## Working with Data

This SDK supports the following models.  For more information, see
the docs.

* `AppConfiguration`
* `Audit`
* `Bank`
* `BankFaq`
* `BankOffer`
* `BankRanac`
* `ColorSwatch`
* `GetQuestion`
* `LanguageCode`
* `LanguageString`
* `LocalUserStorage`
* `Message`
* `Rtr`
* `User`


### Working with `AppConfiguration`

Fetch data for `AppConfiguration`:

    app_configurations = new LoyaltyRtrSdk.collections.AppConfigurationAll
    app_configurations.fetch
      success: ->
        # do something

Create a new instance of `AppConfiguration`:

    app_configuration = new LoyaltyRtrSdk.models.AppConfiguration 

Save an instance of `AppConfiguration`:

    app_configuration.save()

Update an instance of `AppConfiguration`:

    app_configuration.set
      field_one: 'value1' # replace with actual field names and values
      field_two: 'value2'
    app_configuration.save()

Delete an instance of `AppConfiguration`:

    app_configuration.delete()


### Working with `Audit`

Fetch data for `Audit`:

    audits = new LoyaltyRtrSdk.collections.AuditAll
    audits.fetch
      success: ->
        # do something

Create a new instance of `Audit`:

    audit = new LoyaltyRtrSdk.models.Audit 

Save an instance of `Audit`:

    audit.save()

Update an instance of `Audit`:

    audit.set
      field_one: 'value1' # replace with actual field names and values
      field_two: 'value2'
    audit.save()

Delete an instance of `Audit`:

    audit.delete()


### Working with `Bank`

Fetch data for `Bank`:

    banks = new LoyaltyRtrSdk.collections.BankAll
    banks.fetch
      success: ->
        # do something

Create a new instance of `Bank`:

    bank = new LoyaltyRtrSdk.models.Bank 

Save an instance of `Bank`:

    bank.save()

Update an instance of `Bank`:

    bank.set
      field_one: 'value1' # replace with actual field names and values
      field_two: 'value2'
    bank.save()

Delete an instance of `Bank`:

    bank.delete()


### Working with `BankFaq`

Fetch data for `BankFaq`:

    bank_faqs = new LoyaltyRtrSdk.collections.BankFaqAll
    bank_faqs.fetch
      success: ->
        # do something

Create a new instance of `BankFaq`:

    bank_faq = new LoyaltyRtrSdk.models.BankFaq 

Save an instance of `BankFaq`:

    bank_faq.save()

Update an instance of `BankFaq`:

    bank_faq.set
      field_one: 'value1' # replace with actual field names and values
      field_two: 'value2'
    bank_faq.save()

Delete an instance of `BankFaq`:

    bank_faq.delete()


### Working with `BankOffer`

Fetch data for `BankOffer`:

    bank_offers = new LoyaltyRtrSdk.collections.BankOfferAll
    bank_offers.fetch
      success: ->
        # do something

Create a new instance of `BankOffer`:

    bank_offer = new LoyaltyRtrSdk.models.BankOffer 

Save an instance of `BankOffer`:

    bank_offer.save()

Update an instance of `BankOffer`:

    bank_offer.set
      field_one: 'value1' # replace with actual field names and values
      field_two: 'value2'
    bank_offer.save()

Delete an instance of `BankOffer`:

    bank_offer.delete()


### Working with `BankRanac`

Fetch data for `BankRanac`:

    bank_ranacs = new LoyaltyRtrSdk.collections.BankRanacAll
    bank_ranacs.fetch
      success: ->
        # do something

Create a new instance of `BankRanac`:

    bank_ranac = new LoyaltyRtrSdk.models.BankRanac 

Save an instance of `BankRanac`:

    bank_ranac.save()

Update an instance of `BankRanac`:

    bank_ranac.set
      field_one: 'value1' # replace with actual field names and values
      field_two: 'value2'
    bank_ranac.save()

Delete an instance of `BankRanac`:

    bank_ranac.delete()


### Working with `ColorSwatch`

Fetch data for `ColorSwatch`:

    color_swatches = new LoyaltyRtrSdk.collections.ColorSwatchAll
    color_swatches.fetch
      success: ->
        # do something

Create a new instance of `ColorSwatch`:

    color_swatch = new LoyaltyRtrSdk.models.ColorSwatch 

Save an instance of `ColorSwatch`:

    color_swatch.save()

Update an instance of `ColorSwatch`:

    color_swatch.set
      field_one: 'value1' # replace with actual field names and values
      field_two: 'value2'
    color_swatch.save()

Delete an instance of `ColorSwatch`:

    color_swatch.delete()


### Working with `GetQuestion`

Fetch data for `GetQuestion`:

    get_questions = new LoyaltyRtrSdk.collections.GetQuestionAll
    get_questions.fetch
      success: ->
        # do something

Create a new instance of `GetQuestion`:

    get_question = new LoyaltyRtrSdk.models.GetQuestion 

Save an instance of `GetQuestion`:

    get_question.save()

Update an instance of `GetQuestion`:

    get_question.set
      field_one: 'value1' # replace with actual field names and values
      field_two: 'value2'
    get_question.save()

Delete an instance of `GetQuestion`:

    get_question.delete()


### Working with `LanguageCode`

Fetch data for `LanguageCode`:

    language_codes = new LoyaltyRtrSdk.collections.LanguageCodeAll
    language_codes.fetch
      success: ->
        # do something

Create a new instance of `LanguageCode`:

    language_code = new LoyaltyRtrSdk.models.LanguageCode 

Save an instance of `LanguageCode`:

    language_code.save()

Update an instance of `LanguageCode`:

    language_code.set
      field_one: 'value1' # replace with actual field names and values
      field_two: 'value2'
    language_code.save()

Delete an instance of `LanguageCode`:

    language_code.delete()


### Working with `LanguageString`

Fetch data for `LanguageString`:

    language_strings = new LoyaltyRtrSdk.collections.LanguageStringAll
    language_strings.fetch
      success: ->
        # do something

Create a new instance of `LanguageString`:

    language_string = new LoyaltyRtrSdk.models.LanguageString 

Save an instance of `LanguageString`:

    language_string.save()

Update an instance of `LanguageString`:

    language_string.set
      field_one: 'value1' # replace with actual field names and values
      field_two: 'value2'
    language_string.save()

Delete an instance of `LanguageString`:

    language_string.delete()


### Working with `LocalUserStorage`

Fetch data for `LocalUserStorage`:

    local_user_storages = new LoyaltyRtrSdk.collections.LocalUserStorageAll
    local_user_storages.fetch
      success: ->
        # do something

Create a new instance of `LocalUserStorage`:

    local_user_storage = new LoyaltyRtrSdk.models.LocalUserStorage 

Save an instance of `LocalUserStorage`:

    local_user_storage.save()

Update an instance of `LocalUserStorage`:

    local_user_storage.set
      field_one: 'value1' # replace with actual field names and values
      field_two: 'value2'
    local_user_storage.save()

Delete an instance of `LocalUserStorage`:

    local_user_storage.delete()


### Working with `Message`

Fetch data for `Message`:

    messages = new LoyaltyRtrSdk.collections.MessageAll
    messages.fetch
      success: ->
        # do something

Create a new instance of `Message`:

    message = new LoyaltyRtrSdk.models.Message 

Save an instance of `Message`:

    message.save()

Update an instance of `Message`:

    message.set
      field_one: 'value1' # replace with actual field names and values
      field_two: 'value2'
    message.save()

Delete an instance of `Message`:

    message.delete()


### Working with `Rtr`

Fetch data for `Rtr`:

    rtrs = new LoyaltyRtrSdk.collections.RtrAll
    rtrs.fetch
      success: ->
        # do something

Create a new instance of `Rtr`:

    rtr = new LoyaltyRtrSdk.models.Rtr 

Save an instance of `Rtr`:

    rtr.save()

Update an instance of `Rtr`:

    rtr.set
      field_one: 'value1' # replace with actual field names and values
      field_two: 'value2'
    rtr.save()

Delete an instance of `Rtr`:

    rtr.delete()


### Working with `User`

Fetch data for `User`:

    users = new LoyaltyRtrSdk.collections.UserAll
    users.fetch
      success: ->
        # do something

Create a new instance of `User`:

    user = new LoyaltyRtrSdk.models.User 

Save an instance of `User`:

    user.save()

Update an instance of `User`:

    user.set
      field_one: 'value1' # replace with actual field names and values
      field_two: 'value2'
    user.save()

Delete an instance of `User`:

    user.delete()



## Authentication:  Login & Logout

    AP.auth.Authentication.login
      username: 'test'
      password: 'password'
    
    AP.auth.Authentication.logout()

