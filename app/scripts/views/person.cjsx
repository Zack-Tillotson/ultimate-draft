define [
  'namespace'
  'react'
], (zt, React) ->

  Person = React.createClass

    heightDisplay: (cm) ->
      "#{Math.floor(cm / 2.54 / 12)}' #{Math.floor(cm / 2.54 % 12)}\"" 

    personClickHandler: (person) ->
      alert 'clicked person!'      

    render: ->
      (    
        <tr className="#{if @props.selected then 'selected' else ''}" onClick={@clickHandler}>
          <td className="selected">{if @props.selected then "X" else ""}</td>
          <td className="name">{@props.first_name}</td>
          <td className="age">{@props.age}</td>
          <td className="sex">{@props.sex}</td>
          <td className="has-baggage">{if @props.baggage? then "Y" else "N"}</td>
          <td className="skill">{@props.skill}</td>
          <td className="height">{@heightDisplay(@props.height)}</td>
        </tr>
      )