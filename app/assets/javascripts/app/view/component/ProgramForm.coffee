class AP.view.component.ProgramForm extends AP.view.ModelFormPage
  className: ''
  title: ''
  recordId: null
  programId: null
  model: LoyaltyRtrSdk.models.Bank
  showCancelButton: true
  showDeleteButton: false
  initializeItems: ->
      super
      @add new AP.view.View
        programId: @programId
        recordId: @recordId
        record: @record
        template:'''
          <ol class="breadcrumb">
            <li><a href="#programs">Programs</a></li>
            {% if(recordId) { %} 
            <li><a href="#program-settings/{%- programId %}">{%- name %} Settings</a></li> 
            <li>Edit {%- name %} Program</li>
            {% } else { %}
            <li>Add New Program</li>
            {% } %}
          </ol>
        '''

      if(@programId)
        @add new AP.view.View 
          record:@record
          template:'''
            <h3 class="sub-header">Edit {%- name %} Program
              <a class="btn btn-primary ap-back pull-right">Back</a>
              </h3>
          '''
      else
        @add new AP.view.View 
          template:'''
            <h3 class="sub-header">Add New Program
              <a class="btn btn-primary ap-back pull-right">Back</a>
              </h3>
          '''
      @add new AP.view.component.Modal
        record: @record
  
  formFields: 
    bank_name:
      label: 'Bank Name'
      name: 'name'
      type: 'string'
      required: true

    is_active:
      label: 'Status'
      name: 'is_active'
      type: 'is_active'

    program_level_id:
      label: 'Program Level ID'
      name: 'program_level_id'
      type: 'string'
      required: true

    offers:
      label: 'Offers'
      name: 'earn_offer_label'
      type: 'textarea'

    contact_info:
      label: 'Contact Number'
      name: 'contact_info'
      type: 'string'

    image_url:
      label: 'Image URL'
      name: 'image_url'
      type: 'string'

    icon:
      label: 'Icon URL'
      name: 'icon'
      type: 'string'

    tc_url:
      label: 'Terms & Conditions URL'
      name: 'tc_url'
      type: 'string'

    tc_summary:
      label: 'Terms & Conditions Summary'
      name: 'tc_summary'
      type: 'string'

    tc_last_updated_on:
      label: 'Terms & Conditions Summary Last Updated On'
      name: 'tc_last_update_on'
      type: 'date'

    default_currency:
      label: 'Default Currency'
      name: 'default_currency'
      type: 'default_currency'

    mobile_site_url:
      label: 'Mobile Site URL'
      name: 'mobile_site_url'
      type: 'text'

    ios_url:
      label: 'iOS URL'
      name: 'ios_url'
      type: 'text'

    android_url:
      label: 'Android URL'
      name: 'android_url'
      type: 'text'

  onSaveSuccess: ->
    $('#saveSuccess').modal()
    # AP.router.navigate '#program-settings/'+@programId, trigger: true

  onBackAction: (e) ->
    e.preventDefault()
    @goBack()

  goBack: (e, record, response) ->
    AP.router.navigate '#program-settings/'+@programId, trigger: true

  


