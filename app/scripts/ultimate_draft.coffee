define [
  'namespace', 'react', 'jquerycookie', 'views/draft_state'
], (zt, React, jQueryCookie, DraftState) ->

  class zt.UltimateDraft

    constructor: (options) ->

      @container = options?.container or document.body
      @initialize()

    initialize: =>
      @current_model_state = 
        people: [
          (id: 0, name: "one", age: 1)
          (id: 1, name: "two", age: 2)
          (id: 2, name: "three", age: 3)
          (id: 3, name: "four", age: 4)
          (id: 4, name: "five", age: 5)
        ]

      @update_model_state()

    update_model_state: (model_state = @current_model_state) =>
      @current_model_state = model_state

      React.render(React.createElement(DraftState, {
        people: model_state.people
      }), @container)
