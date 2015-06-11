define [
  'namespace'
  'react'
], (zt, React) ->

  PersonFilters = React.createClass

    changeHandler: (event) ->

      filters = @props.filters.slice(0) # ie clone

      for filter in filters
        continue if filter.type is 'no-filter'
        switch filter.type
          when "number"
              filter.min_value = parseInt($(".filter input[name=min-#{filter.name}-filter").val())
              filter.max_value = parseInt($(".filter input[name=max-#{filter.name}-filter").val())
          else
              filter.value = $(".filter [name=#{filter.name}-filter]").val()

      @props.changeHandler filters

    heightDisplay: (cm) ->
      "#{Math.floor(cm / 2.54 / 12)}' #{Math.floor(cm / 2.54 % 12)}\"" 

    cleanName: (name) ->
      name.replace '_', ' '

    numberFilter: (filter) ->
      [(
        <div className="filter number-filter min-#{filter.name}">
          <label for="min-#{filter.name}-filter">Minimum {@cleanName filter.name}</label>
          <span>[{filter.min} - {filter.max}]</span>
          <input name="min-#{filter.name}-filter" type='range' value={filter.min_value} min={filter.min} max={filter.max} onChange={@changeHandler}></input>
          <span>{filter.min_value}</span>
        </div>
      ), (
        <div className="filter number-filter max-#{filter.name}">
          <label for="max-#{filter.name}-filter">Maximum {@cleanName filter.name}</label>
          <span>[{filter.min} - {filter.max}]</span>
          <input name="max-#{filter.name}-filter" type='range' value={filter.max_value} min={filter.min} max={filter.max} onChange={@changeHandler}></input>
          <span>{filter.max_value}</span>
        </div>
      )]

    stringFilter: (filter) ->
      <div className="filter string-filter #{filter.name}">
        <label for="#{filter.name}-filter">{@cleanName filter.name}</label>
        <input name="#{filter.name}-filter" type='text' value={filter.value} onChange={@changeHandler}></input>
      </div>

    optionFilter: (filter) ->
      options = ((
        <option value="#{option}">{option}</option>
      ) for option in filter.values)

      <div className="filter option-filter {filter.name}">
        <label for="#{filter.name}-filter">{@cleanName filter.name}</label>
        <select name="#{filter.name}-filter" value={filter.value} onChange={@changeHandler}>
          {options}  
        </select>
      </div>

    render: ->
      filterList = (
        (
          switch filter.type
            when 'number' then @numberFilter filter
            when 'string' then @stringFilter filter
            when 'option' then @optionFilter filter
        ) for filter in @props.filters)

      <div className="person-filters">
        {filterList}
        <button onClick={@props.resetHandler}>Reset Filters</button>
      </div>