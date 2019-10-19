import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { ContainerProps } from '../src/components/types/ContainerProps';
import { Fakes } from './Fakes';

export const renderWithRouter = (
  component: React.ReactElement,
  {
    route = Fakes.route(),
    history = createMemoryHistory({ initialEntries: [route] })
  }: { route?: string; history?: MemoryHistory }
) => {
  const Wrapper = ({ children }: ContainerProps) => (
    <Router history={history}>{children}</Router>
  );

  return {
    ...render(component, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
};
