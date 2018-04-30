<html>
  <head>
    <title>CNode topic api</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <div class="news-view view">
      {% for item in list %}
        <div class="item">
          {{helper.relativeTime(item.create_at)}} <a href="/content/{{ item.id }}" target="_blank">{{ item.title }}</a>
        </div>
      {% endfor %}
    </div>
  </body>
</html>