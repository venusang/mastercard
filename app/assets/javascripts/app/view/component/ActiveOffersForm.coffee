class AP.view.component.ActiveOffersForm extends AP.view.ModelFormPage
  className: ''
  programId: null
  recordId: null
  record: null
  showCancelButton: true
  showDeleteButton: true

  initializeItems: ->
      super
      console.debug(@recordId)
      console.debug(@record)
      @add new AP.view.View
        programId: @programId
        record: @record
        recordId: @recordId
        template:'''
          <ol class="breadcrumb">
            <li><a href="#programs">Programs</a></li>
            <li><a href="#program-settings/{%- programId %}">Program Settings</a></li>
            {% if(recordId){ %}  
            <li>Edit Existing Offer</li>
            {% } else { %} 
            <li>Add New Offer</li>
            {% } %}
          </ol>
        '''

      if(@recordId)
        @add new AP.view.View 
          template:'''
            <h3 class="sub-header">Edit Existing Offer</h3>
            '''
      else
        @add new AP.view.View 
          record: @record
          template:'''
            <h3 class="sub-header">Add New Offer 
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
      hidden: true

    category:
      label: 'Category'
      name: 'category'
      type: 'category'

    start_date:
      label: 'Start Date'
      name: 'start_date'
      type: 'date'

    end_date:
      label: 'End Date'
      name: 'end_date'
      type: 'date'

    line_one:
      label: 'Line One'
      name: 'line_one'
      type: 'string'

    line_two:
      label: 'Line Two'
      name: 'line_two'
      type: 'string'

    line_three:
      label: 'Line Three'
      name: 'line_three'
      type: 'string'

    image:
      label: 'Offer Image URL'
      name: 'image'
      type: 'string'

    promo_conversion_rate:
      label: 'Promo Conversion Rate'
      name: 'promo_conversion_rate'
      type: 'float'
      readonly: true

  onSaveSuccess: ->
    $('#saveSuccess').modal()

  onDeleteSuccess: ->
    $('#deleteSuccess').modal()
    
  onBackAction: (e) ->
    e.preventDefault()
    @goBack()

  goBack: (e, record, response) ->
    AP.router.navigate '#program-settings/'+@programId, trigger: true
    recordId = null


  
  
