---
permalink: /
title: "Run Wang - Welcome to my academic website!"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I am a Ph.D. student in Computer Science at Clemson University, with a focus on Computer Vision and Trustworthy AI. I am passionate about exploring novel algorithms for 3D Vision and building trustworthy AI for Autonomous Vehicles.

Before joining Clemson University, I earned my Master’s degree from Carnegie Mellon University and my Bachelor’s degree from Rensselaer Polytechnic Institute. In both programs, I worked on research projects involving computer vision, system optimization, and AI-based engineering applications.

Research Interests
======
* 3D Vision
* Generative Model
* AI Security for Autonomous Vehicles

Recent Highlights
======
* Become a PhD student at Clemson University (Co-advised by Dr. Siyu Huang ([website](https://siyuhuang.github.io/)) and Dr. Mert D. Pesé ([website](https://mpese.com/)))

{% assign publications = site.data.publications.publications %}
{% for pub in publications %}
{% if pub.featured %}* **{{ pub.title }}**, published in {{ pub.venue_short }}, {{ pub.month }} {{ pub.year }}{% if pub.note %} ({{ pub.note }}){% endif %}
{% endif %}
{% endfor %}

{% include visitor-map.html %}

Get in touch!
======
Feel free to connect if you are interested in my work or would like to collaborate.  
You can reach me at **wangr654@gmail.com** or check out my [GitHub](https://github.com/RunWang123).


---
