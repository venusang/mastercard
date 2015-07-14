class AP.view.component.ProgramSettingsView extends AP.view.View
  className: 'row'
  programId: @programId
  record: @record
  template:'''
        
    <ol class="breadcrumb">
      <li><a href="#programs">Programs</a></li>
      <li>{%- name %} Settings</li>
    </ol>
  

    <div id="bank-information" class="col-xs-12 col-sm-8">
        <div class="page-header"><h3>{%- name %} Settings <a class="btn btn-primary pull-right" href="#program/edit/{%- program_level_id %}/{%- id %}">edit</a></h3></div>
        <div class="col-sm-12 col-lg-6">
          <ul>
            <li><label>Bank Name</label><span>{%- name %}</span></li>
            <li><label>Program Level ID</label><span>{%- program_level_id %}</span></li>
            <li><label>Contact Number</label>
              <span>
                {% if(contact_info) {%}
                  {%- contact_info %}
                {%} else {%}
                  &mdash;
                {% } %}
              </span>
            </li>
            <li><label>Image URL</label>
              <span>
                {% if(image_url) {%}
                  <a href="{%- image_url %}" target="_blank">click here to view</a>
                {%} else {%}
                  &mdash;
                {% } %}
              <span>
            </li>
            <li><label>Splash Page URL</label>
              <span>
                {% if(loading_image_url) {%}
                  <a href="{%- loading_image_url %}" target="_blank">click here to view</a>
                {%} else {%}
                  &mdash;
                {% } %}
              </span>
            </li>
            <li><label>Icon URL</label>
              <span>
                {% if(icon) {%}
                  <a href="{%- icon %}" target="_blank">click here to view</a>
                {%} else {%}
                  &mdash;
                {% } %}
              </span>
            </li>
            <li><label>Terms & Conditions URL</label>
              <span>
                {% if(tc_url) {%}
                  <a href="{%- tc_url %}" target="_blank" title="{%- tc_url %}">click here to view</a>
                {%} else {%}
                  &mdash;
                {% } %}
              </span>
            <li><label>Terms &amp; Conditions Summary</label>
                {% if(tc_summary) {%}
                  <span id="TC-Summary" data-trigger="click hover focus" data-toggle="tooltip" data-delay="1" data-container="bank-information" title="{%- tc_summary %}">Summary</span>
                {%} else {%}
                  &mdash;
                {% } %}
                {% if(tc_last_update_on) {%}
                <sup>Terms &amp; Conditions Summary Last Updated {%- tc_last_update_on%}</sup>
                {%} else {} %}
            </li>
          </ul>
        </div> 
        <div class="col-sm-12 col-lg-6">
          <ul>
            <li><label>Default Currency</label>
            <span>
              {% if(default_currency) {%}
                  {%- default_currency %}
                {%} else {%}
                  &mdash;
                {% } %}
            </span></li>
            <li><label>Moble Site URL</label>
              <span>
                {% if(mobile_site_url) {%}
                  <a href="{%- mobile_site_url %}" target="_blank">click here to view</a>
                {%} else {%}
                  &mdash;
                {% } %}
              </span>
            </li>
            <li><label>iOS URL</label>
              <span>
                {% if(ios_url) {%}
                  <a href="{%- ios_url %}" target="_blank">click here to view</a>
                {%} else {%}
                  &mdash;
                {% } %}
              </span>
            </li>
            <li><label>Android URL</label>
              <span>
                {% if(android_url) {%}
                  <a href="{%- android_url %}" target="_blank">click here to view</a>
                {%} else {%}
                  &mdash;
                {% } %}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div id="branding-image" class="col-xs-12 col-sm-4">
          <div class="text-center">
            
            <img src="{%- image_url%}" alt="{%- name %}" name="{%- name %}" width="300" />
            <br /><br />
            <div class="col-xs-12">Status: <span class="cols-xs-12 label label-{% if (is_active) { %}info{% } else { %}danger {% } %}">{% if (is_active) { %} active{% } else { %}inactive {% } %}</span></div>
          </div>
        </div> 
      <hr class="col-xs-12"/>
    '''
   