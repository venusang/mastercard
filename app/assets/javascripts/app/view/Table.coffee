class AP.view.Table extends AP.view.View
  className: 'ap-table table'
  tagName: 'table'
  bordered: false
  striped: false
  head: null
  template: '''
    {% if (head) { %}<thead></thead>{% } %}
    <tbody></tbody>
  '''
  
  append: (el) -> @$el.find('> tbody').append el
  
  render: ->
    super
    @$el.find('thead').append(@head.$el) if @head
    @$el.addClass('table-bordered') if @bordered
    @$el.addClass('table-striped') if @striped
    @
  
  removeAllRows: ->
    for item in _.filter(@items, (item) -> item instanceof AP.view.TableRow)
      @remove item
