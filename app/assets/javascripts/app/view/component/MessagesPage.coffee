class AP.view.component.MessagesPage extends AP.view.Page
  title: ''
  className: 'messages-page'

  initializeItems: ->

      @add new AP.view.Button
        id: 'btn-new-message'
        className: 'btn pull-right'
        text: 'Add New Message'
        ui: 'primary'
        attributes:
          href: "#message/new"
        preventDefaultClickAction: false

      @add new AP.view.View 
        template:'''
          <h3 class="sub-header">Messages</h3>
        '''
      
      @add new AP.view.DataTable
        collection: 'MessageAll'
        striped: true
        head: new AP.view.TableRow
          template: '''
            <th>ID</th>
            <th>Created On</th>
            <th>Message</th>
            <th>Last Four Digits</th>
            <th>Ranac</th>
            <th>Program Level ID</th>
            <th>Points Redeemed</th>
            <th>Points Available</th>
          '''
        itemTpl:'''
          <td>{%- id %}</td> 
          <td>{%- created_on %}</td> 
          <td>{%- body %}</td> 
          <td>{%- last_four_digits %}</td>
          <td>{%- ranac %}</td> 
          <td>{%- program_level_id %}</td> 
          <td>{%- points_redeemed %}</td> 
          <td>{%- points_available %}</td> 
        '''

