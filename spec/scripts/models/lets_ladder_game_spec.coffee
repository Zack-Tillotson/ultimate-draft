define [
  '/assets/scripts/namespace.js'
  '/assets/scripts/models/door.js'
  '/assets/scripts/models/score_state.js'
  '/assets/scripts/models/lets_ladder_game.js'
], (zt, Door, ScoreState, LetsLadderGame) ->

  describe "zt.LetsLadderGame", ->

    describe "in a standard initial state", ->

      beforeEach ->
        @game_state = new zt.LetsLadderGame()

      it "has correct starting values", ->
        expect(@game_state.score_state).not.toBe null
        expect(@game_state.doors).toBeTruthy()
        expect(@game_state.doors.length).toBe @game_state.door_count

      it "has a sensible success distribution", ->
        dist = @game_state.getCurrentSuccessDistribution()
        expect(typeof dist.getValue()).toBe "number"

      it "has a sensible random success distribution", ->
        dist = @game_state.getRandomCurrentSuccessDistribution()
        expect(typeof dist.getValue()).toBe "boolean"

      it "has a sensible reward distribution", ->
        val = @game_state.getCurrentRewardDistribution().getValue()
        expect(typeof val).toBe "number"

      it "has a sensible reset doors cost", ->
        val = @game_state.getCurrentResetDoorsCost()
        expect(typeof val).toBe "number"
        expect(val).toBeGreaterThan 0