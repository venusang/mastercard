class AP.view.component.LanguageSettingsForm extends AP.view.ModelFormPage
  className: ''
  title: ''
  showIdField: true
  recordId: null
  programId: null
  model: LoyaltyRtrSdk.models.LanguageString
  query: {id: @recordId}
  showCancelButton: true

  initializeItems: ->
      super
      @add new AP.view.View
        programId: @programId
        recordId: @recordId
        template:'''
          <ol class="breadcrumb">
            <li><a href="#program-settings/{%- programId %}">Bank Settings</a></li>
            <li><a href="#language-settings/{%- programId %}">Language Settings</a></li>
            <li>{% if(recordId){%}Edit{% } else { %}New{% } %} Language Settings</li>
          </ol>
        '''

      if(@recordId)
        @add new AP.view.View 
          template:'''
            <h3 class="sub-header">Edit Language Settings
              <a class="btn btn-primary ap-back pull-right">Back</a>
              </h3>
          '''
      else
        @add new AP.view.View 
          template:'''
            <h3 class="sub-header">Add New Language Settings
              <a class="btn btn-primary ap-back pull-right">Back</a>
              </h3>
          '''

      @add new AP.view.component.Modal

  formFields: 
    program_level_id:
        label: 'Program Level ID'
        name: 'program_level_id'
        required: true
        readonly: true
        hidden: true
    
    fallback:
      label: 'Bank Default'
      name: 'fallback'
      type: 'fallback'
      required: true

    label_id:
      label: 'Label ID'
      name: 'label_id'
      type: 'string'
      required: true

    value:
      label: 'English Value'
      name: 'value'
      type: 'string'
      required: true

    language_code:
      label: 'Language Code'
      name: 'language_code'
      type: 'language_code'
      required: true

    

  onSaveSuccess: (e, record, response) ->
    $('#saveSuccess').modal()

    
  onBackAction: (e) ->
    e.preventDefault()
    @goBack()

  goBack: -> 
    AP.router.navigate '#language-settings/'+@programId, trigger: true

  

