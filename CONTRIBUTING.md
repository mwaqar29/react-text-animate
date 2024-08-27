# Contributing

Thanks for your interest in contributing to `react-text-animate` library. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check if you are using the latest version of the project. See if updating fixes your issue first. Then check for open issues and pull requests to see if someone else is working on something similar.

## 📜 Code of Conduct

Please review our [Code of Conduct](https://github.com/mwaqar29/react-text-animate/blob/main/CODE_OF_CONDUCT.md). It is in effect at all times. We expect it to be honored by everyone who contributes to this project.

## 🫳 Ways to Contribute

To improve and grow the project, we need your help! Here are some ways to get involved:

| Activity              | Ideas                                                          |
| --------------------- | -------------------------------------------------------------- |
| 🐛 Open an Issue      | Find unhandled exceptions and bugs in the codebase.            |
| 📄 Documentation      | Write documentation for the project.                           |
| 🧩 Feature Requests   | Brainstorm new ideas and suggest them to us.                   |
| 🛠️ Code Contributions | Contribute to the codebase and submit a pull request.          |
| 🔢 Code Readability   | Find ways to make code more readable and easier to understand. |
| 🤔 Other              | Anything else you can think of!                                |

These are just a few examples, and we welcome any other ideas you may have!

## 🧑‍💻 Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```sh
git clone https://github.com/mwaqar29/react-text-animate.git
```

### Navigate to project directory

```sh
cd react-text-animate
```

### Create a new Branch

```sh
git checkout -b feature/feature-name
```

### Install dependencies

```sh
npm i
```

### Creating a new component

**Note**: The animated component you create should provide a distinct effect compared to those already available in the library.

Please review the [repository structure](https://github.com/mwaqar29/react-text-animate/blob/main/README.md#-repository-structure) to familiarize yourself before creating folders and files for your component. Go through the code of some of the components to get a better understanding of how the standards are maintained across them.

#### Naming convention

All components follow a specific naming convention, and we expect you to do the same. To create a new component, create a folder `src/components/text-effect-[n]` where `n` is the next number in the series of component folders (e.g. `text-effect-4`).
In it, create an `index.tsx` file (and `index.css` file if needed) and export your component with the name `TextEffect[n-in-words]` (e.g. `TextEffectFour`).
This approach eliminates the need to come up with new and creative names each time, addressing one of the problems below 😉.

> There are only two hard things in Computer Science: cache invalidation and _naming things_. — Phil Karlton.

Make sure to include common props like `wrapperElement`, `className`, `style`, `duration`, `delay` etc. to allow users to customize these aspects. The prop which is used to pass the string/words should be named as `text` to ensure consistency with other components.
Whenever possible, utilize the `useInView()` hook from Framer Motion to detect when a component enters the viewport. This will ensure that the animation triggers as the component scrolls into view.
For any styles that need to be accessible globally, define them in `src/styles.css`.
Finally, export your component from the `src/index.ts` file to ensure it's available for users importing the package.

#### Using & Testing the component

To test its functionality, you've to build the project & generate a compressed file of the `dist/` folder.
For that, you can run following the commands:

```sh
npm run clean:build; npm pack
```

This is a combination of two commands. First one is an npm script which does the followng:

- Cleans the `dist/` folder and the old compressed version of it (if any).
- Builds the project

Second one, is used to compress the `dist/` folder. It will generate a file in the root directory which will be named something like `react-text-animate-1.0.0.tgz`.

Fix any errors thrown by the command in the terminal.

Now all we need to do is install the `react-text-animate-1.0.0.tgz` file in a react application. For that, you need to run the `npm i` command along with the path to the compressed package. For example, your command may look something like this:

```sh
npm i "/Users/MyUsername/Projects/react-text-animate/react-text-animate-1.0.0.tgz"
```

Now you can simply import your component from `react-text-animate` package in your react application and test it.

For more info on this, check out the [Usage](https://github.com/mwaqar29/react-text-animate/blob/main/README.md#-usage) section.

> [!TIP]
> To streamline the process of testing your component during development and with each change, start by creating and testing it directly within your React application. Once you've completed development, you can then follow the outlined steps to finalize everything.

To uninstall it in the future, you can run the command:

```sh
npm un react-text-animate
```

## 📥 Commit Convention

Before you create a Pull Request, please check whether your commits comply with the commit conventions used in this repository.
We use commitzen & commitlint which enforces the [conventional commits](https://www.conventionalcommits.org/) standards to standardize the commit messages.

In short, the commits follow the convention `category(scope or module): message`.

Since we're using the Commitizen tool, creating a commit with a message that adheres to the standard is streamlined.
Instead of running `git commit -m "[COMMIT-MSG]"`, just use the command:

```sh
npm run cm
```

You'll then be presented with an interactive terminal where you simply need to follow the prompts to commit your code with a standardized commit message.

## 🔁 Submitting Pull Requests

- **Smaller is better.** Submit **one** PR per bug fix or feature. A PR should contain isolated changes pertaining to a single bug fix or feature implementation. **Do not** refactor or reformat code that is unrelated to your change. It is better to **submit multiple small PRs** rather than a single large one.

- **Prioritize understanding over cleverness.** Write code clearly and concisely. Remember that source code usually gets written once and read often. Ensure the code is clear to the reader. The purpose and logic should be obvious to a reasonably skilled developer, otherwise you should add a comment that explains it.

- **Follow existing coding style and conventions.** Keep your code consistent with the style, formatting, and conventions in the rest of the code base. When possible, these will be enforced with a linter. Consistency makes it easier to review and modify in the future.

- **Add documentation.** Add/update documentation in [README.md](https://github.com/mwaqar29/react-text-animate/blob/main/README.md#component-texteffectone-) file for new/existing components respectively.

- **[Resolve any merge conflicts](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/resolving-a-merge-conflict-on-github)** that occur.

- When writing comments, use properly constructed sentences, including punctuation.

- Use spaces, not tabs.

## :white_check_mark: Code Review

- **Review the code, not the author.** Look for and suggest improvements without disparaging or insulting the author. Provide actionable feedback and explain your reasoning.

- **You are not your code.** When your code is critiqued, questioned, or constructively criticized, remember that you are not your code. Do not take code review personally.

- **Always do your best.** No one writes bugs on purpose. Do your best, and learn from your mistakes.

- Kindly note any violations to the guidelines specified in this document.

## :nail_care: Coding Style

Consistency is the most important. Following the existing style, formatting, and naming conventions of the file you are modifying and of the overall project. Failure to do so will result in a prolonged review process that has to focus on updating the superficial aspects of your code, rather than improving its functionality and performance.

For example, if all private properties are prefixed with an underscore `_`, then new ones you add should be prefixed in the same way. Or, if methods are named using camelcase, like `thisIsMyNewMethod`, then do not diverge from that by writing `this_is_my_new_method`. You get the idea. If in doubt, please ask or search the codebase for something similar.

When possible, style and format will be enforced with a linter.

## 👏 Attribution

Contributors to our project will be acknowledged in the project's [README.md](https://github.com/mwaqar29/react-text-animate/blob/main/README.md#-contributing) file.

## :medal_sports: Certificate of Origin

_Note: All contributions will be licensed under the project's open source license. Check the [LICENSE](https://github.com/mwaqar29/react-text-animate/blob/main/LICENSE) file for more information._

_Developer's Certificate of Origin 1.1_

By making a contribution to this project, I certify that:

> 1. The contribution was created in whole or in part by me and I have the right to submit it under the open source license indicated in the file; or
> 1. The contribution is based upon previous work that, to the best of my knowledge, is covered under an appropriate open source license and I have the right under that license to submit that work with modifications, whether created in whole or in part by me, under the same open source license (unless I am permitted to submit under a different license), as indicated in the file; or
> 1. The contribution was provided directly to me by some other person who certified (1), (2) or (3) and I have not modified it.
> 1. I understand and agree that this project and the contribution are public and that a record of the contribution (including all personal information I submit with it, including my sign-off) is maintained indefinitely and may be redistributed consistent with this project or the open source license(s) involved.

Thank you for your interest in contributing to `react-text-animate` library. We appreciate your help!
