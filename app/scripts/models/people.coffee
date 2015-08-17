define [
  'namespace'
  'models/person'
  'papaparse'
], (zt, Person, PapaParse) ->

  class People

    @parseCsv: (csvText) ->

      @saveToLocalStorage csvText

      parsed = Papa.parse(csvText, header: true)
      people = (new Person(item) for item in parsed.data)

      new People
        list: people

    @saveToLocalStorage: (csvText) ->
      localStorage.setItem('data', csvText)

    @loadFromLocalStorage: ->
      People.parseCsv(localStorage.getItem 'data')

    @dataTypes:
      'Team': 'no-filter'
      'ID':'no-filter'
      'G': 'option'
      'First': 'string'
      'Last': 'string'
      'Full': 'string'
      'Bag ID': 'exists'
      'Baggage Name': 'string'
      'Bag Vec': 'number'
      'Ath': 'number'
      'Exp': 'number'
      'Skill': 'number'
      'Vec': 'number'
      'Position': 'string'
      'Dump': 'exists'
      'Back': 'exists'
      'Fore': 'exists'
      'Huck Back': 'exists' 
      'Huck Fore': 'exists'
      'W/ mark': 'exists'
      'Anti Mark': 'exists'
      'Wind': 'exists'
      'Height': 'number'
      'Weight': 'number'
      'Age': 'number'
      'Yr Started': 'number'
      'Weeks Missed': 'number'
      'Miss Tourney?': 'exists'
      'Email': 'string'
      'Phone': 'string'
      'Comments': 'string'

    domName: (name) ->
      name.replace(/[^a-zA-Z]/g, '_')

    constructor: (options) ->
      _.extend @, options

    getDefaultFilters: ->
      ((

        ret = 
          name: name
          dom_name: @domName(name)
          type: dataType

        if dataType is 'number'
          ret.min = @minAttr(name, @list) 
          ret.min_value = ret.min
          ret.max = @maxAttr(name, @list) 
          ret.max_value = ret.max
        
        if dataType is 'string'
          ret.value = '' 

        if dataType is 'option'
          ret.values = @pluckValues(name, @list) 
          ret.value = ret.values[0]

        if dataType is 'exists'
          ret.values = ['', 'Y', 'N']
          ret.value = ''

        ret
      ) for name, dataType of People.dataTypes)

    minAttr: (attr, people = @state.people, max = 999999) ->
      people.reduce(
        ((previousValue, person) ->
          value = Number(person[attr])
          if value isnt NaN and previousValue > value then value else previousValue
        ), max)

    maxAttr: (attr, people = @state.people, min = 0) ->
      people.reduce(
        ((previousValue, person) ->
          value = Number(person[attr])
          if value isnt NaN and previousValue < value then value else previousValue
        ), min)

    pluckValues: (attr, people = @state.people) ->
      attr_values = {'': true}
      people.forEach (person) ->
          attr_values[person[attr]] = true
      Object.keys(attr_values)