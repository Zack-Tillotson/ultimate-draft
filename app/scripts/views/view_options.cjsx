define [
  'namespace'
  'react'
], (zt, React) ->

  ViewOptions = React.createClass

    changeHandler: (event) ->        

      baggage = $('[name=baggage-option]')[0]?.checked or false
      selected = $('[name=selected-option]')[0]?.checked or false
      
      @props.changeHandler
        baggage: baggage
        selected: selected
    
    render: ->

      <div className="view-options">
        <div className="option baggage">
          <label for="baggage-option">View Baggage</label>
          <input name="baggage-option" type='checkbox' checked={@props.options.baggage} onChange={@changeHandler}></input>
        </div>
      </div>