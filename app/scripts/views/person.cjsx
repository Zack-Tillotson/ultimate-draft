define [
  'namespace'
  'react'
], (zt, React) ->

  Person = React.createClass

    heightDisplay: (cm) ->
      [(
        <span className="ft">{Math.floor(cm / 2.54 / 12) + "'"}</span>
      ),(
        <span className="inch">{Math.floor(cm / 2.54 % 12) + '"'}</span>
      )] 

    personClickHandler: (person) ->
      alert 'clicked person!'      

    getView: (type, value) ->
      switch type
        when 'Height' then @heightDisplay value
        else value

    render: ->
      attrs = ((
        <td className="person-attribute #{attr_name}">{@getView(attr_name, @props.attrs[attr_name])}</td>
      ) for attr_name in @props.columns)

      <tr className="#{if @props.selected then 'selected' else ''}" onClick={@personClickHandler}>
        {attrs}
      </tr>