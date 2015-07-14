null
###*
@class AP.view.Page
###
class AP.view.Page extends AP.view.View
  className: 'ap-page'
  title: 'Page'
  backButton: false
  backButtonText: 'Back'
  backButtonHref: '#'
  previousPage: ''
  template: '''
    <!-- navigation -->
    <div class="ap-nav navbar">
      <div class="navbar-inner">
        <!-- nav list -->
          <ul class="nav">
              <li>
                <div id="brandingPanel" class="col-xs-6 col-sm-3"><a href="#home">MasterCard Real Time Rewards</a></div>
                <div class="col-xs-12 col-sm-9">
                  <h1>MasterCard Real Time Rewards</h1>
                  <h2 class="sub-header">Application Manager</h2>
                </div>
              </li>
          </ul>
          <div class="mcHeader">
            <div class="container">
              <div class="col-sm-12">
                <ul class="nav nav-pills">
                  <li><a href="#programs">Programs</a></li>
                  <li><a href="#messages">Messaging</a></li>
                  <li class="pull-right"><a href="#logout">sign-out</a></li>
                </ul>
              </div>
             
            </div>
        </div>
      </div>
    </div>

    <!-- container -->
    <div class="container"></div>
    <!-- footer -->
    <div class="footer"></div>
  '''
  events:
    'click .ap-back': 'onBackAction'
  
  initialize: ->
    @previousPage = AP.Viewport.getCurrentItem() if !@previousPage
    super
  
  onBackAction: (e) ->
    e.preventDefault()
    @goBack()
  
  getTitle: ->
    template = _.template(@title or '') if @title
    if template and _.isFunction template
      template @getData()
    else if template
      template
    else
      ''
  
  render: ->
    @renderedTitle = @getTitle()
    super
    # all pages should get this class, even if they override className
    @$el.addClass 'ap-page'
    @
  
  ###*
  Appends the element to this view's inner container element.
  @param {Element} el the element to append to this view's inner container
  ###
  append: (el) -> @$el.find('> .container:last').append el
  
  ###*
  Hides all items in viewport, then shows this page's element.
  ###
  show: ->
    AP.Viewport.hideAll()
    AP.Viewport.setCurrentItem @
    $('title').text("#{@renderedTitle}") if @renderedTitle
    super
    # window.scrollTo?(0)
  
  ###*
  Shows the view of class name `previousPage` in the viewport and destroys this
  view after a short delay.
  ###
  goBack: ->
    if @previousPage
      if _.isString(@previousPage)
        AP.Viewport.showItemByClass(AP.view[@previousPage])
      else if @previousPage instanceof AP.view.Page
        @previousPage.show()
      AP.Viewport.remove(@)
