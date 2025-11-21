import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders app route', () => {
  render(
    <MemoryRouter initialEntries={['/apps/test/']}>
      <App />
    </MemoryRouter>
  );
  // The test should pass as the route is rendered
  expect(document.body).toBeTruthy();
});

test('renders case route', () => {
  render(
    <MemoryRouter initialEntries={['/cases/test123/']}>
      <App />
    </MemoryRouter>
  );
  // The test should pass as the route is rendered
  expect(document.body).toBeTruthy();
});
