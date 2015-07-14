class AP.view.component.Modal extends AP.view.View
  initialize: ->
    super
  template:'''
    <!-- Save Modal -->
    <div class="modal fade" id="saveSuccess" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">Saved Successfully</h4>
          </div>
          <div class="modal-body">
            You changes have been saved.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">continue editing</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div class="modal fade" id="deleteSuccess" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">Delete Success</h4>
          </div>
          <div class="modal-body">
            Your entry has been deleted.
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary ap-back pull-right" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  '''