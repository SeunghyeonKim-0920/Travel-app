\# Project Agent Instructions



\## Workflow



Use OpenSpec for all non-trivial changes.



For every feature, refactor, bug fix, or multi-step coding task:



1\. Explore first

&#x20;  - Understand the existing files, structure, and requirements.

&#x20;  - Do not implement immediately if requirements are unclear.



2\. Propose

&#x20;  - Create or update an OpenSpec change.

&#x20;  - Define purpose, scope, acceptance criteria, implementation plan, and verification plan.



3\. Apply

&#x20;  - Implement only the agreed tasks.

&#x20;  - Avoid unrelated rewrites.

&#x20;  - Preserve useful existing code and UI behavior.



4\. Verify

&#x20;  - Check that all requirements are satisfied.

&#x20;  - Test the app manually when automated tests are not available.

&#x20;  - Check that HTML, CSS, and JavaScript still work together.



5\. Archive

&#x20;  - Archive completed OpenSpec changes only after verification passes.



\## Quality rules



\- Do not fabricate requirements, results, or test outcomes.

\- Ask for clarification when the requested behavior is ambiguous.

\- Keep code readable and consistent with the existing project.

\- Do not remove existing functionality unless explicitly requested.

\- Before finishing, confirm what changed and how it was checked.





\## Approval rule



When the user asks for /opsx:propose, create only the proposal.

Do not modify source files, do not run apply, and do not continue automatically.

Wait for the user's explicit approval before any implementation.

