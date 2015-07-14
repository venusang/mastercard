class AP.view.component.FaqForm extends AP.view.ModelFormPage
  className: ''
  title: ''
  backButton: true
  programId: null
  recordId: null
  model: LoyaltyRtrSdk.models.BankFaq
  query: {id: @recordId}
  showCancelButton: true
  showDeleteButton: true
  
  formFields: 
    program_level_id:
      label: 'Program Level ID'
      name: 'program_level_id'
      type: 'text'
      required: true
      readonly: true
      hidden: true
    
    question:
      label: 'Question'
      name: 'question'
      type: 'textarea'
      required: true

    answer:
      label: 'Answer'
      name: 'answer'
      type: 'textarea'
      required: true

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
            <li><a href="#faq-settings/{%- programId %}">FAQ Settings</a></li>
            {% if(recordId){ %}  
            <li>Edit FAQ &amp; Answer</li>
            {% } else { %} 
            <li>Add New FAQ &amp; Answer</li>
            {% } %}
          </ol>
        '''

      if(@recordId)
        @add new AP.view.View 
          template:'''
            <h3 class="sub-header">Edit FAQ &amp; Answer
              <a class="btn btn-primary ap-back pull-right">Back</a>
              </h3>
          '''
      else
        @add new AP.view.View 
          template:'''
            <h3 class="sub-header">Add New FAQ &amp; Answer
              <a class="btn btn-primary ap-back pull-right">Back</a>
              </h3>
          '''
      @add new AP.view.component.Modal
        record: @record
  
  onSaveSuccess: ->
    $('#saveSuccess').modal()

  onDeleteSuccess: ->
    $('#deleteSuccess').modal()
    
  onBackAction: (e) ->
    e.preventDefault()
    @goBack()

  goBack: ->
    AP.router.navigate '#faq-settings/'+@programId, trigger: true