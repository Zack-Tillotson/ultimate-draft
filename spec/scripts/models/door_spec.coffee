define ['/assets/scripts/namespace.js', '/assets/scripts/models/distribution.js', '/assets/scripts/models/door.js'], (zt, Door) ->
  describe "zt.Door", ->

    describe "in a standard initial state", ->

      beforeEach ->
        @door = new zt.Door()

      it "has correct starting reward", ->
        expect(@door.reward).toBe 0

      it "has correct starting state", ->
        expect(@door.status).toBe 'unopened'

      it "has the expected success odds", ->
        expect(@door.success_odds).toBe 1

      it "has the expected success or not boolean", ->
        expect(@door.is_success).toBe true

      it "should react correctly to being opened", ->
        expect(@door.status).toBe "unopened"
        @door.open()
        expect(@door.status).toBe "success"