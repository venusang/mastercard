class AP.view.ModelFormPage extends AP.view.Page
  className: 'ap-modelformpage'
  title: 'Form'
  collection: null
  formFields: null
  programId: null #custom variable for LoyaltyRtr app
  recordId: null #custom variable for LoyaltyRtr app
  showCancelButton: false
  showDeleteButton: false
  events:
    'click .ap-back': 'onBackAction'
    'click .ap-cancel': 'onBackAction'
    'savesuccess': 'onSaveSuccess'
    'deletesuccess': 'onDeleteSuccess'
    'savefailure': 'onSaveFailure'
  
  initialize: ->
    super
    @add new AP.view.ModelForm
      programId: @programId #custom variable for LoyaltyRtr app
      recordId: @recordId
      collection: @collection
      model: @model
      record: @record
      formFields: @formFields
      showCancelButton: @showCancelButton
      showDeleteButton: @showDeleteButton
  
  onSaveSuccess: -> @goBack()
  
  onDeleteSuccess: -> @goBack()
  
  onSaveFailure: (e, record, response) ->
    if response?.responseText and JSON.parse(response.responseText)?.errors
      messagePage = new AP.view.MessagePage
        title: 'We could not complete this request'
        message: JSON.parse(response.responseText).errors[0][0]
        backButton: false
        items: [
          new AP.view.View
            tagName: 'hr'
          new AP.view.Button
            text: 'Dismiss'
            onAction: => messagePage.goBack()
        ]
    else if !record.isValid()
      data = _.extend {formFields: @formFields}, record.errors()[0]
      messagePage = new AP.view.MessagePage
        title: 'Invalid'
        data: data
        message: '<strong>{%- (formFields && formFields[field]) || field %}</strong>:  {%- message %}'
        backButton: false
        items: [
          new AP.view.View
            tagName: 'hr'
          new AP.view.Button
            text: 'Dismiss'
            onAction: => messagePage.goBack()
        ]
    else
      messagePage = new AP.view.MessagePage
        title: 'We could not complete this request'
        message: 'Sorry, something\'s gone wrong.  It could be on our end.  Just to be safe, check your Internet connection and try again.'
        backButton: false
        items: [
          new AP.view.View
            tagName: 'hr'
          new AP.view.Button
            text: 'Dismiss'
            onAction: => messagePage.goBack()
        ]
    AP.Viewport.add messagePage
    messagePage.show()
