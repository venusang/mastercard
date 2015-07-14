class AP.view.component.ProgramSettingsPage extends AP.view.Page
  title: ''
  programId: null
  programName: null
  items:[
    'ProgramSettingsView'
    ,
    name: 'AP.view.View'
    template: '<h3 class="sub-header">Active Offers <a class="btn btn-primary pull-right" href="#program-offer/new/{%- program_level_id %}">Add a new offer</a></h3>'

    
  ]
  
  initializeItems: ->
      super
      @add new AP.view.component.ActiveOffers
        programId: @programId
        recordName: @record.get 'name'
        record: @record
        
      @add new AP.view.component.ProgramSettingButtons
        programId: @programId
