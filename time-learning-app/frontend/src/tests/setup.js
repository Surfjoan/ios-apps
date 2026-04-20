import '@testing-library/jest-dom'

// SVG imports are handled by moduleNameMapper in jest.config.js

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react')
  return {
    motion: {
      div: React.forwardRef(({ children, ...props }, ref) => React.createElement('div', { ...props, ref }, children)),
      span: React.forwardRef(({ children, ...props }, ref) => React.createElement('span', { ...props, ref }, children)),
      h1: React.forwardRef(({ children, ...props }, ref) => React.createElement('h1', { ...props, ref }, children)),
      h2: React.forwardRef(({ children, ...props }, ref) => React.createElement('h2', { ...props, ref }, children)),
      h3: React.forwardRef(({ children, ...props }, ref) => React.createElement('h3', { ...props, ref }, children)),
      p: React.forwardRef(({ children, ...props }, ref) => React.createElement('p', { ...props, ref }, children)),
      button: React.forwardRef(({ children, ...props }, ref) => React.createElement('button', { ...props, ref }, children)),
    },
    AnimatePresence: ({ children }) => children,
  }
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})


// Global test utilities
global.testUtils = {
  clearLocalStorage: () => {
    localStorageMock.clear()
    jest.clearAllMocks()
  },
  mockLocalStorage: (data) => {
    localStorageMock.getItem.mockImplementation((key) => data[key] || null)
  },
}
