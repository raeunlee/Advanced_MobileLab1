import openai
import configparser
from crawling import news_contents

news_summary = []

# .config 파일에서 API 키를 읽어오는 함수
def get_api_key():
    config = configparser.ConfigParser()
    config.read('.config')
    return config['OPENAI']['API_KEY']


# 기사 내용을 요약하는 함수
def summarize_article(dump):
    api_key = get_api_key()
    openai.api_key = api_key
    
    # ChatGPT API를 사용하여 요약 생성
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=dump,
        max_tokens=4000,
        n=1,
        stop=None,
        temperature=0.3,
        #model=model_id
    )

    summary = response.choices[0].text.strip()
    return summary

if __name__ == "__main__":
    # crawler.py에서 저장한 기사 내용을 읽어옴
    # 각 기사 내용을 요약
    
    for news_content in news_contents:
        print("summerazie")
        summary = summarize_article(news_content)
        news_summary.append(summary)
        # 요약 결과 처리 로직 추가

print("\n기사 요약\n")
print(news_summary)
