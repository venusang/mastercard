class AP.view.component.ColorSettingsPage extends AP.view.Page
  title: ''
  programId: null
  items:[
    name: 'AP.view.View '
    template:'''
      <h3 class="sub-header">Color Settings</h3>
    '''
  ]
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
            <li>Color Settings</li>
          </ol>
        '''

      @add new AP.view.DataTable
        collection: 'ColorSwatchExactMatch'
        query: {program_level_id:@programId}
        striped: true
        head: new AP.view.TableRow
          template: '''
            <th>Action</th>
            <!-- th>ID</th -->
            <!-- th>Program Level ID</th -->
            <th>Color ID</th>
            <th>Color #HEX</th>
            <th>Color Swatch</th>
          '''
        itemTpl:'''
          <td><a href="#color-settings/edit/{%- program_level_id %}/{%- id %}">edit</a></td>
          <!-- td>{%- id %}</td -->
          <!-- td>{%- program_level_id %}</td -->
          <td>{%- color_id %}</td>
          <td>{%- color_argb %}</td>
          <td><div style="border:1px solid #ccc;width:100px;height:20px;background-color:{%- color_argb %};display:block;overflow:hidden;">&nbsp;</div></td>
        '''

