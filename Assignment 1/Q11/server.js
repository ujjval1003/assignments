const express = require('express');
const app = express();

const liveScores = [
  {
    homeTeam: 'India',
    awayTeam: 'Australia',
    status: 'Live',
    score: 'India: 150/3 (15 overs) - Australia: 130/4 (15 overs)',
    venue: 'Wankhede Stadium, Mumbai'
  },
  {
    homeTeam: 'England',
    awayTeam: 'South Africa',
    status: 'Live',
    score: 'England: 200/5 (18 overs) - South Africa: 190/6 (18 overs)',
    venue: 'Lord\'s Cricket Ground, London'
  },
  {
    homeTeam: 'Pakistan',
    awayTeam: 'Sri Lanka',
    status: 'Completed',
    score: 'Pakistan: 250/10 (50 overs) - Sri Lanka: 220/9 (50 overs)',
    venue: 'Gaddafi Stadium, Lahore'
  },
];

app.use(express.static('public'));

app.get('/live-scores', (req, res) => {
  res.json(liveScores);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});