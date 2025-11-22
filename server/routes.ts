import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertModalitySchema,
  insertInstructorSchema,
  insertInstructorModalitySchema,
  insertClientSchema,
  insertClassSchema,
  insertEnrollmentSchema,
  insertAttendanceSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/modalities", async (req, res) => {
    try {
      const modalities = await storage.getModalities();
      res.json(modalities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch modalities" });
    }
  });

  app.get("/api/modalities/:id", async (req, res) => {
    try {
      const modality = await storage.getModality(req.params.id);
      if (!modality) {
        return res.status(404).json({ error: "Modality not found" });
      }
      res.json(modality);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch modality" });
    }
  });

  app.post("/api/modalities", async (req, res) => {
    try {
      const data = insertModalitySchema.parse(req.body);
      const modality = await storage.createModality(data);
      res.status(201).json(modality);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.put("/api/modalities/:id", async (req, res) => {
    try {
      const data = insertModalitySchema.partial().parse(req.body);
      const modality = await storage.updateModality(req.params.id, data);
      if (!modality) {
        return res.status(404).json({ error: "Modality not found" });
      }
      res.json(modality);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/modalities/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteModality(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Modality not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete modality" });
    }
  });

  app.get("/api/instructors", async (req, res) => {
    try {
      const instructors = await storage.getInstructors();
      res.json(instructors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch instructors" });
    }
  });

  app.get("/api/instructors/:id", async (req, res) => {
    try {
      const instructor = await storage.getInstructor(req.params.id);
      if (!instructor) {
        return res.status(404).json({ error: "Instructor not found" });
      }
      res.json(instructor);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch instructor" });
    }
  });

  app.get("/api/instructors/:id/modalities", async (req, res) => {
    try {
      const modalities = await storage.getInstructorModalities(req.params.id);
      res.json(modalities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch instructor modalities" });
    }
  });

  app.get("/api/instructors-modalities-map", async (req, res) => {
    try {
      const map = await storage.getAllInstructorModalitiesMap();
      res.json(map);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch instructor modalities map" });
    }
  });

  app.post("/api/instructors", async (req, res) => {
    try {
      const data = insertInstructorSchema.parse(req.body);
      const instructor = await storage.createInstructor(data);
      res.status(201).json(instructor);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.put("/api/instructors/:id", async (req, res) => {
    try {
      const data = insertInstructorSchema.partial().parse(req.body);
      const instructor = await storage.updateInstructor(req.params.id, data);
      if (!instructor) {
        return res.status(404).json({ error: "Instructor not found" });
      }
      res.json(instructor);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/instructors/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteInstructor(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Instructor not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete instructor" });
    }
  });

  app.post("/api/instructor-modalities", async (req, res) => {
    try {
      const data = insertInstructorModalitySchema.parse(req.body);
      const instructorModality = await storage.addInstructorModality(data);
      res.status(201).json(instructorModality);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/instructor-modalities", async (req, res) => {
    try {
      const { instructorId, modalityId } = req.body;
      if (!instructorId || !modalityId) {
        return res.status(400).json({ error: "instructorId and modalityId are required" });
      }
      const deleted = await storage.removeInstructorModality(instructorId, modalityId);
      if (!deleted) {
        return res.status(404).json({ error: "Association not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to remove association" });
    }
  });

  app.get("/api/clients", async (req, res) => {
    try {
      const clients = await storage.getClients();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch clients" });
    }
  });

  app.get("/api/clients/:id", async (req, res) => {
    try {
      const client = await storage.getClient(req.params.id);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch client" });
    }
  });

  app.post("/api/clients", async (req, res) => {
    try {
      const data = insertClientSchema.parse(req.body);
      const client = await storage.createClient(data);
      res.status(201).json(client);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.put("/api/clients/:id", async (req, res) => {
    try {
      const data = insertClientSchema.partial().parse(req.body);
      const client = await storage.updateClient(req.params.id, data);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/clients/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteClient(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete client" });
    }
  });

  app.get("/api/classes", async (req, res) => {
    try {
      const classes = await storage.getClasses();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch classes" });
    }
  });

  app.get("/api/classes/:id", async (req, res) => {
    try {
      const classData = await storage.getClass(req.params.id);
      if (!classData) {
        return res.status(404).json({ error: "Class not found" });
      }
      res.json(classData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch class" });
    }
  });

  app.post("/api/classes", async (req, res) => {
    try {
      const data = insertClassSchema.parse(req.body);
      const classData = await storage.createClass(data);
      res.status(201).json(classData);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.put("/api/classes/:id", async (req, res) => {
    try {
      const data = insertClassSchema.partial().parse(req.body);
      const classData = await storage.updateClass(req.params.id, data);
      if (!classData) {
        return res.status(404).json({ error: "Class not found" });
      }
      res.json(classData);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/classes/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteClass(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Class not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete class" });
    }
  });

  app.get("/api/enrollments", async (req, res) => {
    try {
      const classId = req.query.classId as string | undefined;
      const enrollments = await storage.getEnrollments(classId);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch enrollments" });
    }
  });

  app.post("/api/enrollments", async (req, res) => {
    try {
      const data = insertEnrollmentSchema.parse(req.body);
      const enrollment = await storage.createEnrollment(data);
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/enrollments/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteEnrollment(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Enrollment not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete enrollment" });
    }
  });

  app.get("/api/attendances", async (req, res) => {
    try {
      const classId = req.query.classId as string | undefined;
      const clientId = req.query.clientId as string | undefined;
      const date = req.query.date ? new Date(req.query.date as string) : undefined;
      const attendances = await storage.getAttendances(classId, clientId, date);
      res.json(attendances);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch attendances" });
    }
  });

  app.post("/api/attendances", async (req, res) => {
    try {
      const data = insertAttendanceSchema.parse(req.body);
      const attendance = await storage.createAttendance(data);
      res.status(201).json(attendance);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.put("/api/attendances/:id", async (req, res) => {
    try {
      const { present } = req.body;
      if (typeof present !== "boolean") {
        return res.status(400).json({ error: "present must be a boolean" });
      }
      const attendance = await storage.updateAttendance(req.params.id, present);
      if (!attendance) {
        return res.status(404).json({ error: "Attendance not found" });
      }
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: "Failed to update attendance" });
    }
  });

  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
