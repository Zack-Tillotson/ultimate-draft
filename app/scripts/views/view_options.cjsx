define [
  'namespace'
  'react'
], (zt, React) ->

  ViewOptions = React.createClass

    changeHandler: (event) ->        
      selected = $('[name=selected-option]')[0]?.checked or false
      
      @props.changeHandler
        selected: selected
    
    render: ->

      <div className="view-options">
        <div className="option baggage">
          <label for="baggage-option">View Baggage</label>
          <input name="baggage-option" type='checkbox' checked={@props.options.baggage} onChange={@changeHandler}></input>
        </div>
      </div>