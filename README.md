# Сайт бронировния отелей "Toxin"
___
## Файловая стркутура проекта

```
|-- project
    |-- .babelrc
    |-- .gitignore
    |-- package-lock.json
    |-- package.json
    |-- postcss.config.js
    |-- README.md
    |-- webpack.config.js
    |
    |-- dist
    |    |-- css
    |    |-- js
    |    |-- img
    |    |-- fonts
    |   
    |-- src
        |-- components
        |   |-- form-elements
        |       |-- fields
        |
        |-- fonts
        |-- img
        |-- js
        |   |-- index.js
        |
        |-- pug
        |   |-- layout
        |   |-- pages
        |       
        |-- scss
            |-- mixins
```
___
## Установка

1. + #### Скачать проект архивом из репозитория
     ##### или
   + #### колнировать репозиторий
````
  git clone https://github.com/va1eon/metalamp-toxin-website.git
````
2. #### Установть зависимости проекта
````
  npm install
````
___
## Работа с проектом
`npm run start` - запустить сервер для разработки

`npm run dev` - собрать проект в `development` режиме

`npm run build` - собрать проект в `production` режиме