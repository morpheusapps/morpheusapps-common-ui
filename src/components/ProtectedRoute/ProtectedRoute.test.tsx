import React, { ReactNode } from 'react';
import { useLocation, Route } from 'react-router-dom';
import { ProtectedRoute, ProtectedRouteProps } from './ProtectedRoute';
import { Fakes } from '../../../test-utils/Fakes';
import { renderWithRouter } from '../../../test-utils/renderWithRouter';

const TestRoutes = ({
  protectedRoute,
  failurePath,
  failureText
}: {
  protectedRoute: ReactNode;
  failurePath: string;
  failureText: string;
}) => (
  <>
    {protectedRoute}
    <Route exact path={failurePath}>
      {failureText}
    </Route>
  </>
);

const LocationDisplay = () => <div>{useLocation().pathname}</div>;

describe('<ProtectedRoute>', () => {
  let props: ProtectedRouteProps;
  let route: string;
  let failureText: string;

  beforeEach(() => {
    props = {
      isAllowed: Fakes.boolean(),
      failurePath: Fakes.route(),
      exact: true
    };

    route = Fakes.route();
    failureText = Fakes.string();
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
        failureText={failureText}
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
        failureText={failureText}
      />,
      { route }
    );

    expect(getByText(failureText)).toBeDefined();
  });
});
