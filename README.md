<div align="center">
  <h2>Azure Fundamentals Exam Questions</h2>
  <br />
</div>

This is a web application built with Next.js, TypeScript, Cosmos DB, GraphQL and Tailwind CSS. The application is a quiz
that tests your knowledge of Azure fundamentals, specifically for the AZ-900 certification exam. The questions are
stored in a Cosmos DB database and retrieved using GraphQL queries.

This project was created for learning purposes to help me understand Microsoft Azure and Cosmos DB in preparation for
the AZ-900 exam.

<div align="center">
<br />

[![Project license](https://img.shields.io/github/license/eduardconstantin/azure-fundamentals?style=flat-square)](LICENSE)
[![Contributors](https://img.shields.io/github/contributors/eduardconstantin/azure-fundamentals?style=flat-square)](https://github.com/eduardconstantin/azure-fundamentals/graphs/contributors)
[![Issue](https://img.shields.io/github/issues/eduardconstantin/azure-fundamentals?style=flat-square)](https://github.com/eduardconstantin/azure-fundamentals/issues)
[![PRs](https://img.shields.io/github/issues-pr/eduardconstantin/azure-fundamentals?style=flat-square)](https://github.com/eduardconstantin/azure-fundamentals/pulls)
[![Stars](https://img.shields.io/github/stars/eduardconstantin/azure-fundamentals?style=flat-square)](https://github.com/eduardconstantin/azure-fundamentals/stargazers)

</div>

## Features

- Over 400 questions scrapped from this
  [repo](https://github.com/Ditectrev/Microsoft-Azure-AZ-900-Microsoft-Azure-Fundamentals-Exam-Questions-Answers).
- Correct answer displayed for each question
- Vercel OG image generation used to display the question

## Getting Started

Clone the repository:

```bash
git clone https://github.com/eduardconstantin/azure-fundamentals.git
```

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

Because I only have a Free Tier accoun for Cosmos DB, the database won't be available for local development. Instead I
created a json file with some dummy data.

## Contributing

I welcome feedback and contributions from other developers, which can help improve the quality of the code and the
application overall.

Please create an issue or a pull request with your changes.

For a full list of all authors and contributors, see
[the contributors page](https://github.com/eduardconstantin/azure-fundamentals/contributors).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
