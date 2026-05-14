import { RateLimiterMemory } from 'rate-limiter-flexible';
import { type Request, type Response, type NextFunction } from 'express';

// Limit to 5 requests per 15 minutes for specific actions
const loginRateLimiter = new RateLimiterMemory({
  points: 5, 
  duration: 15 * 60, // 15 minutes
});

export const loginLimiter = (req: Request, res: Response, next: NextFunction) => {
  loginRateLimiter.consume(req.ip!)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({ 
        success: false, 
        message: 'Too many login attempts. Please try again in 15 minutes.' 
      });
    });
};

// General API Rate Limiter
const apiRateLimiter = new RateLimiterMemory({
  points: 20, 
  duration: 60, // 20 requests per minute
});

export const apiLimiter = (req: Request, res: Response, next: NextFunction) => {
  apiRateLimiter.consume(req.ip!)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({ 
        success: false, 
        message: 'API rate limit exceeded. Slow down.' 
      });
    });
};
