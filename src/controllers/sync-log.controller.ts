import { Request, Response } from "express";
import SyncLog from "../models/SyncLog";

export const getAllSyncLogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const syncLogs = await SyncLog.findAll();
    res.status(200).json(syncLogs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getSyncLogById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const syncLog = await SyncLog.findByPk(id);
    if (syncLog) {
      res.status(200).json(syncLog);
    } else {
      res.status(404).send("Sync Log not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const createSyncLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { organization_application_id, source, type, data } = req.body;
  try {
    const newSyncLog = await SyncLog.create({
      organization_application_id,
      source,
      type,
      data,
    });
    res.status(201).json(newSyncLog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const bulkCreateSyncLogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  const syncLogsData = req.body;
  try {
    const newSyncLogs = await SyncLog.bulkCreate(syncLogsData);
    res.status(201).json(newSyncLogs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateSyncLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { organization_application_id, source, type, data } = req.body;
  try {
    const syncLog = await SyncLog.findByPk(id);
    if (syncLog) {
      syncLog.organization_application_id = organization_application_id;
      syncLog.source = source;
      syncLog.type = type;
      syncLog.data = data;
      await syncLog.save();
      res.status(200).json(syncLog);
    } else {
      res.status(404).send("Sync Log not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteSyncLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const syncLog = await SyncLog.findByPk(id);
    if (syncLog) {
      await syncLog.destroy();
      res.status(204).send();
    } else {
      res.status(404).send("Sync Log not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
