class AP.view.component.LanguageSettingsPage extends AP.view.Page
  title: ''
  programId: null
  initializeItems: ->
      super
      @add new AP.view.View
        programId: @programId
        template:'''
          <ol class="breadcrumb">
            <li><a href="#program-settings/{%- programId %}">Bank Settings</a></li>
            <li>Language Settings</li>
          </ol>
        '''

      @add new AP.view.View
        programId: @programId
        template:'''
          <h3 class="sub-header">Language Settings <a class="btn btn-primary pull-right" href="#language-settings/new/{%- programId %}">Add new Language Setting</a></h3>
        '''
      @add new AP.view.DataTable
        id: 'bank-faqs'
        collection: 'LanguageStringExactMatch'
        query: {program_level_id:@programId}
        striped: true
        head: new AP.view.TableRow
          template: '''
            <th>Action</th>
            <th>Bank Default</th>
            <th class="col-sm-4">Label ID</th>
            <th class="col-sm-4">English Value</th>
            <th class="col-sm-2">Language Code</th>
          '''
        itemTpl:'''
          <td><a href="#language-settings/edit/{%- program_level_id %}/{%- id %}">edit</td>
          <td>{%- fallback %}</td>
          <td>{%- label_id %}</td>
          <td>{%- value %}</td>
          <td>{%- language_code %}</td>
        '''
 
      
