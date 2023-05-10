
const request = require('request');
const cheerio = require('cheerio');

exports.getNews = (req, res, next) => {
  request('https://www.naver.com', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const newsHeadlines = [];

      // 원하는 HTML 요소를 선택하여 정보 추출
      $('.hdline_news .hdline_article_tit a').each((i, el) => {
        const headline = $(el).text();
        const url = $(el).attr('href');

        // 추출한 정보를 배열에 추가
        newsHeadlines.push({ headline, url });
      });

      // 결과 반환
      res.json(newsHeadlines);
    } else {
      next(error);
    }
  });
};
