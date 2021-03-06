# video-player.js

Библиотека для добавления видео на ваши веб-сайты.

Видео плеер имеет следующие функции:  
            1. Кнопка play/pause  
            2. Счетчик прошедшего времени  
            3. Временная шкала видео  
            4. Индикатор длительность видео  
            5. Кнопка mute  
            6. Шкала громкости  
            7. Выбор скорости  
            8. Выбор качества видео  
            9. Кнопка скачивания  
            10. Кнопка вывода на полный экран  
 


[Посмотреть на работу плеера](https://anmisttt.github.io/video-player.js/)


## Как использовать

Чтобы воспользоваться библиотекой, нужно выполнить всего лишь 3 шага

#### 1 - Скачать файлы скрипта и стилей

Загрузите [script.min.js](https://github.com/anmisttt/video-player.js/blob/bea0457a07bb159e14eec9399052a7c2de033b12/dist/script.min.js) и вставьте в теге `script` у себя на странице.

```html
<script src="path/script.min.js"></script>
```

Загрузите [style.min.css](https://github.com/anmisttt/video-player.js/blob/bea0457a07bb159e14eec9399052a7c2de033b12/dist/style.min.css) и вставьте в теге `link` у себя на странице.

```html
<link href="path/style.min.css" rel="stylesheet"/>
```


#### 2 - Добавить на страницу тег video

Для работы библиотеки достаточно разместить на странице тег video с классом `video-player`. После этого скрипт найдет ваш видео блок, обернет в контейнер и добавит панель управления.


```html
<video class='video-player' id='video-player' poster="images/dune.jpg" width="700">
            <source src="videos/720/dune.mp4" type="video/mp4"></source>
            <source src="videos/720/dune.webm" type="video/webm"></source>
            <source src="videos/720/dune.ogg" type="video/ogg"></source>
            <source src="videos/360/dune.mp4" type="video/mp4"></source>
            <source src="videos/360/dune.webm" type="video/webm"></source>
            <source src="videos/360/dune.ogg" type="video/ogg"></source>
 </video>
```

Внутри `video` следует разместить теги `source` с указанием всех видео-файлов, которые планируется использовать в плеере. Для каждого видео должен быть указан путь к файлу в атрибуте `src` и тип файла в атрибуте `type`. 
Обратите внимание, что для правильной работы переключения между видео разного качества, их следует разместить в подпапках, соответствующих разрешению данного видео:

```
someFolder/
  360/
    firstVideo.mp4
    firstVideo.webm
    firstVideo.ogg
  720/
    firstVideo.mp4
    firstVideo.webm
    firstVideo.ogg
  1080/
    firstVideo.mp4
    firstVideo.webm
    firstVideo.ogg
```

Как видно из примера, в названии видео качество указывать необязательно (название в принципе может быть любым).


Так как в разных браузерах осуществляется поддержка разных типов видео, желательно указать для каждого разрешения видео трех типов:

```
  video/mp4
  video/webm
  video/ogg
```

#### 3 - Установить атрибуты

Вы можете добавить к вашему видео следующие атрибуты:

`poster` - URL-адрес, указывающий на изображение, которое будет использовано, пока загружается видео или пока пользователь не нажмёт на кнопку воспроизведения. Если этот атрибут не указан, ничего не отображается до тех пор, пока не будет доступен первый кадр.  
`width` - Ширина области отображения видео в пикселях.  
`height` - Высота области отображения видео в пикселях.  
`loop` - Логический атрибут. Если указан, то по окончанию проигрывания, видео автоматически начнёт воспроизведение с начала.  
`muted` - Логический атрибут, который определяет значение по умолчания для аудио дорожки, содержащейся в видео. Если атрибут указан, то аудио дорожка воспроизводиться не будет. Значение атрибута по умолчанию - "ложь", и это означает, что звук будет воспроизводиться, когда видео воспроизводится.  
 
 Пример добавления всех атрибутов:

```html
<video class='video-player' id='video-player' poster="images/dune.jpg" width="700" height="1000" loop muted>
```
# Приятного просмотра!
