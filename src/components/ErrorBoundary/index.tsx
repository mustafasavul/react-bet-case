import { Component, ErrorInfo, ReactNode } from 'react';
import s from './index.module.scss';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={s.errorBoundary}>
          <div className={s.errorContainer}>
            <h1 className={s.errorTitle}>Oops! Bir şeyler ters gitti.</h1>
            <p className={s.errorSubTitle}>
              Beklenmedik bir hata oluştu. Sayfayı yenileyerek tekrar deneyebilirsiniz.
            </p>
            {this.state.error && (
              <details className={s.errorDetails}>
                <summary>Hata Detayları</summary>
                <div className={s.errorDetailsBox}>
                  <pre>{this.state.error.message}</pre>
                </div>
              </details>
            )}
            <button className={s.reloadButton} onClick={this.handleReset}>
              Sayfayı Yenile
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
