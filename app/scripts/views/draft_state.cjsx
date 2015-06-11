define [
  'namespace'
  'react'
  'views/person_filters'
  'views/view_options'
  'views/person'
  'models/person'
  'models/people'
], (zt, React, PersonFilters, ViewOptions, PersonView) ->

  DraftState = React.createClass

    getInitialState: ->
      people = People.createFauxData()

      people: people
      filters: people.getDefaultFilters()
      sort: null
      view_options:
        selected: true

    # Event Handlers

    filterChangeHandler: (filters) ->
      @setState filters: filters

    filterResetHandler: ->
      @setState filters: @state.people.getDefaultFilters()

    viewOptionChangeHandler: (options) ->
      @setState view_options: options

    sortClickHandler: (sortBy) ->
      dir = if sortBy is @state.sort?.by and @state.sort?.dir is 'asc' then 'desc' else 'asc'
      @setState 
        sort: 
          by: sortBy
          dir: dir

    personClickHandler: (person) ->
      
      people = @state.people
      person = people[person.id]

      person.selected = if person.selected? then not person.selected else true
      people[person.baggage].selected = person.selected if person.baggage?

      @setState people: people

    # Rendering functions

    filterPersons: (people) ->
      person for person in people when Person.passesFilters(person, @state.filters)

    sortPersons: (people, sort) ->
      people.sort Person.sortFunction(sort.by, sort.dir) if sort?.by? and sort?.dir?
      people

    getPersonView: (person) ->
      <PersonView attrs={person}></PersonView>

    render: ->
      people = (@getPersonView(person) for person in @sortPersons @filterPersons(@state.people.list), @state.sort)
      table_columns = ((
        <td className="column-header person-attribute #{attr_name}" onClick={@sortClickHandler.bind(this, attr_name)}>{attr_name}</td>
      ) for attr_name, attr of @state.people.list[0])
      
      <div className="ultimate-draft ultd">
        <PersonFilters filters={@state.filters} changeHandler={@filterChangeHandler} resetHandler={@filterResetHandler} />
        <ViewOptions options={@state.view_options} changeHandler={@viewOptionChangeHandler} />
        <table className="players-list">
          <thead>
            <tr>
              {table_columns}
            </tr>
          </thead>
          <tbody>
            {people}
          </tbody>
        </table>
      </div>