define [
  'namespace'
  'react'
], (zt, React) ->

  PersonFilters = React.createClass

    changeHandler: (event) ->        

      min_age = parseInt($('[name=min-age-filter]').val())
      max_age = parseInt($('[name=max-age-filter]').val())
      name = $('[name=name-filter]').val()
      sex = $('[name=sex-filter]').val()

      @props.changeHandler
        min_age: min_age
        max_age: max_age
        name: name
        sex: sex

    render: ->

      <div className="person-filters">
        <div className="filter min-age">
          <label for="min-age-filter">Minimum Age</label>
          <span>[{@props.min_age} - {@props.max_age}]</span>
          <input name="min-age-filter" type='range' value={@props.filters.min_age} min={@props.min_age} max={@props.max_age} onChange={@changeHandler}></input>
          <span>{@props.filters.min_age}</span>
        </div>
        <div className="filter max-age">
          <label for="max-age-filter">Maximum Age</label>
          <span>[{@props.min_age} - {@props.max_age}]</span>
          <input name="max-age-filter" type='range' value={@props.filters.max_age} min={@props.min_age} max={@props.max_age} onChange={@changeHandler}></input>
          <span>{@props.filters.max_age}</span>
        </div>
        <div className="filter name">
          <label for="name-filter">Name</label>
          <input name="name-filter" type='text' value={@props.filters.name} onChange={@changeHandler}></input>
        </div>
        <div className="filter sex">
          <label for="sex-filter">Sex</label>
          <select name="sex-filter" value={@props.filters.sex} onChange={@changeHandler}>
            <option value=""></option>
            <option value="m">M</option>
            <option value="f">F</option>
          </select>
        </div>
      </div>