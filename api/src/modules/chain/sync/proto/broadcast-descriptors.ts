export const broadcastDescriptors = {
  nested: {
    koinos: {
      options: {
        go_package: 'github.com/koinos/koinos-proto-golang/koinos',
      },
      nested: {
        broadcast: {
          options: {
            go_package:
              'github.com/koinos/koinos-proto-golang/koinos/broadcast',
          },
          nested: {
            transaction_accepted: {
              fields: {
                transaction: {
                  type: 'protocol.transaction',
                  id: 1,
                },
                receipt: {
                  type: 'protocol.transaction_receipt',
                  id: 2,
                },
                height: {
                  type: 'uint64',
                  id: 3,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
              },
            },
            transaction_failed: {
              fields: {
                id: {
                  type: 'bytes',
                  id: 1,
                  options: {
                    '(btype)': 'TRANSACTION_ID',
                  },
                },
              },
            },
            mempool_accepted: {
              fields: {
                transaction: {
                  type: 'protocol.transaction',
                  id: 1,
                },
                receipt: {
                  type: 'protocol.transaction_receipt',
                  id: 2,
                },
                height: {
                  type: 'uint64',
                  id: 3,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
                pending_rc_used: {
                  type: 'uint64',
                  id: 4,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
              },
            },
            block_accepted: {
              fields: {
                block: {
                  type: 'protocol.block',
                  id: 1,
                },
                receipt: {
                  type: 'protocol.block_receipt',
                  id: 2,
                },
                live: {
                  type: 'bool',
                  id: 3,
                },
              },
            },
            block_irreversible: {
              fields: {
                topology: {
                  type: 'block_topology',
                  id: 1,
                },
              },
            },
            fork_heads: {
              fields: {
                last_irreversible_block: {
                  type: 'block_topology',
                  id: 1,
                },
                heads: {
                  rule: 'repeated',
                  type: 'block_topology',
                  id: 2,
                },
              },
            },
            gossip_status: {
              fields: {
                enabled: {
                  type: 'bool',
                  id: 1,
                },
              },
            },
            event_parcel: {
              oneofs: {
                _transaction_id: {
                  oneof: ['transaction_id'],
                },
              },
              fields: {
                block_id: {
                  type: 'bytes',
                  id: 1,
                  options: {
                    '(btype)': 'BLOCK_ID',
                  },
                },
                height: {
                  type: 'uint64',
                  id: 2,
                },
                transaction_id: {
                  type: 'bytes',
                  id: 3,
                  options: {
                    '(btype)': 'TRANSACTION_ID',
                    proto3_optional: true,
                  },
                },
                event: {
                  type: 'protocol.event_data',
                  id: 4,
                },
              },
            },
          },
        },
        block_topology: {
          fields: {
            id: {
              type: 'bytes',
              id: 1,
              options: {
                '(btype)': 'BLOCK_ID',
              },
            },
            height: {
              type: 'uint64',
              id: 2,
              options: {
                jstype: 'JS_STRING',
              },
            },
            previous: {
              type: 'bytes',
              id: 3,
              options: {
                '(btype)': 'BLOCK_ID',
              },
            },
          },
        },
        bytes_type: {
          values: {
            BASE64: 0,
            BASE58: 1,
            HEX: 2,
            BLOCK_ID: 3,
            TRANSACTION_ID: 4,
            CONTRACT_ID: 5,
            ADDRESS: 6,
          },
        },
        _btype: {
          oneof: ['btype'],
        },
        btype: {
          type: 'bytes_type',
          id: 50000,
          extend: 'google.protobuf.FieldOptions',
          options: {
            proto3_optional: true,
          },
        },
        protocol: {
          options: {
            go_package: 'github.com/koinos/koinos-proto-golang/koinos/protocol',
          },
          nested: {
            event_data: {
              fields: {
                sequence: {
                  type: 'uint32',
                  id: 1,
                },
                source: {
                  type: 'bytes',
                  id: 2,
                  options: {
                    '(btype)': 'CONTRACT_ID',
                  },
                },
                name: {
                  type: 'string',
                  id: 3,
                },
                data: {
                  type: 'bytes',
                  id: 4,
                },
                impacted: {
                  rule: 'repeated',
                  type: 'bytes',
                  id: 5,
                  options: {
                    '(btype)': 'ADDRESS',
                  },
                },
              },
            },
            contract_call_bundle: {
              fields: {
                contract_id: {
                  type: 'bytes',
                  id: 1,
                  options: {
                    '(btype)': 'CONTRACT_ID',
                  },
                },
                entry_point: {
                  type: 'uint32',
                  id: 2,
                },
              },
            },
            system_call_target: {
              oneofs: {
                target: {
                  oneof: ['thunk_id', 'system_call_bundle'],
                },
              },
              fields: {
                thunk_id: {
                  type: 'uint32',
                  id: 1,
                },
                system_call_bundle: {
                  type: 'contract_call_bundle',
                  id: 2,
                },
              },
            },
            upload_contract_operation: {
              fields: {
                contract_id: {
                  type: 'bytes',
                  id: 1,
                  options: {
                    '(btype)': 'CONTRACT_ID',
                  },
                },
                bytecode: {
                  type: 'bytes',
                  id: 2,
                },
                abi: {
                  type: 'string',
                  id: 3,
                },
                authorizes_call_contract: {
                  type: 'bool',
                  id: 4,
                },
                authorizes_transaction_application: {
                  type: 'bool',
                  id: 5,
                },
                authorizes_upload_contract: {
                  type: 'bool',
                  id: 6,
                },
              },
            },
            call_contract_operation: {
              fields: {
                contract_id: {
                  type: 'bytes',
                  id: 1,
                  options: {
                    '(btype)': 'CONTRACT_ID',
                  },
                },
                entry_point: {
                  type: 'uint32',
                  id: 2,
                },
                args: {
                  type: 'bytes',
                  id: 3,
                },
              },
            },
            set_system_call_operation: {
              fields: {
                call_id: {
                  type: 'uint32',
                  id: 1,
                },
                target: {
                  type: 'system_call_target',
                  id: 2,
                },
              },
            },
            set_system_contract_operation: {
              fields: {
                contract_id: {
                  type: 'bytes',
                  id: 1,
                  options: {
                    '(btype)': 'CONTRACT_ID',
                  },
                },
                system_contract: {
                  type: 'bool',
                  id: 2,
                },
              },
            },
            operation: {
              oneofs: {
                op: {
                  oneof: [
                    'upload_contract',
                    'call_contract',
                    'set_system_call',
                    'set_system_contract',
                  ],
                },
              },
              fields: {
                upload_contract: {
                  type: 'upload_contract_operation',
                  id: 1,
                },
                call_contract: {
                  type: 'call_contract_operation',
                  id: 2,
                },
                set_system_call: {
                  type: 'set_system_call_operation',
                  id: 3,
                },
                set_system_contract: {
                  type: 'set_system_contract_operation',
                  id: 4,
                },
              },
            },
            transaction_header: {
              fields: {
                chain_id: {
                  type: 'bytes',
                  id: 1,
                },
                rc_limit: {
                  type: 'uint64',
                  id: 2,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
                nonce: {
                  type: 'bytes',
                  id: 3,
                },
                operation_merkle_root: {
                  type: 'bytes',
                  id: 4,
                },
                payer: {
                  type: 'bytes',
                  id: 5,
                  options: {
                    '(btype)': 'ADDRESS',
                  },
                },
                payee: {
                  type: 'bytes',
                  id: 6,
                  options: {
                    '(btype)': 'ADDRESS',
                  },
                },
              },
            },
            transaction: {
              fields: {
                id: {
                  type: 'bytes',
                  id: 1,
                  options: {
                    '(btype)': 'TRANSACTION_ID',
                  },
                },
                header: {
                  type: 'transaction_header',
                  id: 2,
                },
                operations: {
                  rule: 'repeated',
                  type: 'operation',
                  id: 3,
                },
                signatures: {
                  rule: 'repeated',
                  type: 'bytes',
                  id: 4,
                },
              },
            },
            transaction_receipt: {
              fields: {
                id: {
                  type: 'bytes',
                  id: 1,
                  options: {
                    '(btype)': 'TRANSACTION_ID',
                  },
                },
                payer: {
                  type: 'bytes',
                  id: 2,
                  options: {
                    '(btype)': 'ADDRESS',
                  },
                },
                max_payer_rc: {
                  type: 'uint64',
                  id: 3,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
                rc_limit: {
                  type: 'uint64',
                  id: 4,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
                rc_used: {
                  type: 'uint64',
                  id: 5,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
                disk_storage_used: {
                  type: 'uint64',
                  id: 6,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
                network_bandwidth_used: {
                  type: 'uint64',
                  id: 7,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
                compute_bandwidth_used: {
                  type: 'uint64',
                  id: 8,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
                reverted: {
                  type: 'bool',
                  id: 9,
                },
                events: {
                  rule: 'repeated',
                  type: 'event_data',
                  id: 10,
                },
                logs: {
                  rule: 'repeated',
                  type: 'string',
                  id: 11,
                },
              },
            },
            block_header: {
              fields: {
                previous: {
                  type: 'bytes',
                  id: 1,
                  options: {
                    '(btype)': 'BLOCK_ID',
                  },
                },
                height: {
                  type: 'uint64',
                  id: 2,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
                timestamp: {
                  type: 'uint64',
                  id: 3,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
                previous_state_merkleRoot: {
                  type: 'bytes',
                  id: 4,
                },
                transaction_merkle_root: {
                  type: 'bytes',
                  id: 5,
                },
                signer: {
                  type: 'bytes',
                  id: 6,
                  options: {
                    '(btype)': 'ADDRESS',
                  },
                },
                approved_proposals: {
                  rule: 'repeated',
                  type: 'bytes',
                  id: 7,
                  options: {
                    '(btype)': 'TRANSACTION_ID',
                  },
                },
              },
            },
            block: {
              fields: {
                id: {
                  type: 'bytes',
                  id: 1,
                  options: {
                    '(btype)': 'BLOCK_ID',
                  },
                },
                header: {
                  type: 'block_header',
                  id: 2,
                },
                transactions: {
                  rule: 'repeated',
                  type: 'transaction',
                  id: 3,
                },
                signature: {
                  type: 'bytes',
                  id: 4,
                },
              },
            },
            block_receipt: {
              fields: {
                id: {
                  type: 'bytes',
                  id: 1,
                  options: {
                    '(btype)': 'BLOCK_ID',
                  },
                },
                height: {
                  type: 'uint64',
                  id: 2,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
                disk_storage_used: {
                  type: 'uint64',
                  id: 3,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
                network_bandwidth_used: {
                  type: 'uint64',
                  id: 4,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
                compute_bandwidth_used: {
                  type: 'uint64',
                  id: 5,
                  options: {
                    jstype: 'JS_STRING',
                  },
                },
                state_merkle_root: {
                  type: 'bytes',
                  id: 6,
                },
                events: {
                  rule: 'repeated',
                  type: 'event_data',
                  id: 7,
                },
                transaction_receipts: {
                  rule: 'repeated',
                  type: 'transaction_receipt',
                  id: 8,
                },
                logs: {
                  rule: 'repeated',
                  type: 'string',
                  id: 9,
                },
              },
            },
          },
        },
      },
    },
    google: {
      nested: {
        protobuf: {
          nested: {
            FileDescriptorSet: {
              fields: {
                file: {
                  rule: 'repeated',
                  type: 'FileDescriptorProto',
                  id: 1,
                },
              },
            },
            FileDescriptorProto: {
              fields: {
                name: {
                  type: 'string',
                  id: 1,
                },
                package: {
                  type: 'string',
                  id: 2,
                },
                dependency: {
                  rule: 'repeated',
                  type: 'string',
                  id: 3,
                },
                publicDependency: {
                  rule: 'repeated',
                  type: 'int32',
                  id: 10,
                  options: {
                    packed: false,
                  },
                },
                weakDependency: {
                  rule: 'repeated',
                  type: 'int32',
                  id: 11,
                  options: {
                    packed: false,
                  },
                },
                messageType: {
                  rule: 'repeated',
                  type: 'DescriptorProto',
                  id: 4,
                },
                enumType: {
                  rule: 'repeated',
                  type: 'EnumDescriptorProto',
                  id: 5,
                },
                service: {
                  rule: 'repeated',
                  type: 'ServiceDescriptorProto',
                  id: 6,
                },
                extension: {
                  rule: 'repeated',
                  type: 'FieldDescriptorProto',
                  id: 7,
                },
                options: {
                  type: 'FileOptions',
                  id: 8,
                },
                sourceCodeInfo: {
                  type: 'SourceCodeInfo',
                  id: 9,
                },
                syntax: {
                  type: 'string',
                  id: 12,
                },
              },
            },
            DescriptorProto: {
              fields: {
                name: {
                  type: 'string',
                  id: 1,
                },
                field: {
                  rule: 'repeated',
                  type: 'FieldDescriptorProto',
                  id: 2,
                },
                extension: {
                  rule: 'repeated',
                  type: 'FieldDescriptorProto',
                  id: 6,
                },
                nestedType: {
                  rule: 'repeated',
                  type: 'DescriptorProto',
                  id: 3,
                },
                enumType: {
                  rule: 'repeated',
                  type: 'EnumDescriptorProto',
                  id: 4,
                },
                extensionRange: {
                  rule: 'repeated',
                  type: 'ExtensionRange',
                  id: 5,
                },
                oneofDecl: {
                  rule: 'repeated',
                  type: 'OneofDescriptorProto',
                  id: 8,
                },
                options: {
                  type: 'MessageOptions',
                  id: 7,
                },
                reservedRange: {
                  rule: 'repeated',
                  type: 'ReservedRange',
                  id: 9,
                },
                reservedName: {
                  rule: 'repeated',
                  type: 'string',
                  id: 10,
                },
              },
              nested: {
                ExtensionRange: {
                  fields: {
                    start: {
                      type: 'int32',
                      id: 1,
                    },
                    end: {
                      type: 'int32',
                      id: 2,
                    },
                  },
                },
                ReservedRange: {
                  fields: {
                    start: {
                      type: 'int32',
                      id: 1,
                    },
                    end: {
                      type: 'int32',
                      id: 2,
                    },
                  },
                },
              },
            },
            FieldDescriptorProto: {
              fields: {
                name: {
                  type: 'string',
                  id: 1,
                },
                number: {
                  type: 'int32',
                  id: 3,
                },
                label: {
                  type: 'Label',
                  id: 4,
                },
                type: {
                  type: 'Type',
                  id: 5,
                },
                typeName: {
                  type: 'string',
                  id: 6,
                },
                extendee: {
                  type: 'string',
                  id: 2,
                },
                defaultValue: {
                  type: 'string',
                  id: 7,
                },
                oneofIndex: {
                  type: 'int32',
                  id: 9,
                },
                jsonName: {
                  type: 'string',
                  id: 10,
                },
                options: {
                  type: 'FieldOptions',
                  id: 8,
                },
              },
              nested: {
                Type: {
                  values: {
                    TYPE_DOUBLE: 1,
                    TYPE_FLOAT: 2,
                    TYPE_INT64: 3,
                    TYPE_UINT64: 4,
                    TYPE_INT32: 5,
                    TYPE_FIXED64: 6,
                    TYPE_FIXED32: 7,
                    TYPE_BOOL: 8,
                    TYPE_STRING: 9,
                    TYPE_GROUP: 10,
                    TYPE_MESSAGE: 11,
                    TYPE_BYTES: 12,
                    TYPE_UINT32: 13,
                    TYPE_ENUM: 14,
                    TYPE_SFIXED32: 15,
                    TYPE_SFIXED64: 16,
                    TYPE_SINT32: 17,
                    TYPE_SINT64: 18,
                  },
                },
                Label: {
                  values: {
                    LABEL_OPTIONAL: 1,
                    LABEL_REQUIRED: 2,
                    LABEL_REPEATED: 3,
                  },
                },
              },
            },
            OneofDescriptorProto: {
              fields: {
                name: {
                  type: 'string',
                  id: 1,
                },
                options: {
                  type: 'OneofOptions',
                  id: 2,
                },
              },
            },
            EnumDescriptorProto: {
              fields: {
                name: {
                  type: 'string',
                  id: 1,
                },
                value: {
                  rule: 'repeated',
                  type: 'EnumValueDescriptorProto',
                  id: 2,
                },
                options: {
                  type: 'EnumOptions',
                  id: 3,
                },
              },
            },
            EnumValueDescriptorProto: {
              fields: {
                name: {
                  type: 'string',
                  id: 1,
                },
                number: {
                  type: 'int32',
                  id: 2,
                },
                options: {
                  type: 'EnumValueOptions',
                  id: 3,
                },
              },
            },
            ServiceDescriptorProto: {
              fields: {
                name: {
                  type: 'string',
                  id: 1,
                },
                method: {
                  rule: 'repeated',
                  type: 'MethodDescriptorProto',
                  id: 2,
                },
                options: {
                  type: 'ServiceOptions',
                  id: 3,
                },
              },
            },
            MethodDescriptorProto: {
              fields: {
                name: {
                  type: 'string',
                  id: 1,
                },
                inputType: {
                  type: 'string',
                  id: 2,
                },
                outputType: {
                  type: 'string',
                  id: 3,
                },
                options: {
                  type: 'MethodOptions',
                  id: 4,
                },
                clientStreaming: {
                  type: 'bool',
                  id: 5,
                },
                serverStreaming: {
                  type: 'bool',
                  id: 6,
                },
              },
            },
            FileOptions: {
              fields: {
                javaPackage: {
                  type: 'string',
                  id: 1,
                },
                javaOuterClassname: {
                  type: 'string',
                  id: 8,
                },
                javaMultipleFiles: {
                  type: 'bool',
                  id: 10,
                },
                javaGenerateEqualsAndHash: {
                  type: 'bool',
                  id: 20,
                  options: {
                    deprecated: true,
                  },
                },
                javaStringCheckUtf8: {
                  type: 'bool',
                  id: 27,
                },
                optimizeFor: {
                  type: 'OptimizeMode',
                  id: 9,
                  options: {
                    default: 'SPEED',
                  },
                },
                goPackage: {
                  type: 'string',
                  id: 11,
                },
                ccGenericServices: {
                  type: 'bool',
                  id: 16,
                },
                javaGenericServices: {
                  type: 'bool',
                  id: 17,
                },
                pyGenericServices: {
                  type: 'bool',
                  id: 18,
                },
                deprecated: {
                  type: 'bool',
                  id: 23,
                },
                ccEnableArenas: {
                  type: 'bool',
                  id: 31,
                },
                objcClassPrefix: {
                  type: 'string',
                  id: 36,
                },
                csharpNamespace: {
                  type: 'string',
                  id: 37,
                },
                uninterpretedOption: {
                  rule: 'repeated',
                  type: 'UninterpretedOption',
                  id: 999,
                },
              },
              extensions: [[1000, 536870911]],
              reserved: [[38, 38]],
              nested: {
                OptimizeMode: {
                  values: {
                    SPEED: 1,
                    CODE_SIZE: 2,
                    LITE_RUNTIME: 3,
                  },
                },
              },
            },
            MessageOptions: {
              fields: {
                messageSetWireFormat: {
                  type: 'bool',
                  id: 1,
                },
                noStandardDescriptorAccessor: {
                  type: 'bool',
                  id: 2,
                },
                deprecated: {
                  type: 'bool',
                  id: 3,
                },
                mapEntry: {
                  type: 'bool',
                  id: 7,
                },
                uninterpretedOption: {
                  rule: 'repeated',
                  type: 'UninterpretedOption',
                  id: 999,
                },
              },
              extensions: [[1000, 536870911]],
              reserved: [[8, 8]],
            },
            FieldOptions: {
              fields: {
                ctype: {
                  type: 'CType',
                  id: 1,
                  options: {
                    default: 'STRING',
                  },
                },
                packed: {
                  type: 'bool',
                  id: 2,
                },
                jstype: {
                  type: 'JSType',
                  id: 6,
                  options: {
                    default: 'JS_NORMAL',
                  },
                },
                lazy: {
                  type: 'bool',
                  id: 5,
                },
                deprecated: {
                  type: 'bool',
                  id: 3,
                },
                weak: {
                  type: 'bool',
                  id: 10,
                },
                uninterpretedOption: {
                  rule: 'repeated',
                  type: 'UninterpretedOption',
                  id: 999,
                },
              },
              extensions: [[1000, 536870911]],
              reserved: [[4, 4]],
              nested: {
                CType: {
                  values: {
                    STRING: 0,
                    CORD: 1,
                    STRING_PIECE: 2,
                  },
                },
                JSType: {
                  values: {
                    JS_NORMAL: 0,
                    JS_STRING: 1,
                    JS_NUMBER: 2,
                  },
                },
              },
            },
            OneofOptions: {
              fields: {
                uninterpretedOption: {
                  rule: 'repeated',
                  type: 'UninterpretedOption',
                  id: 999,
                },
              },
              extensions: [[1000, 536870911]],
            },
            EnumOptions: {
              fields: {
                allowAlias: {
                  type: 'bool',
                  id: 2,
                },
                deprecated: {
                  type: 'bool',
                  id: 3,
                },
                uninterpretedOption: {
                  rule: 'repeated',
                  type: 'UninterpretedOption',
                  id: 999,
                },
              },
              extensions: [[1000, 536870911]],
            },
            EnumValueOptions: {
              fields: {
                deprecated: {
                  type: 'bool',
                  id: 1,
                },
                uninterpretedOption: {
                  rule: 'repeated',
                  type: 'UninterpretedOption',
                  id: 999,
                },
              },
              extensions: [[1000, 536870911]],
            },
            ServiceOptions: {
              fields: {
                deprecated: {
                  type: 'bool',
                  id: 33,
                },
                uninterpretedOption: {
                  rule: 'repeated',
                  type: 'UninterpretedOption',
                  id: 999,
                },
              },
              extensions: [[1000, 536870911]],
            },
            MethodOptions: {
              fields: {
                deprecated: {
                  type: 'bool',
                  id: 33,
                },
                uninterpretedOption: {
                  rule: 'repeated',
                  type: 'UninterpretedOption',
                  id: 999,
                },
              },
              extensions: [[1000, 536870911]],
            },
            UninterpretedOption: {
              fields: {
                name: {
                  rule: 'repeated',
                  type: 'NamePart',
                  id: 2,
                },
                identifierValue: {
                  type: 'string',
                  id: 3,
                },
                positiveIntValue: {
                  type: 'uint64',
                  id: 4,
                },
                negativeIntValue: {
                  type: 'int64',
                  id: 5,
                },
                doubleValue: {
                  type: 'double',
                  id: 6,
                },
                stringValue: {
                  type: 'bytes',
                  id: 7,
                },
                aggregateValue: {
                  type: 'string',
                  id: 8,
                },
              },
              nested: {
                NamePart: {
                  fields: {
                    namePart: {
                      rule: 'required',
                      type: 'string',
                      id: 1,
                    },
                    isExtension: {
                      rule: 'required',
                      type: 'bool',
                      id: 2,
                    },
                  },
                },
              },
            },
            SourceCodeInfo: {
              fields: {
                location: {
                  rule: 'repeated',
                  type: 'Location',
                  id: 1,
                },
              },
              nested: {
                Location: {
                  fields: {
                    path: {
                      rule: 'repeated',
                      type: 'int32',
                      id: 1,
                    },
                    span: {
                      rule: 'repeated',
                      type: 'int32',
                      id: 2,
                    },
                    leadingComments: {
                      type: 'string',
                      id: 3,
                    },
                    trailingComments: {
                      type: 'string',
                      id: 4,
                    },
                    leadingDetachedComments: {
                      rule: 'repeated',
                      type: 'string',
                      id: 6,
                    },
                  },
                },
              },
            },
            GeneratedCodeInfo: {
              fields: {
                annotation: {
                  rule: 'repeated',
                  type: 'Annotation',
                  id: 1,
                },
              },
              nested: {
                Annotation: {
                  fields: {
                    path: {
                      rule: 'repeated',
                      type: 'int32',
                      id: 1,
                    },
                    sourceFile: {
                      type: 'string',
                      id: 2,
                    },
                    begin: {
                      type: 'int32',
                      id: 3,
                    },
                    end: {
                      type: 'int32',
                      id: 4,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
