'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import Button from '../Button/Button';
import { CENTERED_PAGE } from '@/shared/constants/styles';

type ErrorBoundaryProps = {
  children: ReactNode;
  title: string;
  buttonText: string;
};

type ErrorBoundaryState = { hasError: boolean };

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Caught an error:', error, info.componentStack);
  }

  handleReload = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={CENTERED_PAGE}>
          <h1 className="font-lexend-exa text-fuchsia-400 font-bold text-2xl dark:text-emerald-500">
            {this.props.title}
          </h1>
          <Button onClick={this.handleReload} className="mt-4">
            {this.props.buttonText}
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
