define [
  'namespace', 'react', 'jquerycookie', 'views/draft_state'
], (zt, React, jQueryCookie, DraftState) ->

  class zt.UltimateDraft

    constructor: (options) ->
      @container = options?.container or document.body
      React.render(React.createElement(DraftState), @container)