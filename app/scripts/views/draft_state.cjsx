define [
  'namespace'
  'react'
  'views/person_filters'
  'views/view_options'
], (zt, React, PersonFilters, ViewOptions) ->

  DraftState = React.createClass

    getInitialState: ->
      people = @createFauxData()

      people: people
      filters: 
        min_age: @minAttr('age', people)
        max_age: @maxAttr('age', people)
        first_name: ''
        sex: ''
        min_skill: 0
        max_skill: 5
        min_height: @minAttr('height', people)
        max_height: @maxAttr('height', people)
        has_baggage: ''
      view_options:
        baggage: true
        selected: true
      sort: 
        by: 'first_name'
        dir: 'asc'

    filterChangeHandler: (filters) ->
      @setState filters: filters

    resetFiltersHandler: ->
      @setState filters: @getInitialState().filters

    viewOptionChangeHandler: (options) ->
      @setState view_options: options

    sortHandler: (sortBy) ->
      dir = if sortBy is @state.sort.by and @state.sort.dir is "asc" then "desc" else "asc"
      @setState 
        sort: 
          by: sortBy
          dir: dir

    filterPersons: (people) ->
      person for person in people when person.age >= @state.filters.min_age and
                                       person.age <= @state.filters.max_age and
                                       person.skill >= @state.filters.min_skill and
                                       person.skill <= @state.filters.max_skill and
                                       person.height >= @state.filters.min_height and
                                       person.height <= @state.filters.max_height and
                                       new RegExp(@state.filters.first_name).test(person.first_name) and 
                                       new RegExp(@state.filters.sex).test(person.sex) and
                                       ((@state.filters.has_baggage is 'y' and person.baggage?) or
                                        (@state.filters.has_baggage is 'n' and not person.baggage?) or
                                        (@state.filters.has_baggage is ''))

    sortPersons: (people) ->
      people.sort (p1, p2) =>
        p1V = p1[@state.sort.by]
        p2V = p2[@state.sort.by]
        dir = if @state.sort.dir is "asc" then 1 else -1
        if p1V > p2V then return 1 * dir
        else if p1V < p2V then return -1 * dir
        else return 0

    minAttr: (attr, people = @state.people, max = 9999) ->
      people.reduce(
        ((previousValue, person) ->
          if previousValue > person[attr] then person[attr] else previousValue
        ), max)

    maxAttr: (attr, people = @state.people, min = 0) ->
      people.reduce(
        ((previousValue, person) ->
          if previousValue < person[attr] then person[attr] else previousValue
        ), min) 

    buildPersonList: ->
      ([ @normalPerson(person), @baggagePerson(person, @state.people) ]) for person in @sortPersons(@filterPersons(@state.people))

    heightDisplay: (cm) ->
      "#{Math.floor(cm / 2.54 / 12)}' #{Math.floor(cm / 2.54 % 12)}\"" 

    clickHandler: (person) ->
      
      people = @state.people
      person = people[person.id]

      person.selected = if person.selected? then not person.selected else true
      people[person.baggage].selected = person.selected if person.baggage?

      @setState people: people

    normalPerson: (person) ->
      return null if person.selected and not @state.view_options.selected
      (    
        <tr className="#{if person.selected then 'selected' else ''}" onClick={@clickHandler.bind(this, person)}>
          <td className="selected">{if person.selected then "X" else ""}</td>
          <td className="name">{person.first_name}</td>
          <td className="age">{person.age}</td>
          <td className="sex">{person.sex}</td>
          <td className="has-baggage">{if person.baggage? then "Y" else "N"}</td>
          <td className="skill">{person.skill}</td>
          <td className="height">{@heightDisplay(person.height)}</td>
        </tr>
      )

    baggagePerson: (person, people) ->
      return null if not person.baggage? or 
                     not @state.view_options.baggage or 
                     (person.selected and not @state.view_options.selected)
      
      baggage = people[person.baggage]
      (    
        <tr className="#{if person.selected then 'selected' else ''  } baggage">
          <td className="selected"></td>
          <td className="name">{baggage.first_name}</td>
          <td>{baggage.age}</td>
          <td>{baggage.sex}</td>
          <td></td>
          <td>{baggage.skill}</td>
          <td>{@heightDisplay(baggage.height)}</td>
        </tr>
      )

    render: ->
      people_list = @buildPersonList()
      min_age = @minAttr('age')
      max_age = @maxAttr('age')
      min_skill = @minAttr('skill')
      max_skill = @maxAttr('skill')
      min_height = @minAttr('height')
      max_height = @maxAttr('height')

      <div className="ultimate-draft ultd">
        <PersonFilters 
          filters={@state.filters} 
          min_age={min_age} 
          max_age={max_age} 
          min_skill={min_skill} 
          max_skill={max_skill} 
          min_height={min_height} 
          max_height={max_height} 
          changeHandler={@filterChangeHandler} 
          resetHandler={@resetFiltersHandler} />
        <ViewOptions
          options={@state.view_options}
          changeHandler={@viewOptionChangeHandler} />
        <table className="players-list">
          <thead>
            <tr>
              <td className="selected" onClick={@sortHandler.bind(this, 'selected')}>Selected</td>
              <td className="first-name" onClick={@sortHandler.bind(this, 'first-name')}>First Name</td>
              <td onClick={@sortHandler.bind(this, 'age')}>Age</td>
              <td onClick={@sortHandler.bind(this, 'sex')}>Sex</td>
              <td onClick={@sortHandler.bind(this, 'baggage')}>Has Baggage</td>
              <td onClick={@sortHandler.bind(this, 'skill')}>Skill</td>
              <td onClick={@sortHandler.bind(this, 'height')}>Height</td>
            </tr>
          </thead>
          <tbody>
            {people_list}
          </tbody>
        </table>
      </div>

    # TMP
    createFauxData: ->
      names = ["Aaron","Ada","Al","Alan","Albert","Alexandra","Alexis","Alfonso","Alice","Amanda","Andrew","Angel","Angelina","Ann","Anna","Anne","Annie","Anthony","Antoinette","Antonia","Becky","Belinda","Benjamin","Bennie","Bert","Betty","Beulah","Bill","Billy","Bobby","Boyd","Brandon","Brandy","Brenda","Brian","Cameron","Candace","Carl","Carlos","Carol","Carolyn","Carroll","Catherine","Christie","Christopher","Claude","Cora","Curtis","Cynthia","Daniel","Darlene","Darrel","Debra","Desiree","Devin","Dewey","Dexter","Diana","Diane","Dianne","Domingo","Don","Donna","Dorothy","Douglas","Doyle","Duane","Earl","Edward","Eleanor","Elizabeth","Elmer","Emanuel","Eric","Erik","Erma","Ernest","Ervin","Esther","Ethel","Evelyn","Flora","Floyd","Francis","Frank","Frankie","Fred","Freda","Garry","Gary","Gayle","George","Georgia","Gerald","Gloria","Grady","Greg","Gregory","Hannah","Harold","Harriet","Harry","Harvey","Hazel","Heather","Hilda","Holly","Homer","Howard","Ira","Irene","Isabel","Israel","Jack","Jackie","Jacqueline","Jake","James","Jana","Jane","Janet","Jasmine","Jason","Jean","Jenna","Jennie","Jeremy","Jesse","Jessie","Jo","Joan","Joe","Joel","Johanna","John","Johnny","Jonathan","Jose","Josh","Joy","Judith","Judy","Julia","Julian","June","Justin","Kari","Katherine","Kathryn","Kathy","Kellie","Kelly","Kelvin","Kenneth","Kerry","Kristin","Lana","Larry","Lee","Lillian","Linda","Lisa","Lois","Louise","Lucia","Lula","Lynette","Mabel","Maggie","Margaret","Maria","Marian","Marianne","Marie","Marilyn","Martha","Martin","Megan","Melissa","Michael","Miguel","Mildred","Mitchell","Monica","Moses","Nadine","Nathaniel","Neal","Nicole","Nina","Noel","Norma","Olive","Olivia","Ollie","Omar","Pamela","Patrick","Patsy","Paul","Paulette","Pedro","Philip","Phillip","Rachel","Randolph","Raymond","Rebecca","Reginald","Rex","Richard","Rickey","Robert","Roberto","Roderick","Rogelio","Roman","Ron","Ronald","Rosa","Roy","Ruby","Rudolph","Rudy","Russell","Sam","Samuel","Scott","Sean","Seth","Shannon","Shelia","Sheri","Sheryl","Shirley","Stephanie","Stephen","Steven","Sue","Susan","Tabitha","Tami","Terry","Timothy","Tina","Tommie","Tony","Tracy","Vernon","Vickie","Virgil","Virginia","Vivian","Walter","Wendell","Wilfred","Willard","William","Wm","Woodrow"]

      people = (@generatePerson(index, names[index]) for index in [0...names.length])
      people = @addBaggage(people)

    generatePerson: (index, name) ->
      id: index
      first_name: name
      last_name: 'Lastname'
      age: parseInt(Math.random()*30+18)
      sex: (['m','f'])[parseInt(Math.random()*2)]
      ath: parseInt(Math.random()*6)
      exp: parseInt(Math.random()*6)
      skill: parseInt(Math.random()*6)
      vec: parseInt(Math.random()*6)
      height: parseInt(Math.random()*50+150)
      position: 'not sure'

    addBaggage: (people) ->
      for index, person of people
        if(typeof person.baggage is "undefined" and Math.random() > .5)
          otherIndex = parseInt(Math.random() * people.length)
          otherIndex = (otherIndex + 1) % people.length if otherIndex is index

          if typeof people[otherIndex].baggage is "undefined"
            people[otherIndex].baggage = parseInt(index)
            person.baggage = otherIndex
      people
