define [
  'namespace'
  'react'
  'views/person_filters'
], (zt, React, PersonFilters) ->

  DraftState = React.createClass

    getInitialState: ->
      filters: 
        min_age: @minAge()
        max_age: @maxAge()
        name: ''
        sex: ''

    changeHandler: (filters) ->
      @setState filters: filters

    filterPersons: (people) ->
      person for person in people when person.age >= @state.filters.min_age and
                                       person.age <= @state.filters.max_age and
                                       new RegExp(@state.filters.name).test(person.name) and 
                                       new RegExp(@state.filters.sex).test(person.sex)

    minAge: ->
      @props.people.reduce(
        ((previousValue, person) ->
          if previousValue > person.age then person.age else previousValue
        ), 99)

    maxAge: ->
      @props.people.reduce(
        ((previousValue, person) ->
          if previousValue < person.age then person.age else previousValue
        ), 0) 

    buildPersonList: ->
      (
        <tr>
          <td>{person.name}</td>
          <td>{person.age}</td>
          <td>{person.sex}</td>
        </tr>
      ) for person in @filterPersons(@props.people)

    render: ->
      people_list = @buildPersonList()
      min_age = @minAge()
      max_age = @maxAge()

      <div className="ultimate-draft ultd">
        <PersonFilters filters={@state.filters} min_age={min_age} max_age={max_age} changeHandler={@changeHandler} />
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Age</td>
              <td>Sex</td>
            </tr>
          </thead>
          <tbody>
            {people_list}
          </tbody>
        </table>
      </div>