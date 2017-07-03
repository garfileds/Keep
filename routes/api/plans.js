/**
 * Created by adoug on 2017/5/18.
 */

var express = require('express')
var router = express.Router()

var mock_all = {
  commit_id: 'adaf',
  plans: [{
    "id": "p001",
    "title": "背单词：A-Z",
    "bg_image": "",
    "color": "#A7ED84",
    "progress_color": "#ffffff",
    "progress": {
      "start_day": "05/17/2017",
      "days": 14,
      "marked": [1, 3, 5, 7, 9, 14],
      "done": []
    },
    "status": "ing",

    "badge": {
      "id": "b001",
      "image_url": ""
    }
  }, {
    "id": "p002",
    "title": "线性代数 第6讲",
    "bg_image": "",
    "color": "#9EEFC5",
    "progress_color": "#ffffff",
    "progress": {
      "start_day": "05/26/2017",
      "days": 7,
      "marked": [1, 2, 4, 7],
      "done": [1, 2]
    },
    "status": "ing",

    "badge": {
      "id": "b001",
      "image_url": ""
    }
  }, {
    "id": "p003",
    "title": "概率论",
    "bg_image": "",
    "color": "#66DDAA",
    "progress_color": "#ffffff",
    "progress": {
      "start_day": "05/20/2017",
      "days": 21,
      "marked": [1, 3, 5, 7, 9, 14],
      "done": [1, 3, 5, 7, 9, 14]
    },
    "status": "done",

    "badge": {
      "id": "b001",
      "image_url": ""
    }
}]
}

var mock_ing = []

var mock_done = []

var mock_syn = {
  code: 'not synchronized',
  commit_id: 'adfa',
  plans: [{
    "id": "p008",
    "title": "深度学习",
    "bg_image": "",
    "color": "#A7ED84",
    "progress_color": "#ffffff",
    "progress": {
      "start_day": "05/17/2017",
      "days": 14,
      "marked": [1, 3, 5, 7, 9, 14],
      "done": []
    },
    "status": "ing",

    "badge": {
      "id": "b001",
      "image_url": ""
    }
  }]
}

/* GET plans */
router.get('/', function(req, res, next) {
  var planStatu = req.query.statu || 'all';

  if (planStatu === 'all') {
    setTimeout(() => {
      next(res.json(mock_all))
    }, 2000)
  } else if (planStatu === 'ing') {
    res.json(mock_ing)
  } else if (planStatu === 'done') {
    res.json(mock_done)
  }
})

/* POST plans */
router.post('/', function (req, res) {
  res.json(mock_syn)
})

module.exports = router

