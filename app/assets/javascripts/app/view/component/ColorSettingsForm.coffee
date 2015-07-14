class AP.view.component.ColorSettingsForm extends AP.view.ModelFormPage
  className: ''
  title: ''
  showIdField: true
  record: null
  recordId: null
  programId: null
  model: LoyaltyRtrSdk.models.ColorSwatch
  query: {id: @recordId}
  showCancelButton: true
  showDeleteButton: false
  
  initializeItems: ->
      super
      @add new AP.view.View
        programId: @programId
        record: @record
        recordId: @recordId
        template:'''
          <ol class="breadcrumb">
            <li><a href="#programs">Programs</a></li>
            <li><a href="#program-settings/{%- programId %}">Program Settings</a></li>
            <li><a href="#color-settings/{%- programId %}">Color Settings</a></li>
            {% if(recordId){ %}  
            <li>Edit Color Settings</li>
            {% } else { %} 
            <li>Add New Color Settings</li>
            {% } %}
          </ol>
        '''
      if(@recordId)
        @add new AP.view.View 
          template:'''
            <h3 class="sub-header">Edit Color Settings
              <a class="btn btn-primary ap-back pull-right">Back</a>
              </h3>
          '''
      else
        @add new AP.view.View 
          template:'''
            <h3 class="sub-header">Add New Color Settings
                <a class="btn btn-primary ap-back pull-right">Back</a>
              </h3>
          '''
      @add new AP.view.component.Modal
        record: @record

  formFields: 
    program_level_id:
      label: 'Program Level ID'
      name: 'program_level_id'
      type: 'string'
      required: true
      readonly: true

    color_id:
      label: 'Color ID'
      name: 'color_id'  
      type: 'string'
      required: true

    color_argb:
      label: 'Color ARGB'
      name: 'color_argb'
      type: 'string'
      required: true
      help: 'Entry must be in hexidecimal number format, e.g. #12A34B'

  onSaveSuccess: ->
    $('#saveSuccess').modal()

  onBackAction: (e) ->
    e.preventDefault()
    @goBack()

  goBack: (e, record, response) ->
    AP.router.navigate '#color-settings/'+@programId, trigger: true
  


