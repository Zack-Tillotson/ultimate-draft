class People

  @dataTypes:
    id: 'no-filter'
    first_name: 'string'
    last_name: 'string'
    age: 'number'
    sex: 'option'
    ath: 'number'
    exp: 'number'
    skill: 'number'
    vec: 'number'
    height: 'number'
    position: 'string'

  # TMP
  @createFauxData: ->
    names = ["Aaron","Ada","Al","Alan","Albert","Alexandra","Alexis","Alfonso","Alice","Amanda","Andrew","Angel","Angelina","Ann","Anna","Anne","Annie","Anthony","Antoinette","Antonia","Becky","Belinda","Benjamin","Bennie","Bert","Betty","Beulah","Bill","Billy","Bobby","Boyd","Brandon","Brandy","Brenda","Brian","Cameron","Candace","Carl","Carlos","Carol","Carolyn","Carroll","Catherine","Christie","Christopher","Claude","Cora","Curtis","Cynthia","Daniel","Darlene","Darrel","Debra","Desiree","Devin","Dewey","Dexter","Diana","Diane","Dianne","Domingo","Don","Donna","Dorothy","Douglas","Doyle","Duane","Earl","Edward","Eleanor","Elizabeth","Elmer","Emanuel","Eric","Erik","Erma","Ernest","Ervin","Esther","Ethel","Evelyn","Flora","Floyd","Francis","Frank","Frankie","Fred","Freda","Garry","Gary","Gayle","George","Georgia","Gerald","Gloria","Grady","Greg","Gregory","Hannah","Harold","Harriet","Harry","Harvey","Hazel","Heather","Hilda","Holly","Homer","Howard","Ira","Irene","Isabel","Israel","Jack","Jackie","Jacqueline","Jake","James","Jana","Jane","Janet","Jasmine","Jason","Jean","Jenna","Jennie","Jeremy","Jesse","Jessie","Jo","Joan","Joe","Joel","Johanna","John","Johnny","Jonathan","Jose","Josh","Joy","Judith","Judy","Julia","Julian","June","Justin","Kari","Katherine","Kathryn","Kathy","Kellie","Kelly","Kelvin","Kenneth","Kerry","Kristin","Lana","Larry","Lee","Lillian","Linda","Lisa","Lois","Louise","Lucia","Lula","Lynette","Mabel","Maggie","Margaret","Maria","Marian","Marianne","Marie","Marilyn","Martha","Martin","Megan","Melissa","Michael","Miguel","Mildred","Mitchell","Monica","Moses","Nadine","Nathaniel","Neal","Nicole","Nina","Noel","Norma","Olive","Olivia","Ollie","Omar","Pamela","Patrick","Patsy","Paul","Paulette","Pedro","Philip","Phillip","Rachel","Randolph","Raymond","Rebecca","Reginald","Rex","Richard","Rickey","Robert","Roberto","Roderick","Rogelio","Roman","Ron","Ronald","Rosa","Roy","Ruby","Rudolph","Rudy","Russell","Sam","Samuel","Scott","Sean","Seth","Shannon","Shelia","Sheri","Sheryl","Shirley","Stephanie","Stephen","Steven","Sue","Susan","Tabitha","Tami","Terry","Timothy","Tina","Tommie","Tony","Tracy","Vernon","Vickie","Virgil","Virginia","Vivian","Walter","Wendell","Wilfred","Willard","William","Wm","Woodrow"]

    people = (@generatePerson(index, names[parseInt(Math.random()*names.length)], names[parseInt(Math.random()*names.length)]) for index in [0...names.length])
    people = @addBaggage(people)

    new People(list: people)

  @generatePerson: (index, first_name, last_name) ->
    new Person
      id: index
      first_name: first_name
      last_name: last_name
      age: parseInt(Math.random()*30+18)
      sex: (['m','f'])[parseInt(Math.random()*2)]
      ath: parseInt(Math.random()*6)
      exp: parseInt(Math.random()*6)
      skill: parseInt(Math.random()*6)
      vec: parseInt(Math.random()*6)
      height: parseInt(Math.random()*50+150)
      position: 'not sure'

  @addBaggage: (people) ->
    for index, person of people
      if(typeof person.baggage is "undefined" and Math.random() > .5)
        otherIndex = parseInt(Math.random() * people.length)
        otherIndex = (otherIndex + 1) % people.length if otherIndex is index

        if typeof people[otherIndex].baggage is "undefined"
          people[otherIndex].baggage = parseInt(index)
          person.baggage = otherIndex
    people

  # /TMP

  constructor: (options) ->
    _.extend @, options

  getDefaultFilters: ->
    ((
      ret = 
        name: name
        type: dataType
      ret.min = @minAttr(name, @list) if dataType is 'number'
      ret.min_value = ret.min if dataType is 'number'
      ret.max = @maxAttr(name, @list) if dataType is 'number'
      ret.max_value = ret.max if dataType is 'number'
      ret.value = '' if dataType is 'string'
      ret.values = @pluckValues(name, @list) if dataType is 'option'
      ret.value = ret.values[0] if dataType is 'option'
      ret
    ) for name, dataType of People.dataTypes)

  minAttr: (attr, people = @state.people, max = 999999) ->
    people.reduce(
      ((previousValue, person) ->
        if previousValue > person[attr] then person[attr] else previousValue
      ), max)

  maxAttr: (attr, people = @state.people, min = 0) ->
    people.reduce(
      ((previousValue, person) ->
        if previousValue < person[attr] then person[attr] else previousValue
      ), min)

  pluckValues: (attr, people = @state.people) ->
    attr_values = {"": true}
    people.forEach (person) ->
        attr_values[person[attr]] = true
    Object.keys(attr_values)