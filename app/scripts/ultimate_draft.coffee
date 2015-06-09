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
          (name: " Antonia ", age:  60 ,sex: "f")
          (name: " Karmen ", age:  37 ,sex: "f")
          (name: " Tanna ", age:  57 ,sex: "f")
          (name: " Johna ", age:  57 ,sex: "m")
          (name: " Rich ", age:  63 ,sex: "m")
          (name: " Charley ", age:  27 ,sex: "m")
          (name: " Desire ", age:  34 ,sex: "f")
          (name: " Sherron ", age:  56 ,sex: "f")
          (name: " Blanch ", age:  31 ,sex: "m")
          (name: " Gale ", age:  45 ,sex: "f")
          (name: " Marcus ", age:  41 ,sex: "m")
          (name: " Roselyn ", age:  49 ,sex: "f")
          (name: " Reginia ", age:  36 ,sex: "f")
          (name: " Kendal ", age:  43 ,sex: "m")
          (name: " Raul ", age:  65 ,sex: "m")
          (name: " Josiah ", age:  63 ,sex: "m")
          (name: " Golden ", age:  49 ,sex: "f")
          (name: " Mohammad ", age:  53 ,sex: "m")
          (name: " Coral ", age:  25 ,sex: "m")
          (name: " Mitsue ", age:  48 ,sex: "m")
          (name: " Penney ", age:  18 ,sex: "f")
          (name: " Hassan ", age:  30 ,sex: "m")
          (name: " Candyce ", age:  24 ,sex: "f")
          (name: " Corie ", age:  58 ,sex: "m")
          (name: " Nanci ", age:  25 ,sex: "f")
          (name: " Carolyne ", age:  38 ,sex: "f")
          (name: " Rheba ", age:  24 ,sex: "f")
          (name: " Trula ", age:  23 ,sex: "m")
          (name: " Karyn ", age:  67 ,sex: "f")
          (name: " Sari ", age:  28 ,sex: "f")
          (name: " Jack ", age:  43 ,sex: "m")
          (name: " Ulysses ", age:  59 ,sex: "m")
          (name: " Wilda ", age:  48 ,sex: "f")
          (name: " Rozella ", age:  32 ,sex: "f")
          (name: " Lakeisha ", age:  49 ,sex: "f")
          (name: " Floria ", age:  44 ,sex: "f")
          (name: " Margret ", age:  42 ,sex: "f")
          (name: " Greta ", age:  66 ,sex: "f")
          (name: " Stan ", age:  32 ,sex: "m")
          (name: " Jordon ", age:  56 ,sex: "m")
          (name: " Jeffry ", age:  44 ,sex: "m")
          (name: " Lelia ", age:  56 ,sex: "f")
          (name: " Leonida ", age:  38 ,sex: "f")
          (name: " Tamar ", age:  62 ,sex: "f")
          (name: " Antonetta ", age:  32 ,sex: "f")
          (name: " Sondra ", age:  35 ,sex: "f")
          (name: " Beverly ", age:  58 ,sex: "f")
          (name: " Ivey ", age:  63 ,sex: "f")
          (name: " Melaine ", age:  21 ,sex: "f")
          (name: " Bernardo ", age:  65 ,sex: "m")
        ]

      @update_model_state()

    update_model_state: (model_state = @current_model_state) =>
      @current_model_state = model_state

      React.render(React.createElement(DraftState, {
        people: model_state.people
      }), @container)
