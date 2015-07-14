class AP.view.RecordTablePage extends AP.view.Page
  className: 'ap-recordtablepage'
  title: ''
  formFields: null
  backButton: true
  showEditButton: true
  editButtonRules: null
  
  initialize: ->
    super
    @record.on 'deletesuccess', => @goBack()
    
    headerItems = [
      new AP.view.View
        className: 'pull-left'
        tagName: 'h1'
        title: @title
        template: '''
          <h2>{%- title %}</h2>
        '''
    ]
    
    if @showEditButton
      headerItems.push new AP.view.Button
        text: "Edit #{@title}"
        id: 'edit-btn'
        pullRight: true
        rules: @editButtonRules
    
    @add new AP.view.View
      className: 'page-header'
      items: headerItems
    
    @add new AP.view.RecordTable
      record: @record
      formFields: @formFields
