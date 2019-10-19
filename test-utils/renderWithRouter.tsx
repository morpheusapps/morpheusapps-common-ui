import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Fakes } from './Fakes';

export const renderWithRouter = (
  component: React.ReactElement,
  {
    route = Fakes.route(),
    history = createMemoryHistory({ initialEntries: [route] })
  }: { route?: string; history?: MemoryHistory }
) => ({
  ...render(<Router history={history}>{component}</Router>),
  history
});
