class AP.view.component.FaqPage extends AP.view.Page
  title: ''
  programId: null
  recordId: null
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
            <li>FAQ Settings</li>
          </ol>
        '''
        
      @add new AP.view.Button
        id: 'new-faq'
        className: 'btn pull-right'
        text: 'Add New FAQ &amp; Answer'
        ui: 'primary'
        attributes:
          href: "#faq/new/#{@programId}"
        preventDefaultClickAction: false

      @add new AP.view.View 
        template:'''
          <h3 class="sub-header">FAQ Settings</h3>
        '''

      @add new AP.view.DataTable
        id: 'bank-faqs'
        collection: 'BankFaqByProgramLevelId'
        query: {program_level_id:@programId}
        striped: true
        head: new AP.view.TableRow
          template: '''
            <th>Action</th>
            <!-- th>ID</th -->
            <!-- th>Program Level ID</th -->
            <th>Question</th>
            <th>Answer</th>
          '''
        itemTpl:'''
          <td><a href="#faq/edit/{%- program_level_id %}/{%- id %}">edit</a></td>
          <!-- td>{%- id %}</td -->
          <!-- td>{%- program_level_id %}</td -->
          <td>{%- question %}</td>
          <td>{%- answer %}</td>
        '''


      
