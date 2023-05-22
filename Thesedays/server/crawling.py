import requests
from bs4 import BeautifulSoup
import time

# 기사 내용을 저장할 전역 변수 - DB 자제
articles = []

def crawl_articles():
    url = "https://search.naver.com/search.naver?where=news&sm=tab_jum&query=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    article_groups = soup.select("div.info_group")

    for article_group in article_groups:
        links = article_group.select("a.info")
        if len(links) >= 2:
            article_url = links[1].attrs["href"]
            content = scrape_article(article_url)
            articles.append(content)
            time.sleep(0.3)

def scrape_article(article_url):
    response = requests.get(article_url, headers={'User-agent': 'Mozilla/5.0'})
    soup = BeautifulSoup(response.text, "html.parser")
    content = soup.select_one("#dic_area").text
    return content

if __name__ == "__main__":
    crawl_articles()
