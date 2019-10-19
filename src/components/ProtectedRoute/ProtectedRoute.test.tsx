import React, { ReactNode } from 'react';
import { useLocation, Route } from 'react-router-dom';
import { ProtectedRoute, ProtectedRouteProps } from './ProtectedRoute';
import { renderWithRouter } from '../../../test-utils/renderWithRouter';
import { Fakes } from '../../../test-utils/Fakes';

const TestRoutes = ({
  protectedRoute,
  failurePath
}: {
  protectedRoute: ReactNode;
  failurePath: string;
}) => (
  <>
    {protectedRoute}
    <Route exact path={failurePath}>
      <LocationDisplay />
    </Route>
  </>
);

const LocationDisplay = () => <div>{useLocation().pathname}</div>;

describe('<ProtectedRoute>', () => {
  let props: ProtectedRouteProps;
  let route: string;

  beforeEach(() => {
    props = {
      isAllowed: Fakes.boolean(),
      failurePath: Fakes.route(),
      exact: true
    };

    route = Fakes.route();
  });

  test('allowed', () => {
    const protectedRoute = (
      <ProtectedRoute {...props} exact path={route} isAllowed>
        <LocationDisplay />
      </ProtectedRoute>
    );

    const { getByText } = renderWithRouter(
      <TestRoutes
        protectedRoute={protectedRoute}
        failurePath={props.failurePath}
      />,
      { route }
    );

    expect(getByText(route)).toBeDefined();
  });

  test('not allowed', () => {
    const protectedRoute = (
      <ProtectedRoute {...props} exact path={route} isAllowed={false}>
        <LocationDisplay />
      </ProtectedRoute>
    );

    const { getByText } = renderWithRouter(
      <TestRoutes
        protectedRoute={protectedRoute}
        failurePath={props.failurePath}
      />,
      { route }
    );

    expect(getByText(props.failurePath)).toBeDefined();
  });
});
