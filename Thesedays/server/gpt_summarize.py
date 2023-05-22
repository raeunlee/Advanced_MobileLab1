import openai
import configparser

# .config 파일에서 API 키를 읽어오는 함수
def get_api_key():
    config = configparser.ConfigParser()
    config.read('.config')
    return config['OPENAI']['API_KEY']


# 기사 내용을 요약하는 함수
def summarize_article(article_content):
    api_key = get_api_key()
    openai.api_key = api_key
    
    # ChatGPT API를 사용하여 요약 생성
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=article_content,
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.3,
        #model=model_id
    )

    summary = response.choices[0].text.strip()
    return summary

if __name__ == "__main__":
    # crawler.py에서 저장한 기사 내용을 읽어옴
    articles = []

    # 각 기사 내용을 요약
    for article_content in articles:
        summary = summarize_article(article_content)
        # 요약 결과 처리 로직 추가
