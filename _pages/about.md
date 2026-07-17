---
permalink: /
title: ""
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<div class="academic-home" markdown="1">

<section class="academic-hero">
  <p class="academic-eyebrow">Computer Science Ph.D. Student · Clemson University</p>
  <h1>Building reliable perception and intelligent systems for the real world.</h1>
  <p class="academic-hero__summary">I work across 3D computer vision, AI security, and mobile/edge computing, with a focus on trustworthy autonomous-driving systems and efficient ML systems.</p>
  <div class="academic-actions">
    <a class="academic-button academic-button--primary" href="{{ site.baseurl }}/publications/">View publications</a>
    <a class="academic-button academic-button--secondary" href="{{ site.baseurl }}/files/CV_RW.pdf" target="_blank" rel="noopener">Download CV</a>
  </div>
</section>

## Research Areas

<div class="academic-topics" aria-label="Research areas">
  <span>3D Computer Vision</span>
  <span>AI Security</span>
  <span>Autonomous Driving</span>
  <span>Mobile &amp; Edge Computing</span>
</div>

## Featured Research

<div class="featured-grid">
{% assign featured_pubs = site.data.publications.publications | where: "featured", true | sort: "date" | reverse %}
{% for pub in featured_pubs limit: 5 %}
  <article class="featured-paper">
    <div class="featured-paper__meta"><span>{{ pub.venue_short | default: pub.venue }}</span><span>{{ pub.year }}</span></div>
    <h3>{% if pub.url and pub.url != "" %}<a href="{{ pub.url }}" target="_blank" rel="noopener">{{ pub.title }}</a>{% else %}{{ pub.title }}{% endif %}</h3>
    <p>{% assign styled_authors = pub.authors | replace: "Run Wang", "<strong>Run Wang</strong>" %}{{ styled_authors }}</p>
    {% if pub.acceptance_rate and pub.acceptance_rate != "" %}<p class="featured-paper__note">Acceptance rate: {{ pub.acceptance_rate }}</p>{% endif %}
  </article>
{% endfor %}
</div>

<p class="academic-section-link"><a href="{{ site.baseurl }}/publications/">Browse all publications <span aria-hidden="true">→</span></a></p>

## Recent News

<div class="news-list">
{% assign highlights = site.data.highlights.highlights | sort: "timestamp" | reverse %}
{% for highlight in highlights limit: 6 %}
{% if highlight.type == "news" %}
  <div class="news-item"><time datetime="{{ highlight.timestamp }}">{{ highlight.timestamp | date: "%b. %Y" }}</time><p>{{ highlight.title }}{% if highlight.description and highlight.description != "" %} — {{ highlight.description }}{% endif %}</p></div>
{% elsif highlight.type == "publication" %}
{% assign publications = site.data.publications.publications %}
{% for pub in publications %}{% if pub.id == highlight.publication_id %}{% unless pub.status == "preprint" %}
  <div class="news-item"><time datetime="{{ highlight.timestamp }}">{{ highlight.timestamp | date: "%b. %Y" }}</time><p><strong>{{ pub.venue_short }}</strong> — {{ pub.title }}</p></div>
{% endunless %}{% endif %}{% endfor %}
{% endif %}
{% endfor %}
</div>

## Education

<div class="academic-edu">
  <div class="academic-edu__item">
    <div><strong>Clemson University</strong><span>Ph.D. in Computer Science</span></div><time>Aug. 2025 – Present</time>
  </div>
  <div class="academic-edu__item">
    <div><strong>Carnegie Mellon University</strong><span>M.S. in Electrical and Computer Engineering</span></div><time>Sep. 2021 – May 2023</time>
  </div>
  <div class="academic-edu__item">
    <div><strong>Rensselaer Polytechnic Institute</strong><span>B.S. in Computer &amp; Systems Engineering</span></div><time>Sep. 2017 – May 2021</time>
  </div>
</div>

<section class="academic-collaboration">
  <div>
    <p class="academic-eyebrow">Collaboration</p>
    <h2>Interested in working together?</h2>
    <p>I welcome collaborations in autonomous-driving perception, trustworthy AI, and mobile/edge intelligence.</p>
  </div>
  <a class="academic-button academic-button--primary" href="mailto:runw@clemson.edu">Email me</a>
</section>

<details class="visitor-disclosure">
  <summary>Global visitors</summary>
  {% include visitor-map.html %}
</details>

</div>
