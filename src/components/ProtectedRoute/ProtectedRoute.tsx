import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ContainerProps } from '../types/ContainerProps';

export type ProtectedRouteProps = RouteProps &
  ContainerProps & {
    isAllowed: boolean;
    failurePath: string;
  };

export const ProtectedRoute = ({
  isAllowed,
  failurePath,
  children,
  ...routeProps
}: ProtectedRouteProps) => (
  <>
    {isAllowed ? (
      <Route {...routeProps}>{children}</Route>
    ) : (
      <Redirect to={failurePath} />
    )}
  </>
);
