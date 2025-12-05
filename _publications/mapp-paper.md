---
title: "Mapp: Predictive UI View Pre-Caching for Improving the Responsiveness of Mobile Apps"
collection: publications
permalink: /publication/mapp-paper
date: 2025-07-02
venue: '2025 IEEE/ACM 33rd International Symposium on Quality of Service (IWQoS)'
paperurl: 'https://ieeexplore.ieee.org/document/11265768'
citation: 'R. Wang, Z. Herman, M. Brocanelli and X. Wang, "Mapp: Predictive UI View Pre-Caching for Improving the Responsiveness of Mobile Apps," 2025 IEEE/ACM 33rd International Symposium on Quality of Service (IWQoS), Gold Coast, Australia, 2025, pp. 1-10, doi: 10.1109/IWQoS65803.2025.11265768.'
---

[Download PDF](/files/MAPP.pdf) | [Download Slides](/files/slides_MAPP.pdf)

When mobile apps are used extensively in our daily lives, their responsiveness has become an important factor that can negatively impact the user experience. The long response time of a mobile app can be caused by a variety of reasons, including soft hang bugs or prolonged user interface APIs (UIAPIs). While hang bugs have been researched extensively before, our investigation on UI-APIs in today's mobile OS finds that the recursive construction of UI view hierarchy often can be time-consuming, due to the complexity of today's UI views. To accelerate UI processing, such complex views can be preprocessed and cached before the user even visits them. However, pre-caching every view in a mobile app is infeasible due to the incurred overheads on time, energy, and cache space. In this paper, we propose MAPP, a framework for Mobile App Predictive Pre-caching. MAPP has two main modules, 1) UI view prediction based on deep learning and 2) UI-API pre-caching, which coordinate to improve the responsiveness of mobile apps. MAPP adopts a per-user and per-app prediction model that is tailored based on the analysis of collected user traces, such as location, time, or the sequence of previously visited views. A dynamic feature ranking and model selection algorithm is designed to judiciously filter out less relevant features for improving the prediction accuracy with less computation overhead. MAPP is evaluated with 61 real-world traces from 18 volunteers over 30 days to show that it can shorten the response time of mobile apps by 59.84 % on average with an average cache hit rate of 92.55 %.

## Recommended Citation

R. Wang, Z. Herman, M. Brocanelli and X. Wang, "Mapp: Predictive UI View Pre-Caching for Improving the Responsiveness of Mobile Apps," 2025 IEEE/ACM 33rd International Symposium on Quality of Service (IWQoS), Gold Coast, Australia, 2025, pp. 1-10, doi: 10.1109/IWQoS65803.2025.11265768.