define [
  'namespace'
  'react'
], (zt, React) ->

  Menu = React.createClass

    getInitialState: ->
      open: false

    menuClickHandler: ->
      @setState(open: !@state.open)

    formClickHandler: (e) ->
      e.preventDefault()
      
      input = @refs.input.getDOMNode().value
      @props.formHandler(input)

      @setState(open: false)

    render: ->
      <div className='menu'>
        <div className='open-icon' onClick={@menuClickHandler}>&equiv;</div>
        <div className="menu-container #{if this.state.open then 'open' else 'closed'}">
          <h3>Menu</h3>
          <div className='close-icon' onClick={@menuClickHandler}>&#10006;</div>
          <p>Use this form to enter your own data for the draft.</p>
          <ol>
            <li>Open your spreadsheet in an application like Microsoft Excel.</li>
            <li>Save it as a CSV.</li>
            <li>Open that CSV file a text editor.</li>
            <li>Copy the entire contents of the file.</li>
            <li>Paste into the form here and click submit.</li>
          </ol>
          <form>
            <textarea ref='input' cols=100 rows=10 />
            <button onClick={@formClickHandler}>Submit</button>
          </form>
        </div>
      </div>