const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');
const openai = require('openai');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

//------------------------------------------------//

app.get('/crawl', (req, res) => {
  const crawlerProcess = spawn('python3', ['crawling.py']);
  console.log("크롤링 파이썬 실행됨")
  crawlerProcess.stdout.on('data', (data) => {
    // 크롤링 결과를 콘솔 출력
    console.log(data.toString());
  });
  crawlerProcess.stderr.on('data', (data) => {
    // 크롤링 중 발생한 오류를 콘솔 출력
    console.error(data.toString());
  });
  crawlerProcess.on('close', (code) => {
    if (code === 0) {
      console.log('crawler.py 실행이 완료되었습니다.');
      // 크롤링이 완료되면 기사 내용을 가져와서 요약 진행
      const summarizerProcess = spawn('python3', ['gpt_summarize.py']);
      console.log("요약 파이썬 실행됨");

      let articles = []; // 기사 내용을 저장할 배열

      summarizerProcess.stdout.on('data', (data) => {
        // 요약 결과를 콘솔 출력
        const summary = data.toString().trim();
        console.log('요약 결과:', summary);
        articles.push(summary);
      });

      summarizerProcess.stderr.on('data', (data) => {
        // 요약 중 발생한 오류를 콘솔 출력
        console.error(data.toString());
      });

      summarizerProcess.on('close', (code) => {
        if (code === 0) {
          console.log('summarizer.py 실행이 완료되었습니다.');
          console.log('articles:', articles); // 기사 내용 확인
          res.send('Summarization completed successfully.');
        } else {
          console.error('summarizer.py 실행 중 오류가 발생했습니다.');
          res.status(500).send('An error occurred during summarization.');
        }

        // articles 변수 초기화
        articles = [];

        // 추가 작업을 수행할 수도 있습니다.

      });
    } else {
      console.error('crawler.py 실행 중 오류가 발생했습니다.');
      res.status(500).send('An error occurred during crawling.');
    }
  });
});

const port = 1000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
