class Device {
  constructor(
    public id: number,
    public name: string,
    public ipAddress: string,
    public manufacturerType: string,
    public online: boolean,
    public attributes?: Record<string, any>
  ) {}
}

export default Device;
