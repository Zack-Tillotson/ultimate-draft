class Person

  constructor: (options) ->
    _.extend this, options

  @passesFilters: (person, filters) ->
    ret = true
    filters.forEach (filter) ->
      switch filter.type
        when 'number'
          ret = false if person[filter.name] < filter.min_value or person[filter.name] > filter.max_value
        when 'string'
          ret = false if not new RegExp(filter.value).test(person[filter.name])
        when 'option'
          ret = false if filter.value and person[filter.name] isnt filter.value
        when 'exists'
          ret = false if filter.value is 'Y' and not person[filter.name] or filter.value is 'N' and person[filter.name]
    return ret

  @sortFunction: (sortBy, sortDir) ->
    (p1, p2) =>
      p1V = p1[sortBy]
      p2V = p2[sortBy]
      dir = if sortDir is "asc" then 1 else -1
      if p1V > p2V then return 1 * dir
      else if p1V < p2V then return -1 * dir
      else return 0