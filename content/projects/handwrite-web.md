---
title: "Handwrite Web"
description: "Fitting Handwrite in a web app."
ShowReadingTime: false
author: [""]
disableHLJS: false
tags:
    [
        "project",
        "python",
        "open source",
        "computer vision",
        "react",
        "docker",
        "backend",
        "API",
    ]
cover:
    image: "https://raw.githubusercontent.com/builtree/assets/handwrite/logo_white_background.svg"
    alt: "Handwrite Logo"
    relative: false
---

We built Handwrite as a CLI App initially [(Read More)](/projects/handwrite.md). It was great but a little hard to explain and use through just a CLI app. I also had to show a software project in college so we decided to take this up. I connected with my friend Kartik who was interested in Frontend development and he was in. He built the initial web app while me and Saksham worked on the server.

Building the server was very tricky, since we were making calls to some C libraries, we couldn't just host a Python server. We needed a complete linux environment for which Docker was perfect. But this didn't solve all the problems. Below are the problems (which I remember) one by one:

1. Separating font creation service from the API (which is why we needed a Queue) and figure out how to decrease the number of API calls and keep things as concurrent as possible (since C calls were considerably slow).
2. Maintaining a Queue and track each image's progress, we initially though of using Redis Q but it seemed like an overkill so we implemented a custom and simple background service.
3. Fixing a hard to find memory leak; We are using Heroku's free tier which offers 512MB RAM and we were filling it in just 50 requests. There was some serious memory leak, and we went from blaming OpenCV to exploring inner working of Python Libraries to checking Gunicorn to finally banging our heads over a stupid easy fix. We had no memory leak now, things were sorted.

Building the web app wasn't that tough, Kartik helped a lot and I also got my hands dirty with React and JS and learnt a lot.

{{< figure align=center src="/images/handwrite-web.png" width="90%" caption="Handwrite Web">}}

---

{{< rawhtml >}}

<fieldset>
  <legend>Links</legend>
  <ul>
    <li><b>GitHub (Frontend)</b>: <a href="https://github.com/builtree/handwrite-web"><code>builtree/handwrite-web</code></a></li>
    <li><b>GitHub (Backend)</b>: <a href="https://github.com/builtree/handwrite-server"><code>builtree/handwrite-server</code></a></li>
    <li><b>Docs</b>: <a href="https://builtree.org/handwrite"><code>Handwrite Docs</code></a></li>
    <li><b>Thanks</b>: Saksham, Kartik and other amazing OSS contributors!</li>
    <li><b>Live</b>: <a href="https://builtree.org/handwrite-web"><code>Live Website</code></a></li>
  </ul>
</fieldset>

{{< /rawhtml >}}
