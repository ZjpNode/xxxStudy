<html>
  <head>
    <title>{{ content.title }}</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <div class="news-view view">
        <h1>{{ content.title }}</h1>
        <div class="item">
            {{ helper.shtml(content.content) }}
        </div>
    </div>
  </body>
</html>