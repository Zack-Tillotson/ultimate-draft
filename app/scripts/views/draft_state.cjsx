define [
  'namespace'
  'react'
  'views/person_filters'
  'views/view_options'
  'views/person'
  'views/menu'
  'models/person'
  'models/people'
], (zt, React, PersonFilters, ViewOptions, PersonView, Menu, Person, People) ->

  DraftState = React.createClass

    getInitialState: ->
      people = People.loadFromLocalStorage()

      people: people
      filters: people.getDefaultFilters()
      sort: null
      view_options:
        selected: true
        filters: false
        baggage: false
        hidden_fields: ['Team', 'Full', 'Email', 'Phone', 'Comments']

    # Event Handlers

    filterChangeHandler: (filters) ->
      @setState view_options: _.extend {}, @state.view_options, filters: filters

    filterResetHandler: ->
      @setState filters: @state.people.getDefaultFilters()

    viewOptionChangeHandler: (options) ->
      @setState view_options: _.extend {}, @state.view_options, options

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

    filterTitleClickHandler: (event) ->
      @setState view_options: _.extend {}, @state.view_options, filters: not @state.view_options.filters

    formHandler: (csvText) ->

      people = People.parseCsv(csvText)

      @setState 
        people: people
        filter: people.getDefaultFilters()
        sort: null

    # Rendering functions

    filterPersons: (people) ->
      return [] if not people?.length
      person for person in people when Person.passesFilters(person, @state.filters)

    sortPersons: (people, sort) ->
      people.sort Person.sortFunction(sort.by, sort.dir) if sort?.by? and sort?.dir?
      people

    getPersonView: (person, columns) ->
      <PersonView attrs={person} key={person.id} columns={@filterColumns()}></PersonView>

    cleanName: (name) ->
      name.replace('_', ' ').split(' ').map((item) -> item.charAt(0).toUpperCase() + item.substr(1)).join(' ')

    filterColumns: ->
      _.reject(Object.keys(People.dataTypes), (item) => 
        _.contains(@state.view_options.hidden_fields, item)
      )

    renderColumnHeaders: ->
      sortBy = @state.sort?.by
      sortDesc = @state.sort?.dir
      (
        <td 
          className="column-header person-attribute #{attr_name.replace(/[^A-Za-z]/g, '_')} #{if attr_name is sortBy then sortDesc else 'inactive asc'}" 
          onClick={@sortClickHandler.bind(this, attr_name)}>
            {@cleanName attr_name}
        </td>
      ) for attr_name in @filterColumns()

    render: ->

      filtered_persons = @filterPersons(@state.people.list)
      people = (@getPersonView(person) for person in @sortPersons filtered_persons, @state.sort)
      table_columns = @renderColumnHeaders()
      
      <div className="ultimate-draft ultd">
        <PersonFilters 
          filters={@state.filters} 
          visible={@state.view_options.filters} 
          filterTitleClickHandler={@filterTitleClickHandler} 
          changeHandler={@filterChangeHandler} 
          resetHandler={@filterResetHandler} 
          totalCount={@state.people.list.length}
          filteredCount={filtered_persons.length} />
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
        <Menu formHandler={@formHandler} />
      </div>