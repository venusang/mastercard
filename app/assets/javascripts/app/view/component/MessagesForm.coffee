class AP.view.component.MessagesForm extends AP.view.ModelFormPage
  className: ''
  title: ''
  initializeItems: ->
      super
      @add new AP.view.View
        programId: @programId
        record: @record
        recordId: @recordId
        template:'''
          <ol class="breadcrumb">
            <li><a href="#messages">Messages</a></li>
            <li>Add New Message</li>
          </ol>
        '''


      @add new AP.view.View 
        template:'''
          <h3 class="sub-header">Add New Message</h3>
        '''
  model: LoyaltyRtrSdk.models.Message
  formFields: 
    ranac:
      label: 'ranac'
      name: 'ranac'
      type: 'string'
      required: true

    program_level_id:
      label: 'Program Level ID'
      name: 'program_level_id'
      type: 'string'
      required: true

    points_redeemed:
      label: 'Points Redeemed'
      name: 'points_redeemed'
      type: 'string'
      required: true

    points_available:
      label: 'Points Available'
      name: 'points_available'
      type: 'string'
      required: true

  goBack: ->
    AP.router.navigate 'messages', trigger: true

  showCancelButton: true
  showDeleteButton: true