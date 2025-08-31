# Infios Documentation Chatbot

June 2025 - September 2025

Relevant Skills: Python, Docker, Kubernetes, Natural Language Processing

Over the course of 12 weeks, I had the opportunity to work on developing a chatbot to help make some of the internal platforms within Infios easier to understand and work with. The goal of this project was to find a way to parse through all of the documentation related to a specific platform and serve it as context along with a prompt to [OpenAi's GPT models](https://platform.openai.com/docs/models). 

The first step of this project was to parse through all of the documentation related to the platform, which was written in [Markdown](https://www.markdownguide.org/). By following the [basic Markdown syntax](https://www.markdownguide.org/basic-syntax/), a document based chunking method was implemented based on the header level of the various sections of the Markdown files. This helped ensure that the structure of the documents were preserved when turning the documents into chunks. This also helped establish a parent child relationship between the chunks, which allowed for us know which document and parent header the child chunks came from. After all the chunks were created, they were turned into embeddings and stored in a Postgres database. 

The point of turning these chunks into embeddings was to have a fast way of comparing any user prompts to any part of the documentation. Every time the user would ask the chatbot with a question about the platform, their query would be turned into an embedding and compared to the embeddings in the Postgres database. If the user query embeddings had a high enough similarity score, which was found using cosine similarity, to any of our chunk embeddings, then we would take the top five chunks to use as context to the model. 

The chatbot was monitored using [Langfuse](https://langfuse.com/). Where each part of the prompting process could monitored and checked to make sure there were no problems. Here we could see if the user prompt was not violating any internal rules, the similarity between it and other chunk embeddings, and whether or not it was better to consider the previous context of the chat history or to treat this as a new question.

For testing, the chatbot was hosted using [Docker](https://hub.docker.com/) images and containers on [Docker compose](https://docs.docker.com/compose/). For deployment, the chatbot's Docker containers were hosted on the [Oracle Cloud Infrastructure (OCI)](https://www.oracle.com/cloud/) registry and the chatbot itself was hosted on a Kubernetes cluster. The chatbot was set up and managed on the cluster using [Helm](https://helm.sh/) charts.