import express from 'express';
import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', service: 'asimov-service', timestamp: new Date().toISOString() });
};
