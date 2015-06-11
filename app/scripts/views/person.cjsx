define [
  'namespace'
  'react'
], (zt, React) ->

  Person = React.createClass

    heightDisplay: (cm) ->
      "#{Math.floor(cm / 2.54 / 12)}' #{Math.floor(cm / 2.54 % 12)}\"" 

    personClickHandler: (person) ->
      alert 'clicked person!'      

    getView: (type, value) ->
      switch type
        when 'height' then @heightDisplay value
        else value

    render: ->
      attrs = ((
        <td className="person-attribute #{attr}">{@getView(attr_name, attr)}</td>
      ) for attr_name, attr of @props.attrs)
      <tr className="#{if @props.selected then 'selected' else ''}" onClick={@personClickHandler}>
        {attrs}
      </tr>