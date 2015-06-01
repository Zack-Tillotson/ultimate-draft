define ['/assets/scripts/namespace.js', '/assets/scripts/models/score_state.js'], (zt, ScoreState) ->
  describe "zt.ScoreState", ->

    describe "in a standard initial state", ->

      beforeEach ->
        @state = new zt.ScoreState()

      it "has correct starting level", ->
        expect(@state.level).toBe(1)

      it "has correct starting money", ->
        expect(@state.money).toBe(0)

      it "has correct starting strikes", ->
        expect(@state.strikes).toBe(0)

      it "has correct starting max strikes", ->
        expect(@state.max_strikes).toBe(3)

      it "can be given more money", ->
        @state.increaseMoney(42)
        expect(@state.money).toBe(42)
        @state.increaseMoney(15)
        expect(@state.money).toBe(57)

      it "can be given a strike", ->
        @state.addStrike()
        expect(@state.strikes).toBe(1)
        @state.addStrike()
        expect(@state.strikes).toBe(2)

    describe "when passed a non default initial state", ->
      beforeEach ->
        @state = new zt.ScoreState
          level: 7
          money: 42
          strikes: 3
          max_strikes: 4

      it "has correct level", ->
        expect(@state.level).toBe(7)

      it "has correct money", ->
        expect(@state.money).toBe(42)

      it "has correct strikes", ->
        expect(@state.strikes).toBe(3)

      it "has correct max strikes", ->
        expect(@state.max_strikes).toBe(4)

    describe "when changing levels", ->
      beforeEach ->
        @state = new zt.ScoreState
          level: 12
          money: 42
          strikes: 2
          max_strikes: 3

      it "can be promoted to the next level", ->
        expect(@state.level).toBe(12)
        expect(@state.strikes).toBe(2)
        @state.increaseLevel()
        expect(@state.level).toBe(13)
        expect(@state.strikes).toBe(0)

      it "falls down a level when given their last strike", ->
        expect(@state.money).toBe(42)
        expect(@state.level).toBe(12)
        expect(@state.strikes).toBe(2)
        @state.addStrike()
        expect(@state.money).toBe(0)
        expect(@state.level).toBe(11)
        expect(@state.strikes).toBe(0)