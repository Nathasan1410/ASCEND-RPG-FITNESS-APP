# Contributing

How to contribute to ASCEND development.

## Getting Started

### Prerequisites

| Requirement | Version |
| ----------- | ------- |
| Node.js | 18+ |
| npm | 9+ |
| Git | Latest |

### Setup

```bash
# Clone repository
git clone https://github.com/Nathasan1410/ASCEND-RPG-FITNESS-APP.git
cd ASCEND-RPG-FITNESS-APP

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

## Project Structure

```
ascend-rpg-fitness-app/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/              # Utility functions
├── supabase/         # Supabase setup
├── public/           # Static assets
├── gitbook/          # Documentation
└── types/            # TypeScript types
```

## Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Follow existing code style
- Add TypeScript types
- Write tests for new features
- Update documentation

### 3. Test Changes

```bash
# Run linter
npm run lint

# Run type check
npm run typecheck

# Run tests
npm test
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

### 5. Push & Create PR

```bash
git push origin feature/your-feature-name
```

Create pull request on GitHub.

## Coding Standards

### TypeScript

- Use strict mode
- Define types for all functions
- Avoid `any` type
- Use interfaces for object shapes

### React

- Use functional components
- Use hooks for state
- Follow React best practices
- Keep components small and focused

### Naming Conventions

| Type | Convention | Example |
| ---- | ---------- | ------- |
| Components | PascalCase | `UserProfile.tsx` |
| Functions | camelCase | `generateQuest()` |
| Variables | camelCase | `totalXP` |
| Constants | UPPER_SNAKE_CASE | `MAX_QUESTS` |
| Types | PascalCase | `QuestData` |

## Pull Request Guidelines

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guide
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
```

### Review Process

1. Automated checks (lint, tests)
2. Code review by maintainers
3. Approval required from 1 maintainer
4. Merge into main branch

## Areas to Contribute

| Area | Priority | Description |
| ---- | -------- | ----------- |
| **Features** | High | New quests, classes, gamification |
| **Bug fixes** | High | Fix reported issues |
| **Documentation** | Medium | Improve GitBook |
| **Tests** | Medium | Increase test coverage |
| **UI/UX** | Low | Improve user interface |

## Getting Help

| Resource | Link |
| -------- | ---- |
| Issues | GitHub Issues |
| Discussions | GitHub Discussions |
| Documentation | GitBook |

## License

By contributing, you agree that your contributions will be licensed under the project's license.

---

*Last Updated: February 11, 2026*
