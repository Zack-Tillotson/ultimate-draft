define [
  'namespace'
  'react'
], (zt, React) ->

  PersonFilters = React.createClass

    changeHandler: (event) ->        

      min_age = parseInt($('[name=min-age-filter]').val())
      max_age = parseInt($('[name=max-age-filter]').val())
      min_skill = parseInt($('[name=min-skill-filter]').val())
      max_skill = parseInt($('[name=max-skill-filter]').val())
      min_height = parseInt($('[name=min-height-filter]').val())
      max_height = parseInt($('[name=max-height-filter]').val())
      first_name = $('[name=first-name-filter]').val()
      sex = $('[name=sex-filter]').val()
      has_baggage = $('[name=has-baggage-filter]').val()

      @props.changeHandler
        min_age: min_age
        max_age: max_age
        min_skill: min_skill
        max_skill: max_skill
        min_height: min_height
        max_height: max_height
        first_name: first_name
        sex: sex
        has_baggage: has_baggage

    heightDisplay: (cm) ->
      "#{Math.floor(cm / 2.54 / 12)}' #{Math.floor(cm / 2.54 % 12)}\"" 

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
        <div className="filter min-skill">
          <label for="min-skill-filter">Minimum Skill</label>
          <span>[{@props.min_skill} - {@props.max_skill}]</span>
          <input name="min-skill-filter" type='range' value={@props.filters.min_skill} min={@props.min_skill} max={@props.max_skill} onChange={@changeHandler}></input>
          <span>{@props.filters.min_skill}</span>
        </div>
        <div className="filter max-skill">
          <label for="max-skill-filter">Maximum Skill</label>
          <span>[{@props.min_skill} - {@props.max_skill}]</span>
          <input name="max-skill-filter" type='range' value={@props.filters.max_skill} min={@props.min_skill} max={@props.max_skill} onChange={@changeHandler}></input>
          <span>{@props.filters.max_skill}</span>
        </div>
        <div className="filter min-height">
          <label for="min-height-filter">Minimum Height</label>
          <span>[{@heightDisplay(@props.min_height)} - {@heightDisplay(@props.max_height)}]</span>
          <input name="min-height-filter" type='range' value={@props.filters.min_height} min={@props.min_height} max={@props.max_height} onChange={@changeHandler}></input>
          <span>{@heightDisplay(@props.filters.min_height)}</span>
        </div>
        <div className="filter max-height">
          <label for="max-height-filter">Maximum Height</label>
          <span>[{@heightDisplay(@props.min_height)} - {@heightDisplay(@props.max_height)}]</span>
          <input name="max-height-filter" type='range' value={@props.filters.max_height} min={@props.min_height} max={@props.max_height} onChange={@changeHandler}></input>
          <span>{@heightDisplay(@props.filters.max_height)}</span>
        </div>
        <div className="filter first-name">
          <label for="first-name-filter">First Name</label>
          <input name="first-name-filter" type='text' value={@props.filters.name} onChange={@changeHandler}></input>
        </div>
        <div className="filter sex">
          <label for="sex-filter">Sex</label>
          <select name="sex-filter" value={@props.filters.sex} onChange={@changeHandler}>
            <option value=""></option>
            <option value="m">M</option>
            <option value="f">F</option>
          </select>
        </div>
        <div className="filter has-baggage">
          <label for="has-baggage-filter">Has Baggage</label>
          <select name="has-baggage-filter" value={@props.filters.has_baggage} onChange={@changeHandler}>
            <option value=""></option>
            <option value="y">Yes</option>
            <option value="n">No</option>
          </select>
        </div>
        <button onClick={@props.resetHandler}>Reset Filters</button>
      </div>