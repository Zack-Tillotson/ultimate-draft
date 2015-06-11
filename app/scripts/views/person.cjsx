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
      attrs = ((
        <td className="person-attribute #{attr}">{attr}</td>
      ) for attr_name, attr of @props.attrs)
      <tr className="#{if @props.selected then 'selected' else ''}" onClick={@personClickHandler}>
        {attrs}
      </tr>