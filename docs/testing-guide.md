# Testing Guide for Church API

This guide explains how to effectively use the testing utilities in the church API project.

## Testing Setup

The project uses Vitest as the test runner with a comprehensive set of testing utilities for creating test data and assertions.

## Basic Testing Pattern

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { Factory } from '../../../test';
import { YourUseCase } from './your-usecase';
import { YourRepository } from '../your-repository';

describe('YourUseCase', () => {
  let repository: YourRepository;
  let sut: YourUseCase;

  beforeEach(() => {
    repository = new YourRepository();
    sut = new YourUseCase(repository);
  });

  it('should perform expected action', async () => {
    // 1. Arrange - prepare test data
    const testData = Factory.yourEntityFactory();
    
    // 2. Act - call the method being tested
    const result = await sut.execute(testData);
    
    // 3. Assert - verify the results
    expect(result).toEqual(expect.objectContaining({
      id: expect.any(Number),
      // other properties
    }));
  });
});
```

## Using Factories

Factories help generate test data quickly and easily:

```typescript
// Generate a member with random data
const member = Factory.member();

// Override specific fields
const memberWithEmail = Factory.member({ email: 'specific@example.com' });

// Create multiple instances
const members = Factory.helpers.createMany(Factory.member, 5);

// Using helpers
const futureDate = Factory.helpers.futureDate(10); // 10 days in future
const randomNumber = Factory.helpers.number(1, 100);
```

## Test Helpers

Various helper functions are available:

```typescript
// Creating test objects
const testObject = createTestObject({ key: 'value', count: 5 });

// Creating random IDs
const id = createTestId();
```

## Mocking

For mocks and spies, use Vitest's built-in functions:

```typescript
// Method spy
const spy = vi.spyOn(object, 'method');

// Mock function
const mockFn = vi.fn().mockReturnValue('value');

// Mock module
vi.mock('module-name', () => {
  return {
    functionName: vi.fn().mockReturnValue('mocked-value')
  };
});
```

## Best Practices

1. **Each test should be independent** - Don't rely on state from other tests
2. **Follow AAA pattern** - Arrange, Act, Assert
3. **Test the behavior, not the implementation** - Focus on inputs and outputs
4. **Keep tests simple and focused** - Test one thing per test
5. **Use descriptive test names** - Should describe what is being tested

## Sample Test Cases

### Testing Success Cases
Test the happy path where everything works as expected.

### Testing Error Cases
Test how the system handles errors and edge cases.

### Testing Side Effects
Verify that methods like repositories are called with expected parameters.
