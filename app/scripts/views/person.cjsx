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
        <td className="person-attribute #{attr_name}">{@getView(attr_name, attr)}</td>
      ) for attr_name, attr of @props.attrs)
      attrs.push [(
        <td className="person-attribute baggage first-name">{@props.baggage?.first_name}</td>
      ), (
        <td className="person-attribute baggage last-name">{@props.baggage?.last_name}</td>
      ), (
        <td className="person-attribute baggage vec">{@props.baggage?.vec}</td>
      )]

      <tr className="#{if @props.selected then 'selected' else ''}" onClick={@personClickHandler}>
        {attrs}
      </tr>