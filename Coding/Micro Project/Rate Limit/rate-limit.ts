class TokenBucket {
  private capacity: number;
  private tokens: number;
  private lastRefillTimestamp: number;
  private refillRate: number; // 每毫秒生成的令牌数

  constructor(capacity: number, ratePerSecond: number) {
    this.capacity = capacity;
    this.refillRate = ratePerSecond;
    this.lastRefillTimestamp = new Date().valueOf();
    this.refillRate = ratePerSecond / 1000;
    this.tokens = capacity;
  }

  // 尝试获取一个令牌
  allowRequest(): boolean {
    // 根据当前时间，计算从上次填充到现在应该新生成多少令牌
    const nowTime = new Date().valueOf();
    const newTokens = (nowTime - this.lastRefillTimestamp) * this.refillRate;

    // 更新令牌总数（不能超过 capacity）
    this.tokens = Math.min(this.capacity, this.tokens + newTokens);

    // 更新 lastRefillTimestamp
    this.lastRefillTimestamp = nowTime;

    // 3. 判断令牌是否足够，足够则减 1 并返回 true，否则返回 false
    if (this.tokens >= 1) {
      this.tokens = this.tokens - 1;
      return true;
    }

    return false;
  }
}
