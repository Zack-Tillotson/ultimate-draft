define ['/assets/scripts/namespace.js', '/assets/scripts/models/distribution.js'], (zt, Distribution) ->
  describe "zt.Distribution", ->

    describe "in a standard initial state", ->

      beforeEach ->
        @distribution = new zt.Distribution()

      it "has correct starting min", ->
        expect(@distribution.min).toBe 0

      it "has correct starting max", ->
        expect(@distribution.max).toBe 100

      it "has correct starting target", ->
        expect(@distribution.target).toBe 10

      it "has correct starting pattern", ->
        expect(@distribution.pattern).toBe "linear"

      it "has correct starting type", ->
        expect(@distribution.type).toBe "numeric"

      it "returns values that are between the min and max", ->
        foundError = false
        for i in [0 .. 1000]
          val = @distribution.getValue()
          foundError = true if val < 0 or val > 100
        expect(foundError).toBeFalsy()

    describe "in a nonstandard initial state", ->

      beforeEach ->
        @distribution = new zt.Distribution
          min: 100
          max: 1000
          target: 500
          pattern: 'linear'
          type: 'numeric'

      it "has correct starting min", ->
        expect(@distribution.min).toBe 100

      it "has correct starting max", ->
        expect(@distribution.max).toBe 1000

      it "has correct starting target", ->
        expect(@distribution.target).toBe 500

      it "has correct starting pattern", ->
        expect(@distribution.pattern).toBe "linear"

      it "has correct starting type", ->
        expect(@distribution.type).toBe "numeric"

      it "returns values that are between the min and max", ->
        foundError = false
        for i in [0 .. 1000]
          val = @distribution.getValue()
          if val < 100 or val > 1000
            foundError = true
            expect(val).toBeGreaterThan 100
            expect(val).toBeLessThan 1000
            break
        expect(foundError).toBeFalsy()

    describe "in a boolean result distribution", ->

      beforeEach ->
        @distribution = new zt.Distribution
          min: 0
          max: 2
          target: 1
          pattern: 'linear'
          type: 'boolean'

      it 'to return boolean results', ->
        expect(typeof @distribution.getValue()).toBe "boolean"