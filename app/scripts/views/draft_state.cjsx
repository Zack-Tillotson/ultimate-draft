define [
  'namespace'
  'react'
  'views/person_filters'
], (zt, React, PersonFilters) ->

  DraftState = React.createClass

    getInitialState: ->
      filters: 
        min_age: @minAttr('age')
        max_age: @maxAttr('age')
        name: ''
        sex: ''
        min_skill: 0
        max_skill: 5
        min_height: @minAttr('height')
        max_height: @maxAttr('height')
        has_baggage: ''
      view_options:
        baggage: true
        selected: true
      sort: 
        by: 'name'
        dir: 'asc'

    filterChangeHandler: (filters) ->
      @setState filters: filters

    resetFiltersHandler: ->
      @setState filters: @getInitialState().filters

    viewChangeHandler: (options) ->
      @setState view_options: options

    sortHandler: (sortBy) ->
      dir = if sortBy is @state.sort.by and @state.sort.dir is "asc" then "desc" else "asc"
      @setState 
        sort: 
          by: sortBy
          dir: dir

    filterPersons: (people) ->
      person for person in people when person.age >= @state.filters.min_age and
                                       person.age <= @state.filters.max_age and
                                       person.skill >= @state.filters.min_skill and
                                       person.skill <= @state.filters.max_skill and
                                       person.height >= @state.filters.min_height and
                                       person.height <= @state.filters.max_height and
                                       new RegExp(@state.filters.name).test(person.name) and 
                                       new RegExp(@state.filters.sex).test(person.sex) and
                                       ((@state.filters.has_baggage is 'y' and person.baggage?) or
                                        (@state.filters.has_baggage is 'n' and not person.baggage?) or
                                        (@state.filters.has_baggage is ''))

    sortPersons: (people) ->
      people.sort (p1, p2) =>
        p1V = p1[@state.sort.by]
        p2V = p2[@state.sort.by]
        dir = if @state.sort.dir is "asc" then 1 else -1
        if p1V > p2V then return 1 * dir
        else if p1V < p2V then return -1 * dir
        else return 0

    minAttr: (attr, max = 9999) ->
      @props.people.reduce(
        ((previousValue, person) ->
          if previousValue > person[attr] then person[attr] else previousValue
        ), max)

    maxAttr: (attr, min = 0) ->
      @props.people.reduce(
        ((previousValue, person) ->
          if previousValue < person[attr] then person[attr] else previousValue
        ), 0) 

    buildPersonList: ->
      ([ @normalPerson(person), @baggagePerson(person, @props.people) ]) for person in @sortPersons(@filterPersons(@props.people))

    heightDisplay: (cm) ->
      "#{Math.floor(cm / 2.54 / 12)}' #{Math.floor(cm / 2.54 % 12)}\"" 

    clickHandler: (person) ->
      alert "Clicked!"
      # person.selected = if person.selected? then not person.selected else true
      # @props.people[person.baggage].selected = person.selected if person.baggage?

    normalPerson: (person) ->
      return null if person.selected and not @state.view_options.selected
      (    
        <tr onClick={@clickHandler.bind(this, person)}>
          <td className="selected">{if person.selected then "X" else ""}</td>
          <td className="name">{person.name}</td>
          <td>{person.age}</td>
          <td>{person.sex}</td>
          <td>{if person.baggage? then "Y" else "N"}</td>
          <td>{person.skill}</td>
          <td>{@heightDisplay(person.height)}</td>
        </tr>
      )

    baggagePerson: (person, people) ->
      return null if not person.baggage? or 
                     not @state.view_options.baggage or 
                     (person.selected and not @state.view_options.selected)
      
      baggage = people[person.baggage]
      (    
        <tr className="baggage">
          <td className="selected">{if baggage.selected then "X" else ""}</td>
          <td className="name">{baggage.name}</td>
          <td>{baggage.age}</td>
          <td>{baggage.sex}</td>
          <td></td>
          <td>{baggage.skill}</td>
          <td>{@heightDisplay(baggage.height)}</td>
        </tr>
      )

    render: ->
      people_list = @buildPersonList()
      min_age = @minAttr('age')
      max_age = @maxAttr('age')
      min_skill = @minAttr('skill')
      max_skill = @maxAttr('skill')
      min_height = @minAttr('height')
      max_height = @maxAttr('height')

      <div className="ultimate-draft ultd">
        <PersonFilters 
          filters={@state.filters} 
          min_age={min_age} 
          max_age={max_age} 
          min_skill={min_skill} 
          max_skill={max_skill} 
          min_height={min_height} 
          max_height={max_height} 
          changeHandler={@filterChangeHandler} 
          resetHandler={@resetFiltersHandler} />
        <table className="players-list">
          <thead>
            <tr>
              <td className="selected" onClick={@sortHandler.bind(this, 'selected')}>Selected</td>
              <td className="name" onClick={@sortHandler.bind(this, 'name')}>Name</td>
              <td onClick={@sortHandler.bind(this, 'age')}>Age</td>
              <td onClick={@sortHandler.bind(this, 'sex')}>Sex</td>
              <td onClick={@sortHandler.bind(this, 'baggage')}>Has Baggage</td>
              <td onClick={@sortHandler.bind(this, 'skill')}>Skill</td>
              <td onClick={@sortHandler.bind(this, 'height')}>Height</td>
            </tr>
          </thead>
          <tbody>
            {people_list}
          </tbody>
        </table>
      </div>