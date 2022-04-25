---
title: "Handwrite CLI"
description: "Trying to solve the handwritten assignment crisis..."
ShowReadingTime: false
author: [""]

disableHLJS: false
tags: ["project", "python", "open source", "computer vision", "fontography"]
cover:
    image: "https://raw.githubusercontent.com/builtree/assets/handwrite/logo_white_background.svg"
    alt: "Handwrite Logo"
    relative: false
    hidden: true
---

{{< figure align=center src="/images/my_writing.png" width="75%" caption="This isn't Handwritten">}}

Our University decided to conduct OBEs (Open Book Examination) during the pandemic, remotely. It was like normal exams, get the question paper, write answers and get marks but the good thing was, it wasn't proctored at all. You had 3+1 hours to finish the exam and upload the answers, and that's it (they didn't care how you did it). Now for a lot of people, this would sound easy-peasy but for us lazy engineers who hadn't handwritten anything for almost a year (due to the pandemic), it was a nightmare. We got through the exams though and during the last exam we thought that this process should be automated, we should be able to type out our handwriting. Eureka!

This lead to a discussion between a couple of my friends and we thought of building an open source and better [Calligraphr](https://www.calligraphr.com/en/). A tool which will convert your handwriting into a font.

So the way Handwrite works is:

1. You print the [form](https://github.com/builtree/handwrite/raw/dev/handwrite_sample.pdf) that we made.

2. Fill out your sample like below.

{{< figure align=center src="https://raw.githubusercontent.com/builtree/assets/handwrite/handwrite_filled_form.jpg" width="50%" caption="Filled Form">}}

3. Give it to the CLI python package and Voila, you got a font!

{{< figure align=center src="https://raw.githubusercontent.com/builtree/assets/handwrite/handwrite_sentence.png" caption="Generated Font in Action">}}

This was basically it, but building it was tough. Really tough. Me and Saksham brainstormed for hours, figured out Potrace and Fontforge libraries (not easy to deal with at all). Researched effective ways to extract out letters, deal with a lot edge cases. But ultimately, we did it, and published it to PyPi.

Not going to explain much since we have documented it quite well, but below images gives a good understanding on what happens to a sample form:

{{< figure align=center src="/images/handwrite_flow_1.png" width="75%" caption="Extracting Letters">}}

{{< figure align=center src="/images/handwrite_flow_2.png" width="75%" caption="Conversion from PNG -> BMP -> SVG -> TTF">}}

I learnt so much building handwrite, few key points:

-   Anything you can imagine building in tech, is possible 99% of the times.
-   Testing is very important, writing unit tests for Handwrite was really helpful in the later stages when we had to do major refactors.
-   You can't always do everything, collaboration is key.
-   Solving problems around you make 10x better projects than regular UI clones. I discuss about Handwrite in every project based interview and interviewers always take so much interest!
-   Handwrite made me so much better at <mark>CI/CD, Test Driven Development, Python Programming and Computer Vision </mark>.

> If you are wondering if it ever worked out for an actual use case? I submitted one assignment using Handwrite and didn't get caught (I doubt whether the teacher even checked), after that didn't have to write yet.

---

{{< rawhtml >}}

<fieldset>
  <legend>Links</legend>
  <ul>
    <li><b>GitHub</b>: <a href="https://github.com/builtree/handwrite"><code>builtree/handwrite</code></a></li>
    <li><b>Docs</b>: <a href="https://builtree.org/handwrite"><code>Handwrite Docs</code></a></li>
    <li><b>Thanks</b>: Saksham, Aryan and other amazing OSS contributors!</li>
    <li><b>Live</b>: <a href="https://builtree.org/handwrite-web"><code>Live Website</code></a></li>
    <li><b>PyPI</b>: <a href="https://pepy.tech/project/handwrite"><figure> <img alt="Total downloads for the project" src="https://pepy.tech/badge/handwrite"> </figure></a> <a href="https://pypi.org/project/handwrite"><figure> <img alt="PyPI version" src="https://img.shields.io/pypi/v/handwrite.svg"> </figure></a></li>
  </ul>
</fieldset>

{{< /rawhtml >}}
