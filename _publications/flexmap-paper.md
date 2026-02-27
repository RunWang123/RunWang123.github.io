---
title: "FlexMap: Generalized HD Map Construction from Flexible Camera Configurations"
collection: publications
permalink: /publication/flexmap-paper
date: 2026-01-29
venue: 'arXiv preprint arXiv:2601.22376'
paperurl: 'https://arxiv.org/abs/2601.22376'
citation: 'R. Wang, C. Zhou, A. Salarpour, X. Liu, Z. Cheng, F. Luo, M. D. Pesé, and S. Huang, "FlexMap: Generalized HD Map Construction from Flexible Camera Configurations," arXiv preprint arXiv:2601.22376, 2026.'
---

[Download PDF](https://arxiv.org/pdf/2601.22376) | [View on arXiv](https://arxiv.org/abs/2601.22376)

High-definition (HD) maps provide essential semantic information of road structures for autonomous driving systems, yet current HD map construction methods require calibrated multi-camera setups and either implicit or explicit 2D-to-BEV transformations, making them fragile when sensors fail or camera configurations vary across vehicle fleets. We introduce FlexMap, unlike prior methods that are fixed to a specific N-camera rig, our approach adapts to variable camera configurations without any architectural changes or per-configuration retraining. Our key innovation eliminates explicit geometric projections by using a geometry-aware foundation model with cross-frame attention to implicitly encode 3D scene understanding in feature space. FlexMap features two core components: a spatial-temporal enhancement module that separates cross-view spatial reasoning from temporal dynamics, and a camera-aware decoder with latent camera tokens, enabling view-adaptive attention without the need for projection matrices. Experiments demonstrate that FlexMap outperforms existing methods across multiple configurations while maintaining robustness to missing views and sensor variations, enabling more practical real-world deployment.

## Recommended Citation

R. Wang, C. Zhou, A. Salarpour, X. Liu, Z. Cheng, F. Luo, M. D. Pesé, and S. Huang, "FlexMap: Generalized HD Map Construction from Flexible Camera Configurations," arXiv preprint arXiv:2601.22376, 2026.
