class AP.view.component.ActiveOffers extends AP.view.View
  recordName: null
  programId: null
  initializeItems: ->
      console.debug(@recordName)
      @add new AP.view.DataTable
        className: 'table'
        collection: 'BankOfferExactMatch'
        query: {program_level_id:@programId}
        striped: true
        head: new AP.view.TableRow
          template: '''
            <th class="col-sm-1 hidden-xs">Action</th>
            <th class="col-sm-1 hidden-xs">ID</th>
            <th class="col-sm-1 col-xs-2">Category</th>
            <th class="col-sm-1 col-xs-2">Start Date</th>
            <th class="col-sm-1 col-xs-2">End Date</th>
            <th class="col-sm-2 col-xs-2">Line One</th>
            <th class="col-sm-2 col-xs-2">Line Two</th>
            <th class="col-sm-2 col-xs-2">Line Three</th>
            <th class="hidden-xs col-sm-1">Offer Image URL</th>
            <th class="col-sm-1 hidden-xs">Promo Conversion Rate</th>
          '''
        itemTpl:'''
          <td class="hidden-xs"><a href="#program-offer/edit/{%- program_level_id %}/{%- id%}">edit</a></td>
          <td>{%- id %}</td>
          <td>{%- category %}</td>
          <td>{%- start_date %}</td>
          <td>{%- end_date %}</td>
          <td>{%- line_one %}</td>
          <td>{%- line_two %}</td>
          <td>{%- line_three %}</td>
          <td class="hidden-xs"><img width="200" src="{%- image %}"></td>
          <td class="hidden-xs">{%- promo_conversion_rate %}</td>
        '''

      
