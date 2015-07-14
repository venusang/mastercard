class AP.view.component.ProgramSettingButtons extends AP.view.View
  className: 'text-center program-setting-buttons'
  initializeItems: ->
      super

      @add new AP.view.Button
          id: 'language-settings'
          className: 'btn btn-primary btn-lg'
          text: 'Language Settings'
          ui: 'primary'
          attributes:
            href: "#language-settings/#{@programId}"
          preventDefaultClickAction: false

      @add new AP.view.Button
        id: 'faq-settings'
        className: 'btn btn-primary btn-lg'
        text: 'FAQ Settings'
        ui: 'primary'
        attributes:
          href: "#faq-settings/#{@programId}"
        preventDefaultClickAction: false

      @add new AP.view.Button
        id: 'color-settings'
        className: 'btn btn-primary btn-lg'
        text: 'Color Settings'
        ui: 'primary'
        attributes:
          href: "#color-settings/#{@programId}"
        preventDefaultClickAction: false 