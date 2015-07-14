class AP.view.component.ProgramPage extends AP.view.Page
  title: ''
  initializeItems: ->
    
      @add new AP.view.View
        items:['ProgramSearch','ProgramNewButton']

      @add new AP.view.DataTable
        collection: 'BankAll'
        striped: true
        head: new AP.view.TableRow
          template: '''
            <!--th>ID</th-->
            <th>Status</th>
            <th>Bank Name</th>
            <th>Program Level ID</th>
            <th>Last Updated</th>
          '''
        itemTpl:'''
          <!--td>{%- id %}</td--> 
          <td><span class="label label-{% if (is_active) { %}info{% } else { %}danger {% } %}">{% if (is_active) { %} active{% } else { %}inactive {% } %}</span></td>
          <td><a class="bankName" href="#program-settings/{%- program_level_id %}">{%- name %}</a></td> 
          <td>{%- program_level_id %}</td> 
          <td>{%- tc_last_update_on %}</td> 
        '''