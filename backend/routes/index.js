
var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Rudiment = mongoose.model('Rudiment');
const PracticeSession = mongoose.model('PracticeSession');
const Metronome = mongoose.model('Metronome');
const Drummer = mongoose.model('Drummer');
const User = mongoose.model("User");
const jwt = require("express-jwt");

const auth = jwt({ secret: process.env.DRUM_BACKEND_SECRET });

router.get("/API/rudiments/", (req, res, next) => {
  Rudiment.find((err, rudiments) => {
    if (err) {
      return next(err);
    }
    res.json(rudiments);
  });
});

router.post("/API/rudiments/", auth, (req, res, next) => {
  const rudiment = new Rudiment(req.body);
  rudiment.save((err, rud) => {
    if (err) {
      return next(err);
    }
    res.json(rud);
  });
});

router.post("/API/drummer/:drummer/practiceSessions", auth, (req, res, next) => {
  const practiceSession = new PracticeSession(req.body);
  Rudiment.findById(req.body.rudiment, (err, rud) => {
    if (err) {
      return next(err);
    }
    practiceSession.rudiment = rud;
    practiceSession.save((err, ps) => {
      if (err) {
        return next(err);
      }
      req.drummer.practiceSessions.push(ps);
      req.drummer.save((err, dru) => {
        if (err) {
          return next(err);
        }
        res.json(ps);
      });
    });
  });
});

router.delete("/API/practiceSession/:practiceSession", auth, (req, res, next) => {
  req.practiceSession.remove(function (err) {
    if (err) {
      return next(err);
    }
    res.json(req.practiceSession);
  })
});

router.get("/API/drummer/:name", auth, (req, res, next) => {
  const query = Drummer.findOne({ name: req.params.name })
    .populate("metronome")
    .populate({ path: "practiceSessions", populate: { path: "rudiment" } });

  query.exec((err, drummer) => {
    if (err) {
      return next(err);
    }
    res.json(drummer);
  });
})

router.post("/API/drummers/", auth, (req, res, next) => {
  Metronome.create(req.body.metronome, (err, met) => {
    if (err) {
      return next(err);
    }

    PracticeSession.create(req.body.practiceSessions, (err, ps) => {
      if (err) {
        return next(err);
      }
      const drummer = new Drummer({ name: req.body.name });
      drummer.metronome = met;
      drummer.practiceSessions = ps;
      drummer.save((err, dru) => {
        if (err) {
          Metronome.remove({ _id: drummer.metronome });
          PracticeSession.remove({ _id: { $in: drummer.practiceSessions } });
          return next(err);
        }
        res.json(dru);
      })
    });
  });
});

router.put("/API/metronome/:metronome", auth, (req, res, next) => {
  req.metronome.tempo = req.body.tempo;
  req.metronome.type = req.body.type;
  req.metronome.save((err, metronome) => {
    if (err) {
      return next(err);
    }
    res.json(metronome);
  });
});

router.param('drummer', function (req, res, next, id) {
  const query = Drummer.findById(id)
    .populate("metronome")
    .populate({ path: "practiceSessions", populate: { path: "rudiment" } });
  query.exec(function (err, drummer) {
    if (err) {
      return next(err);
    }
    if (!drummer) {
      return next(new Error(`Error: no drummer found with id ${id}`));
    }
    req.drummer = drummer;
    return next();
  })
});

router.param('metronome', function (req, res, next, id) {
  const query = Metronome.findById(id);
  query.exec((err, metronome) => {
    if (err) {
      return next(err)
    }
    if (!metronome) {
      return next(new Error(`not found: ${req.params.id}`));
    }
    req.metronome = metronome;
    return next();
  })
});

router.param('practiceSession', function (req, res, next, id) {
  const query = PracticeSession.findById(id);
  query.exec((err, ps) => {
    if (err) {
      return next(err)
    }
    if (!ps) {
      return next(new Error(`not found: ${req.params.id}`));
    }
    req.practiceSession = ps;
    return next();
  })
});

module.exports = router;
