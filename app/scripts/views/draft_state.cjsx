define [
  'namespace'
  'react'
], (zt, React) ->

  DraftState = React.createClass

    render: ->

      <div className="ultimate-draft ultd">
        Hello World! {this.props.people.length} people!
      </div>