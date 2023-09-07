import * as express from 'express';
import cors = require('cors');
import { Request, Response } from 'express';
import Device from './models/Device';
export function createServer() {
  const app = express();
  app.use(cors());

  app.get('/', (req: express.Request, res: express.Response) => {
    res.send({ greeting: 'Hello' });
  });
  let factories: { [key: string]: Device[] } = {};
  factories = {
    Burlington: [
      {
        id: 101,
        name: 'Printer 1',
        ipAddress: '192.168.3.5',
        manufacturerType: 'Vida',
        online: true,
      },
      {
        id: 102,
        name: 'Printer 2',
        ipAddress: '192.168.3.6',
        manufacturerType: 'Ender V3',
        online: true,
      },
      {
        id: 103,
        name: 'Printer 3',
        ipAddress: '192.168.3.7',
        manufacturerType: 'Vida',
        online: false,
      },
      {
        id: 104,
        name: 'Furn 1',
        ipAddress: '192.168.3.8',
        manufacturerType: 'Combi',
        attributes: [
          {
            maxTemp: '1000C',
          },
        ],
        online: true,
      },
      {
        id: 105,
        name: 'QC 1',
        ipAddress: '192.168.3.9',
        manufacturerType: 'Rapid',
        attributes: [
          {
            Capacity: '2 trays',
          },
        ],
        online: true,
      },
    ],
    Wilmington: [
      {
        id: 201,
        name: 'Printer 1',
        ipAddress: '192.168.3.5',
        manufacturerType: 'Vida',
        online: false,
      },
    ],
  };

  app.get('/device', (req: Request, res: Response) => {
    const allDevices: Device[] = [];
    Object.values(factories).forEach((devices) => {
      allDevices.push(...devices);
    });
    res.json(allDevices);
  });

  app.get('/device/:id', (req: Request, res: Response) => {
    const deviceId = req.params.id;
    for (const factoryDevices of Object.values(factories)) {
      let device: Device;
      factoryDevices.forEach((fDevice) => {
        if (fDevice.id === parseInt(deviceId)) device = fDevice;
      });
      if (device) {
        return res.json(device);
      }
    }
    res.status(404).json({ error: 'Device not found' });
  });

  app.post('/device', (req: Request, res: Response) => {
    const { factoryId, name, ipAddress, manufacturerType, online, attributes } =
      req.body;

    // Validate uniqueness of IP address within a factory
    if (!factories[factoryId]) {
      factories[factoryId] = [];
    }
    const isIpUnique = factories[factoryId].every(
      (device) => device.ipAddress !== ipAddress
    );
    if (!isIpUnique) {
      return res
        .status(400)
        .json({ error: 'IP Address must be unique per factory' });
    }

    const deviceId = parseInt(String(Math.random())); // Generate a random ID (not suitable for production)
    const device = new Device(
      deviceId,
      name,
      ipAddress,
      manufacturerType,
      online,
      attributes
    );
    factories[factoryId].push(device);

    res.status(201).json(device);
  });

  app.delete('/device/:id', (req: Request, res: Response) => {
    const deviceId = req.params.id;
    for (const factoryDevices of Object.values(factories)) {
      const index = factoryDevices.findIndex(
        (d) => d.id === parseInt(deviceId)
      );
      if (index !== -1) {
        factoryDevices.splice(index, 1);
        return res.status(204).send();
      }
    }
    res.status(404).json({ error: 'Device not found' });
  });

  app.put('/device/:id', (req: Request, res: Response) => {
    const deviceId = req.params.id;
    const { name, ipAddress, manufacturerType, online, attributes } = req.body;

    for (const factoryDevices of Object.values(factories)) {
      const device = factoryDevices.find((d) => d.id === parseInt(deviceId));
      if (device) {
        // Update device properties
        device.name = name;
        device.ipAddress = ipAddress;
        device.manufacturerType = manufacturerType;
        device.online = online;
        device.attributes = attributes;

        return res.json(device);
      }
    }

    res.status(404).json({ error: 'Device not found' });
  });
  return app;
}
