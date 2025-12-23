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
{% assign highlights = site.data.highlights.highlights | sort: "timestamp" | reverse %}
{% for highlight in highlights %}
{% if highlight.type == "news" %}* [{{ highlight.timestamp | date: "%m/%d/%Y" }}] {{ highlight.title }}{% if highlight.description != "" %} ({{ highlight.description }}){% endif %}
{% elsif highlight.type == "publication" %}
{% assign publications = site.data.publications.publications %}
{% for pub in publications %}
{% if pub.id == highlight.publication_id %}* [{{ highlight.timestamp | date: "%m/%d/%Y" }}] **{{ pub.title }}**, accepted to {{ pub.venue_short }}{% if pub.month != "" %}, {{ pub.month }}{% endif %} {{ pub.year }}{% if pub.acceptance_rate != "" %} (Acceptance Rate: {{ pub.acceptance_rate }}){% endif %}{% if pub.note != "" %} ({{ pub.note }}){% endif %}
{% endif %}
{% endfor %}
{% endif %}
{% endfor %}

{% include visitor-map.html %}

Get in touch!
======
Feel free to connect if you are interested in my work or would like to collaborate.  
You can reach me at **wangr654@gmail.com** or check out my [GitHub](https://github.com/RunWang123).


---
