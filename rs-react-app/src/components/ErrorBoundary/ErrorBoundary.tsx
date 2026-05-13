import { Component, type ErrorInfo, type ReactNode } from 'react';
import Button from '../Button/Button';

type ErrorBoundaryProps = { children: ReactNode };
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
        <div className="flex flex-col gap-y-6 justify-center items-center h-100">
          <h1 className="font-lexend-exa text-fuchsia-400 font-bold text-2xl">
            Something went wrong...
          </h1>
          <Button onClick={this.handleReload}>Go back</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
