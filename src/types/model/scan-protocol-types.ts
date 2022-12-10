export type ScanProtocolType = {
  code: string;
  name: string;
};

export const createProtocol = (data: ScanProtocolType) => {
  return `${data.name}:${data.code}`;
};

export const decodeProtocol = (protocol: string): ScanProtocolType => {
  const array = protocol.split(':');
  return { code: array[1], name: array[0] };
};
