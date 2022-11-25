import { parse, Root, Type } from 'protobufjs';
import * as koinosPbToProto from '@roamin/koinos-pb-to-proto';
import { ProtoDescriptor } from '@roamin/koinos-pb-to-proto';
import { utils } from 'koilib';

export interface ContractMeta {
  abi: any | null;
  root: Root | null;
  protos: ProtoDescriptor[] | null;
}

export function fetchContractMeta(abi: string): ContractMeta {
  const parseProtos = (protos: ProtoDescriptor[]): Root => {
    const root = new Root();
    for (const proto of protos) {
      try {
        parse(proto.definition, root, { keepCase: true });
      } catch (e) {
        //
      }
    }
    return root;
  };

  try {
    const parsedAbi = JSON.parse(abi);
    const protos = koinosPbToProto.convert(parsedAbi.types);
    const root = parseProtos(protos);
    return {
      abi: parsedAbi,
      root,
      protos,
    };
  } catch (e) {
    return {
      abi: null,
      root: null,
      protos: null,
    };
  }
}

export function normalize(type: Type, decoded: any): any {
  const normalized: any = {};
  for (const name of Object.keys(type.fields)) {
    const field = type.fields[name];

    if (field.type !== 'bytes' || !field.options) {
      normalized[field.name] = decoded[field.name];
      continue;
    }

    switch (field.options['(koinos.btype)']) {
      case 'BASE58':
      case 'CONTRACT_ID':
      case 'ADDRESS':
        normalized[field.name] = utils.encodeBase58(decoded[field.name]);
        break;
      case 'BASE64':
        normalized[field.name] = utils.encodeBase64url(decoded[field.name]);
        break;
      case 'HEX':
      case 'BLOCK_ID':
      case 'TRANSACTION_ID':
        normalized[field.name] = `0x${utils.toHexString(decoded[field.name])}`;
        break;
      default:
        normalized[field.name] = decoded[field.name];
    }
  }
  return normalized;
}

export const decodeArgs = (
  entryPoint: number,
  args: string,
  abi: any,
  root: Root
) => {
  const method = findEntryPoint(entryPoint, abi);

  if (!method) {
    return null;
  }

  const type = root.lookupType(abi.methods[method].argument);
  const buffer = utils.decodeBase64url(args);
  const decoded = type.toObject(type.decode(buffer), {
    defaults: true,
    arrays: true,
    bytes: Array,
    longs: String,
    enums: String,
  });

  const normalized = normalize(type, decoded);

  return JSON.stringify(normalized, null, 2);
};

export const findEntryPoint = (entryPoint: number | string, abi: any) => {
  for (const method of Object.keys(abi.methods)) {
    if (
      (typeof entryPoint === 'number' &&
        abi.methods[method]['entry-point'] ===
          `0x${entryPoint.toString(16)}`) ||
      (typeof entryPoint === 'string' &&
        abi.methods[method]['entry-point'] === entryPoint)
    ) {
      return method;
    }
  }

  return null;
};

export const findEntryPointByTypes = (possibleTypes: string[], abi: any) => {
  for (const method of Object.keys(abi.methods)) {
    if (possibleTypes.find((possibleType) => possibleType.includes(method))) {
      return abi.methods[method]['entry-point'];
    }
  }

  return null;
};

export const potentialTypes = (eventName: string) => [
  eventName,
  `${eventName.split('.')[1]}_event`,
  `${eventName.replace('.', '_')}_event`,
];
