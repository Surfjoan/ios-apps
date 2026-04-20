# iOS Development Guidelines

## General Principles

Before starting any iOS development task, follow these core principles:

- **Use absolute paths** from BASE_DIR
- **Follow conventional commits**: `type(scope): description`
- **Create focused PRs** with clear descriptions
- **Document changes** in relevant files

## iOS Development

### Swift Guidelines
- **Use** Swift 5.0+ features appropriately
- **Follow** Swift style guide and naming conventions
- **Use** SwiftUI for new UI components
- **Implement** proper error handling with Result types

### Architecture Patterns
- **Use** MVVM pattern for SwiftUI apps
- **Implement** proper dependency injection
- **Use** Combine for reactive programming
- **Follow** SOLID principles

### Testing
- **Write unit tests** for business logic
- **Implement UI tests** for critical user flows
- **Use** mock objects for external dependencies
- **Achieve** minimum 80% code coverage

### Build and Deployment
- **Use** Xcode build configurations
- **Implement** proper CI/CD pipeline
- **Use** Fastlane for automation
- **Test** on multiple iOS versions and devices

## Security

### Data Protection
- **Never** commit API keys or secrets
- **Use** Keychain for sensitive data
- **Implement** proper data encryption
- **Follow** App Transport Security requirements

### Authentication
- **Use** biometric authentication when available
- **Implement** proper session management
- **Use** OAuth 2.0 for third-party authentication
- **Never** store passwords in plain text

## Performance

### Memory Management
- **Use** ARC properly and avoid retain cycles
- **Optimize** image loading and caching
- **Implement** lazy loading for large datasets
- **Monitor** memory usage with Instruments

### Battery Optimization
- **Minimize** background processing
- **Use** efficient networking patterns
- **Implement** proper lifecycle management
- **Test** battery impact with Energy Log

## Testing Guidelines

### Always Use Xcode Test Targets
- **NEVER** skip testing for critical features
- **ALWAYS** run tests before committing
- **Use** CI/CD pipeline for automated testing

### Examples
```bash
# CORRECT: Use Xcode test targets
xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 14'

# FORBIDDEN: Skip testing
git commit -m "feat: new feature"  # without testing
```
