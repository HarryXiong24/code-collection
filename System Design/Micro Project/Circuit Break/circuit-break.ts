type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

class CircuitBreaker {
  private state: CircuitState;
  private failureCount = 0;
  private nextAttemptTime = 0; // what time can recover

  // config
  private maxFailures: number;
  private resetTimeout: number;

  constructor(maxFailures: number, resetTimeout: number) {
    this.maxFailures = maxFailures;
    this.resetTimeout = resetTimeout;
    this.state = 'CLOSED';
  }

  async execute<T>(action: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN' && Date.now() >= this.nextAttemptTime) {
      this.state = 'HALF_OPEN';
    }

    if (this.state == 'OPEN') {
      throw new Error();
    }

    try {
      const result = await action();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.state = 'CLOSED';
    this.failureCount = 0;
  }

  private onFailure() {
    this.failureCount++;
    if (this.state === 'HALF_OPEN' || this.failureCount >= this.maxFailures) {
      this.state = 'OPEN';
      this.nextAttemptTime = Date.now() + this.resetTimeout;
    }
  }
}
