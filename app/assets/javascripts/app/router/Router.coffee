class AP.router.Router extends Backbone.Router
  routes:
    '': 'root'
    'home': 'root'
    'login': 'loginPage'
    'logout': 'signOut'

    'programs': 'programs'
    'program/new': 'newProgram'
    'program/edit/:program_id/:record_id': 'editProgram'
    'program-settings/:program_id': 'programsettings'
    'program-offer/new/:program_id': 'newOffer'
    'program-offer/edit/:program_id/:record_id': 'editOffer'

    'language-settings/:id' : 'languagesettings'
    'language-settings/edit/:program_id/:id' : 'editlanguagesettings'
    'language-settings/new/:program_id' : 'newlanguagesettings'

    'faq-settings/:program_id': 'faqsettings'
    'faq/new/:program_id': 'newFaq'
    'faq/edit/:program_id/:record_id': 'editFaq'
    
    'color-settings/:program_id': 'colorsettings'
    'color-settings/edit/:program_id/:record_id': 'editcolorsettings'
    'color-settings/new/:program_id': 'newcolorsettings'

    'messages': 'messages'
    'message/new': 'newmessage'

    
  root: ->
    @removeExisting('LoginPage')
    if AP.auth.Authentication.isAuthenticated()
      @navigate 'programs', trigger: true
    else
      @navigate 'login', trigger: true

#******************* AUTHENTICATION (LOGIN/LOGOUT) *************************
  loginPage: ->
    @removeExisting('LoginPage')
    if AP.auth.Authentication.isAuthenticated()
      @navigate 'home', trigger: true
    else
      AP.Viewport.showItemByClass 'LoginPage'

  signOut: ->
    if AP.auth.Authentication.isAuthenticated()
      AP.auth.Authentication.logout()
        complete: ->
          @navigate 'login', trigger: true
    else
      @navigate 'login', trigger: true



#******************* CRUD PROGRAM *************************
  #CREATE
  newProgram: (id) ->
    @removeExisting('ProgramForm')
    if AP.auth.Authentication.isAuthenticated()
      AP.Viewport.showItemByClass 'ProgramForm',
      bankId: id  
    else
      @navigate 'login', trigger: true
  
  #READ
  programs: ->
    @removeExisting('ProgramPage')
    if AP.auth.Authentication.isAuthenticated()
      AP.Viewport.showItemByClass 'ProgramPage',
    else
      @navigate 'login', trigger: true
  
  #UPDATE/EDIT
  editProgram: (program_id, record_id) ->
    @removeExisting('ProgramForm')
    @getProgram record_id, (record) =>
      if record
        AP.Viewport.showItemByClass 'ProgramForm',
          record: record
          programId: program_id
          recordId: record_id
      else
        # record was not fetched (may have been deleted, or bad ID),
        # redirect to home page
        @navigate 'programs', trigger: true
  
  #GET BANK RECORD BASED ON RECORD ID
  getProgram: (id, callback) ->
    collection = new LoyaltyRtrSdk.collections.BankExactMatch
    collection.query id: id,
      complete: ->
        callback collection.first()

#******************* PROGRAM SETTINGS *************************
  #READ
  programsettings: (program_id) ->
    @removeExisting('ProgramSettingsPage')
    @getProgramSettingsBank program_id, (record) =>
      if record
        AP.Viewport.showItemByClass 'ProgramSettingsPage',
          record: record
          programId: program_id
      else
        @navigate 'programs', trigger: true
  
  #GET BANK RECORD BASED ON PROGRAM ID
  getProgramSettingsBank: (program_id, callback) ->
    collection = new LoyaltyRtrSdk.collections.BankExactMatch
    collection.query program_level_id: program_id,
      complete: ->
        callback collection.first()

  #GET RTR RECORD BASED ON PROGRAM ID
  getProgramSettingsRtr: (program_id, callback) ->
    collection = new LoyaltyRtrSdk.collections.RtrExactMatch
    collection.query program_level_id: program_id,
      complete: ->
        callback collection.first()
        
#******************* CRUD OFFERS *************************
  #CREATE

  newOffer: (program_id) ->
    @removeExisting('ActiveOffersForm')
    @getProgramSettingsBank program_id, (record) =>
      if AP.auth.Authentication.isAuthenticated()
        if record
          AP.Viewport.showItemByClass 'ActiveOffersForm',
            record: record
            programId: program_id
      else
        @navigate 'signout', trigger: true
  
  #READ - Active Offers are directly displayed on the Program Settings Page (they are not on their own page)
  
  #UPDATE
  editOffer: (program_id, record_id) ->
    @removeExisting('ActiveOffersForm')
    @getExistingOffer record_id, (record) =>
      if record
        AP.Viewport.showItemByClass 'ActiveOffersForm',
          record: record
          programId: program_id
          recordId: record_id
      else
        @navigate 'home', trigger: true

  #GET THE RECORD BASED ON RECORD ID
  getExistingOffer: (id, callback) ->
    collection = new LoyaltyRtrSdk.collections.BankOfferExactMatch
    collection.query id: id,
      complete: ->
        callback collection.first()
  
