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
              filter.min_value = parseInt($(".filter input[name=min-#{filter.name}-filter]").val())
              filter.max_value = parseInt($(".filter input[name=max-#{filter.name}-filter]").val())
          else
              filter.value = $(".filter [name=#{filter.name}-filter]").val()

      @props.changeHandler filters

    heightDisplay: (cm) ->
      "#{Math.floor(cm / 2.54 / 12)}' #{Math.floor(cm / 2.54 % 12)}\"" 

    cleanName: (name) ->
      name.replace('_', ' ').split(' ').map((item) -> item.charAt(0).toUpperCase() + item.substr(1)).join(' ')

    getDispay: (name, value) ->
      switch name
        when 'height' then @heightDisplay value
        else value

    numberFilter: (filter) ->
      maxView = @getDispay(filter.name, filter.max)
      minView = @getDispay(filter.name, filter.min)
      maxValueView = @getDispay(filter.name, filter.max_value)
      minValueView = @getDispay(filter.name, filter.min_value)

      [(
        <div className="filter number-filter min-#{filter.name}">
          <label className="filter-name" for="min-#{filter.name}-filter">Minimum {@cleanName filter.name}</label>
          <span className="filter-range">[{minView} - {maxView}]</span>
          <input className="filter-input" name="min-#{filter.name}-filter" type='range' value={filter.min_value} min={filter.min} max={filter.max} onChange={@changeHandler}></input>
          <span className="filter-value">{minValueView}</span>
        </div>
      ), (
        <div className="filter number-filter max-#{filter.name}">
          <label className="filter-name" for="max-#{filter.name}-filter">Maximum {@cleanName filter.name}</label>
          <span className="filter-range">[{minView} - {maxView}]</span>
          <input className="filter-input" name="max-#{filter.name}-filter" type='range' value={filter.max_value} min={filter.min} max={filter.max} onChange={@changeHandler}></input>
          <span className="filter-value">{maxValueView}</span>
        </div>
      )]

    stringFilter: (filter) ->
      <div className="filter string-filter #{filter.name}">
        <label className="filter-name" for="#{filter.name}-filter">{@cleanName filter.name}</label>
        <input className="filter-input" name="#{filter.name}-filter" type='text' value={filter.value} onChange={@changeHandler}></input>
      </div>

    optionFilter: (filter) ->
      options = ((
        <option value="#{option}">{option}</option>
      ) for option in filter.values)

      <div className="filter option-filter #{filter.name}">
        <label className="filter-name" for="#{filter.name}-filter">{@cleanName filter.name}</label>
        <select className="filter-input" name="#{filter.name}-filter" value={filter.value} onChange={@changeHandler}>
          {options}  
        </select>
      </div>

    render: ->
      filterList = (
        (
          switch filter.type
            when 'number' then @numberFilter filter
            when 'string' then @stringFilter filter
            when 'option', 'exists' then @optionFilter filter
        ) for filter in @props.filters)
      filterViewClass = if @props.visible then "shown" else "not-shown"

      <div className="person-filters #{filterViewClass}">
        <div className="filter-inputs">
          <div className="filter-inputs-inner">
            {filterList}
            <button onClick={@props.resetHandler}>Reset Filters</button>
          </div>  
        </div>
        <div className="filter-title" onClick={@props.filterTitleClickHandler}>
          Filter ({@props.filteredCount} / {@props.totalCount})
        </div>
      </div>