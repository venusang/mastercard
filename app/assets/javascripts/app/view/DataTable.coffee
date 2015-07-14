class AP.view.DataTable extends AP.view.Table
  className: 'ap-datatable table'
  tagName: 'table'
  bordered: false
  striped: false
  head: null
  collection: null
  defaultCollection: null
  defaultQuery: null
  itemTpl: null
  selectRules: null
  template: '''
    {% if (head) { %}<thead></thead>{% } %}
    <tbody></tbody>
  '''
  events:
    'click tr[data-id]': 'onRowAction'
  
  initialize: (options={}) ->
    super
    # instantiate a new collection if necessary
    if options.collection or @collection
      @setCollection(options.collection or @collection, options.query or @query, true)
    # refresh collection on authentication change
    AP.auth.Authentication.on 'auth:deauthenticated', => @removeAllRows()
    AP.auth.Authentication.on 'auth:authenticated', => @collection.fetch() if @collection

  clearQuery: -> @query = null

  setQuery: (query) -> @query = query

  setCollection: (collection, query, defaultSettings) ->
    # remove events from previous collection, if any
    @stopListening(@collection) if @collection instanceof Backbone.Collection
    # setup new collection
    collection = LoyaltyRtrSdk.getCollection(collection) or collection
    @collection = if !(collection instanceof AP.collection.Collection) then new collection() else collection
    @setQuery(query) if query
    if @collection instanceof Backbone.Collection
      # refresh view on collection reset
      @listenTo @collection, 'sync', @onCollectionReset
      @listenTo @collection, 'deletesuccess', @onCollectionReset
      @removeAllRows()
      @fetch()
    if defaultSettings
      @defaultCollection = @collection
      @defaultQuery = @query
  
  revertCollection: ->
    @setCollection @defaultCollection, @defaultQuery
    @fetch()
  
  fetch: ->
    if @query
      @collection.query @query
    else
      @collection.fetch()
  
  onCollectionReset: ->
    if @collection
      @removeAllRows()
      @collection?.each (record) =>
        @add new AP.view.TableRow
          template: @itemTpl
          record: record
  
  onRowAction: (e) ->
    # e.preventDefault()
    rowEl = $(e.currentTarget)
    record = rowEl.data('record') if rowEl
    # selection is controlled by authorization using @selectRules
    if AP.auth.Authorization.isAuthorized(@selectRules)
      @$el.trigger 'select', record, @
  
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