#******************* CRUD LANGUAGE SETTINGS *************************
  #CREATE
  newlanguagesettings: (program_id) ->
    @removeExisting('LanguageSettingsForm')
    if AP.auth.Authentication.isAuthenticated()
      AP.Viewport.showItemByClass 'LanguageSettingsForm',
        programId: program_id
    else
      @navigate 'signout', trigger: true

  #READ
  languagesettings: (program_id) ->
    @removeExisting('LanguageSettingsPage')
    if AP.auth.Authentication.isAuthenticated()
      @getLanguageSettingsRecordByProgramID program_id, (record)=>
        if record
          AP.Viewport.showItemByClass 'LanguageSettingsPage',
            programId: program_id
            record: record
        else
          console.debug('no record exists')
    else
      @navigate 'login', trigger: true

  #UPDATE/EDIT
  editlanguagesettings: (program_id, record_id) ->
    @removeExisting('LanguageSettingsForm')
    if AP.auth.Authentication.isAuthenticated()
      @getLanguageSettingsRecordByRecordID record_id, (record) =>
        if record
          AP.Viewport.showItemByClass 'LanguageSettingsForm',
            record: record
            programId: program_id
            recordId: record_id
        else
          @navigate '#color-settings/'+program_id, trigger: true
    else
      @navigate 'logout', trigger: true
  
  
  #GET THE RECORD BY PROGRAM ID
  getLanguageSettingsRecordByProgramID: (program_id, callback) ->
    collection = new LoyaltyRtrSdk.collections.LanguageStringExactMatch
    collection.query program_level_id: program_id,
      complete: ->
        callback collection.first()
    
  #GET THE RECORD BY RECORD ID 
  getLanguageSettingsRecordByRecordID: (record_id, callback) ->
    collection = new LoyaltyRtrSdk.collections.LanguageStringExactMatch
    collection.query id: record_id,
      complete: ->
        callback collection.first()
#******************* CRUD COLOR SETTINGS *************************
  
  #CREATE
  newcolorsettings: (program_id) ->
    @removeExisting('ColorSettingsForm')
    if AP.auth.Authentication.isAuthenticated()
      AP.Viewport.showItemByClass 'ColorSettingsForm',
        programId: program_id
    else
      @navigate 'signout', trigger: true

  #READ
  colorsettings: (program_id) ->
    @removeExisting('ColorSettingsPage')
    if AP.auth.Authentication.isAuthenticated()
      @getColorSettingsRecordByProgramID program_id, (record)=>
        if record
          AP.Viewport.showItemByClass 'ColorSettingsPage',
            programId: program_id
            record: record
        else
          console.debug('no record exists')
    else
      @navigate 'login', trigger: true

  #UPDATE/EDIT
  editcolorsettings: (program_id, record_id) ->
    @removeExisting('ColorSettingsPage')
    if AP.auth.Authentication.isAuthenticated()
      @getColorSettingsRecordByRecordID record_id, (record) =>  
        if record
          AP.Viewport.showItemByClass 'ColorSettingsForm',
            record: record
            programId: program_id
            recordId: record_id
        else
          @navigate '#color-settings/'+program_id, trigger: true
    else
      @navigate 'logout'

  

  getColorSettingsRecordByProgramID: (program_id, callback) ->
    collection = new LoyaltyRtrSdk.collections.ColorSwatchExactMatch
    collection.query program_level_id: program_id,
      complete: ->
        callback collection.first()
    

  getColorSettingsRecordByRecordID: (record_id, callback) ->
    collection = new LoyaltyRtrSdk.collections.ColorSwatchExactMatch
    collection.query id: record_id,
      complete: ->
        callback collection.first()
    

#******************* CRUD FAQ SETTINGS *************************  
  #CREATE
  newFaq: (program_id) ->
    @removeExisting('FaqForm')
    if AP.auth.Authentication.isAuthenticated()
      AP.Viewport.showItemByClass 'FaqForm',
      programId: program_id  
    else
      @navigate 'home', trigger: true

  #READ
  faqsettings: (program_id) ->
    @removeExisting('FaqPage')
    if AP.auth.Authentication.isAuthenticated()
      @getFaqRecordByProgramID program_id, (record)=>
        if record
          AP.Viewport.showItemByClass 'FaqPage',
            programId: program_id
            record: record
        else
          console.debug('no record exists')
    else
      @navigate 'login', trigger: true
      
  #UPDATE        
  editFaq: (program_id, record_id) ->
    @removeExisting('FaqForm')
    @getFaq record_id, (record) =>
      if record
        AP.Viewport.showItemByClass 'FaqForm',
          record: record
          recordId: record_id
          programId: program_id
      else
        @navigate 'home', trigger: true

  #GET THE FAQ BY PROGRAM ID
  getFaqRecordByProgramID: (program_id, callback) ->
    collection = new LoyaltyRtrSdk.collections.BankFaqExactMatch
    collection.query program_level_id: program_id,
      complete: ->
        callback collection.first()

  #GET THE FAQ RECORD
  getFaq: (id, callback) ->
    collection = new LoyaltyRtrSdk.collections.BankFaqExactMatch
    collection.query id: id,
      complete: ->
        callback collection.first()

#******************* CRUD MESSAGES *************************
  #READ
  messages: ->
    @removeExisting('MessagesPage')
    if AP.auth.Authentication.isAuthenticated()
      AP.Viewport.showItemByClass 'MessagesPage' 
    else
      @navigate 'login', trigger: true

  #CREATE
  newmessage: ->
    @removeExisting('MessagesForm')
    if AP.auth.Authentication.isAuthenticated()
      AP.Viewport.showItemByClass 'MessagesForm'  
    else
      @navigate 'login', trigger: true


#******************* CLEARS OUT PREVIOUSLY LOADED PAGE TEMPLATE *************************
  removeExisting: (klass) ->
    existingPage = AP.Viewport.getItemByClass klass
    # console.debug(existingPage)
    AP.Viewport.remove existingPage if existingPage

  


  
