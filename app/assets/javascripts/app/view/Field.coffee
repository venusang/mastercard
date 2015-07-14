class AP.view.Field extends AP.view.View
  className: 'ap-field'
  name: ''
  label: ''
  type: 'text'
  value: ''
  placeholder: ''
  fieldClass: 'form-control'
  help: ''
  span: ''
  prepend: ''
  append: ''
  rows: 6
  step: null
  min: null
  checked: false
  required: false
  formGroup: false
  readonly: false
  template: '''
    


    {% if (label && (type !== 'checkbox')) { %}
      <!-- label-->
      <label for="{%- name %}"{% if (formGroup) { %} class="control-label"{% } %}>
        {%- label %}
      </label>
    {% } %}
    

   

    {% if (formGroup) { %}
      <div class="form-group">
    {% } %}
    



    {% if (prepend) { %}
    <div class="input-prepend">
    <span class="add-on">{%- prepend %}</span>
    {% } %}
    



    {% if (append) { %}<div class="input-append">{% } %}
    



    {% if (type === 'textarea') { %}
    

      <!-- textarea -->
      <textarea name="{%- name %}" rows="{%- rows %}" {% if (required) { %} required="required"{% } %} {% if (placeholder) { %}placeholder="{%- placeholder %}"{% } %} class="{%- fieldClass %} {% if (readonly) { %} readonly{% } %}">{%- value %}</textarea>
    

    {% } else if (type === 'checkbox') { %}
    


      <!-- checkbox -->
      <label class="checkbox">
        <input type="{%- type %}" name="{%- name %}" value="true" {% if (required) { %} required="required"{% } %} {% if (checked) { %}checked="checked"{% } %} class="{%- fieldClass %}"/>
        {%- label %}
      </label>


    {% } else if (type === 'datetime') { %}
    



      <!-- datetime input -->
      <input type="hidden" name="{%- name %}" value="{%- value %}" />
      <input type="date" data-for="{%- name %}" value="{% if (value) { %}{%- value.split('T')[0] %}{% } %}"{% if (min) { %} min="{%- min %}"{% } %}{% if (step) { %} step="{%- step %}"{% } %}{% if (required) { %} required="required"{% } %}{% if (placeholder) { %} placeholder="{%- placeholder %}"{% } %} class="datetime-date-field {% if (span) { %}span{%- span %} {% } %}{%- fieldClass %}"/>
      {% if (value) { %}
      {% var selectedTime = value.split('T')[1].substring(0, 5) %}
      {% } %}
      <select class="datetime-time-field span2" data-for="{%- name %}">
        <optgroup label="AM">
          <option value="00:00"{% if (selectedTime === '00:00') { %} selected="selected"{% } %}>12:00am</option>
          <option value="00:30"{% if (selectedTime === '00:30') { %} selected="selected"{% } %}>12:30am</option>
          {% for (i = 1; i < 12; i++) { %}
          {% if (i.length == 1) { i = '0' + 1 } %}
          <option value="{%- i %}:00"{% if (selectedTime === i + ':00') { %} selected="selected"{% } %}>{%- i %}:00am</option>
          <option value="{%- i %}:30"{% if (selectedTime === i + ':30') { %} selected="selected"{% } %}>{%- i %}:30am</option>
          {% } %}
        </optgroup>
        <optgroup label="PM">
          <option value="12:00">12:00pm</option>
          <option value="0120:30">12:30pm</option>
          {% for (i = 13; i < 24; i++) { %}
          <option value="{%- i %}:00"{% if (selectedTime === i + ':00') { %} selected="selected"{% } %}>{%- i - 12 %}:00pm</option>
          <option value="{%- i %}:30"{% if (selectedTime === i + ':30') { %} selected="selected"{% } %}>{%- i - 12 %}:30pm</option>
          {% } %}
        </optgroup>
      </select>


      {% } else if (type === 'category') { %}
         {% if (label =='Category' && name=="category") { %}
          <select class="form-control" name="{%- name%}">
            {% if(!value){ %}
              <option value="Earn">Earn</option>
              <option value="Burn">Burn</option>
            {% } else { %}
              <option value="{%- value %}">{%- value %}</option>
              <option value="{% if(value == 'Burn'){ %}Earn{% } else { %}Burn{% } %}">{% if (value == 'Burn'){ %}Earn{% } else { %}Burn{% } %}</option>
            {% } %}
          </select>
        {% } %}

      {% } else if (type === 'is_active') { %}
         {% if (label =='Status' && name=="is_active") { %}
          <select class="form-control" name="{%- name%}">
              <option value="true" {%if(value){%}selected="selected"{%}%}>Active</option>
              <option value="false" {%if(!value){%}selected="selected"{%}%}>Inactive</option>
          </select>
        {% } %}

      {% } else if (type === 'default_currency') { %}
         {% if (name=="default_currency") { %}
          <select class="form-control" name="{%- name%}">
              <option value="en" {%if(value=="en") {%}selected="selected"{%}%}>en</option>
              <option value="euro" {%if(value=="euro") {%}selected="selected"{%}%}>euro</option>
              <option value="yuan" {%if(value=="yuan") {%}selected="selected"{%}%}>yuan</option>
          </select>
        {% } %}

      {% } else if (type === 'fallback') { %}
         {% if (name=="fallback") { %}
          <select class="form-control" name="{%- name%}">
              <option value="{%- value %}">{% if (value){ %}true{% } else { %}false{% } %}</option>
              <option value="{% if(value){ %}false{% } else { %}true{% } %}">{% if (value){ %}false{% } else { %}true{% } %}</option>
          </select>
        {% } %}

      {% } else if (type === 'language_code') { %}
         {% if (name=="language_code") { %}
          <select class="form-control" name="{%- name%}">
              <option value="en" {%if(value=="en") {%}selected="selected"{%}%}>en</option>
              <option value="zh" {%if(value=="zh") {%}selected="selected"{%}%}>zh</option>
              <option value="pt" {%if(value=="pt") {%}selected="selected"{%}%}>pt</option>
          </select>
        {% } %}

    {% } else { %}
    

      <!-- input -->
      <input type="{%- type %}" name="{%- name %}" value="{%- value %}"{% if (min) { %} min="{%- min %}"{% } %}{% if (step) { %} step="{%- step %}"{% } %}{% if (required) { %} required="required"{% } %}{% if (readonly) { %} readonly{% } %} {% if (placeholder) { %} placeholder="{%- placeholder %}"{% } %} class="{% if (span) { %}span{%- span %} {% } %}{%- fieldClass %}"/>
    {% } %}
    
    {% if (prepend) { %}
    </div>
    {% } %}
    
    {% if (append) { %}
    <span class="add-on">{%- append %}</span>
    </div>
    {% } %}
  


    {% if (help) { %}
      <span class="help-block">{%- help %}</span>
    {% } %}
  



    {% if (formGroup) { %}
  



      </div>
    {% } %}
  '''
  
  render: ->
    super 
    @$el.addClass('form-group') if @formGroup
    @
