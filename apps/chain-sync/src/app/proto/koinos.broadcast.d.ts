import * as $protobuf from 'protobufjs';
/** Namespace koinos. */
export namespace koinos {
  /** Namespace broadcast. */
  namespace broadcast {
    /** Properties of a transaction_accepted. */
    interface Itransaction_accepted {
      /** transaction_accepted transaction */
      transaction?: koinos.protocol.Itransaction | null;

      /** transaction_accepted receipt */
      receipt?: koinos.protocol.Itransaction_receipt | null;

      /** transaction_accepted height */
      height?: number | Long | null;
    }

    /** Represents a transaction_accepted. */
    class transaction_accepted implements Itransaction_accepted {
      /**
       * Constructs a new transaction_accepted.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.broadcast.Itransaction_accepted);

      /** transaction_accepted transaction. */
      public transaction?: koinos.protocol.Itransaction | null;

      /** transaction_accepted receipt. */
      public receipt?: koinos.protocol.Itransaction_receipt | null;

      /** transaction_accepted height. */
      public height: number | Long;

      /**
       * Creates a new transaction_accepted instance using the specified properties.
       * @param [properties] Properties to set
       * @returns transaction_accepted instance
       */
      public static create(
        properties?: koinos.broadcast.Itransaction_accepted,
      ): koinos.broadcast.transaction_accepted;

      /**
       * Encodes the specified transaction_accepted message. Does not implicitly {@link koinos.broadcast.transaction_accepted.verify|verify} messages.
       * @param message transaction_accepted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.broadcast.Itransaction_accepted,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified transaction_accepted message, length delimited. Does not implicitly {@link koinos.broadcast.transaction_accepted.verify|verify} messages.
       * @param message transaction_accepted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.broadcast.Itransaction_accepted,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a transaction_accepted message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns transaction_accepted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.broadcast.transaction_accepted;

      /**
       * Decodes a transaction_accepted message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns transaction_accepted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.broadcast.transaction_accepted;

      /**
       * Verifies a transaction_accepted message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a transaction_accepted message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns transaction_accepted
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.broadcast.transaction_accepted;

      /**
       * Creates a plain object from a transaction_accepted message. Also converts values to other types if specified.
       * @param message transaction_accepted
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.broadcast.transaction_accepted,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this transaction_accepted to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a transaction_failed. */
    interface Itransaction_failed {
      /** transaction_failed id */
      id?: Uint8Array | null;
    }

    /** Represents a transaction_failed. */
    class transaction_failed implements Itransaction_failed {
      /**
       * Constructs a new transaction_failed.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.broadcast.Itransaction_failed);

      /** transaction_failed id. */
      public id: Uint8Array;

      /**
       * Creates a new transaction_failed instance using the specified properties.
       * @param [properties] Properties to set
       * @returns transaction_failed instance
       */
      public static create(
        properties?: koinos.broadcast.Itransaction_failed,
      ): koinos.broadcast.transaction_failed;

      /**
       * Encodes the specified transaction_failed message. Does not implicitly {@link koinos.broadcast.transaction_failed.verify|verify} messages.
       * @param message transaction_failed message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.broadcast.Itransaction_failed,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified transaction_failed message, length delimited. Does not implicitly {@link koinos.broadcast.transaction_failed.verify|verify} messages.
       * @param message transaction_failed message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.broadcast.Itransaction_failed,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a transaction_failed message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns transaction_failed
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.broadcast.transaction_failed;

      /**
       * Decodes a transaction_failed message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns transaction_failed
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.broadcast.transaction_failed;

      /**
       * Verifies a transaction_failed message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a transaction_failed message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns transaction_failed
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.broadcast.transaction_failed;

      /**
       * Creates a plain object from a transaction_failed message. Also converts values to other types if specified.
       * @param message transaction_failed
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.broadcast.transaction_failed,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this transaction_failed to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a mempool_accepted. */
    interface Imempool_accepted {
      /** mempool_accepted transaction */
      transaction?: koinos.protocol.Itransaction | null;

      /** mempool_accepted receipt */
      receipt?: koinos.protocol.Itransaction_receipt | null;

      /** mempool_accepted height */
      height?: number | Long | null;

      /** mempool_accepted pendingRcUsed */
      pendingRcUsed?: number | Long | null;
    }

    /** Represents a mempool_accepted. */
    class mempool_accepted implements Imempool_accepted {
      /**
       * Constructs a new mempool_accepted.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.broadcast.Imempool_accepted);

      /** mempool_accepted transaction. */
      public transaction?: koinos.protocol.Itransaction | null;

      /** mempool_accepted receipt. */
      public receipt?: koinos.protocol.Itransaction_receipt | null;

      /** mempool_accepted height. */
      public height: number | Long;

      /** mempool_accepted pendingRcUsed. */
      public pendingRcUsed: number | Long;

      /**
       * Creates a new mempool_accepted instance using the specified properties.
       * @param [properties] Properties to set
       * @returns mempool_accepted instance
       */
      public static create(
        properties?: koinos.broadcast.Imempool_accepted,
      ): koinos.broadcast.mempool_accepted;

      /**
       * Encodes the specified mempool_accepted message. Does not implicitly {@link koinos.broadcast.mempool_accepted.verify|verify} messages.
       * @param message mempool_accepted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.broadcast.Imempool_accepted,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified mempool_accepted message, length delimited. Does not implicitly {@link koinos.broadcast.mempool_accepted.verify|verify} messages.
       * @param message mempool_accepted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.broadcast.Imempool_accepted,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a mempool_accepted message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns mempool_accepted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.broadcast.mempool_accepted;

      /**
       * Decodes a mempool_accepted message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns mempool_accepted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.broadcast.mempool_accepted;

      /**
       * Verifies a mempool_accepted message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a mempool_accepted message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns mempool_accepted
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.broadcast.mempool_accepted;

      /**
       * Creates a plain object from a mempool_accepted message. Also converts values to other types if specified.
       * @param message mempool_accepted
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.broadcast.mempool_accepted,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this mempool_accepted to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a block_accepted. */
    interface Iblock_accepted {
      /** block_accepted block */
      block?: koinos.protocol.Iblock | null;

      /** block_accepted receipt */
      receipt?: koinos.protocol.Iblock_receipt | null;

      /** block_accepted live */
      live?: boolean | null;
    }

    /** Represents a block_accepted. */
    class block_accepted implements Iblock_accepted {
      /**
       * Constructs a new block_accepted.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.broadcast.Iblock_accepted);

      /** block_accepted block. */
      public block?: koinos.protocol.Iblock | null;

      /** block_accepted receipt. */
      public receipt?: koinos.protocol.Iblock_receipt | null;

      /** block_accepted live. */
      public live: boolean;

      /**
       * Creates a new block_accepted instance using the specified properties.
       * @param [properties] Properties to set
       * @returns block_accepted instance
       */
      public static create(
        properties?: koinos.broadcast.Iblock_accepted,
      ): koinos.broadcast.block_accepted;

      /**
       * Encodes the specified block_accepted message. Does not implicitly {@link koinos.broadcast.block_accepted.verify|verify} messages.
       * @param message block_accepted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.broadcast.Iblock_accepted,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified block_accepted message, length delimited. Does not implicitly {@link koinos.broadcast.block_accepted.verify|verify} messages.
       * @param message block_accepted message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.broadcast.Iblock_accepted,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a block_accepted message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns block_accepted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.broadcast.block_accepted;

      /**
       * Decodes a block_accepted message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns block_accepted
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.broadcast.block_accepted;

      /**
       * Verifies a block_accepted message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a block_accepted message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns block_accepted
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.broadcast.block_accepted;

      /**
       * Creates a plain object from a block_accepted message. Also converts values to other types if specified.
       * @param message block_accepted
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.broadcast.block_accepted,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this block_accepted to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a block_irreversible. */
    interface Iblock_irreversible {
      /** block_irreversible topology */
      topology?: koinos.Iblock_topology | null;
    }

    /** Represents a block_irreversible. */
    class block_irreversible implements Iblock_irreversible {
      /**
       * Constructs a new block_irreversible.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.broadcast.Iblock_irreversible);

      /** block_irreversible topology. */
      public topology?: koinos.Iblock_topology | null;

      /**
       * Creates a new block_irreversible instance using the specified properties.
       * @param [properties] Properties to set
       * @returns block_irreversible instance
       */
      public static create(
        properties?: koinos.broadcast.Iblock_irreversible,
      ): koinos.broadcast.block_irreversible;

      /**
       * Encodes the specified block_irreversible message. Does not implicitly {@link koinos.broadcast.block_irreversible.verify|verify} messages.
       * @param message block_irreversible message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.broadcast.Iblock_irreversible,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified block_irreversible message, length delimited. Does not implicitly {@link koinos.broadcast.block_irreversible.verify|verify} messages.
       * @param message block_irreversible message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.broadcast.Iblock_irreversible,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a block_irreversible message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns block_irreversible
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.broadcast.block_irreversible;

      /**
       * Decodes a block_irreversible message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns block_irreversible
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.broadcast.block_irreversible;

      /**
       * Verifies a block_irreversible message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a block_irreversible message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns block_irreversible
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.broadcast.block_irreversible;

      /**
       * Creates a plain object from a block_irreversible message. Also converts values to other types if specified.
       * @param message block_irreversible
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.broadcast.block_irreversible,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this block_irreversible to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a fork_heads. */
    interface Ifork_heads {
      /** fork_heads lastIrreversibleBlock */
      lastIrreversibleBlock?: koinos.Iblock_topology | null;

      /** fork_heads heads */
      heads?: koinos.Iblock_topology[] | null;
    }

    /** Represents a fork_heads. */
    class fork_heads implements Ifork_heads {
      /**
       * Constructs a new fork_heads.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.broadcast.Ifork_heads);

      /** fork_heads lastIrreversibleBlock. */
      public lastIrreversibleBlock?: koinos.Iblock_topology | null;

      /** fork_heads heads. */
      public heads: koinos.Iblock_topology[];

      /**
       * Creates a new fork_heads instance using the specified properties.
       * @param [properties] Properties to set
       * @returns fork_heads instance
       */
      public static create(
        properties?: koinos.broadcast.Ifork_heads,
      ): koinos.broadcast.fork_heads;

      /**
       * Encodes the specified fork_heads message. Does not implicitly {@link koinos.broadcast.fork_heads.verify|verify} messages.
       * @param message fork_heads message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.broadcast.Ifork_heads,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified fork_heads message, length delimited. Does not implicitly {@link koinos.broadcast.fork_heads.verify|verify} messages.
       * @param message fork_heads message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.broadcast.Ifork_heads,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a fork_heads message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns fork_heads
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.broadcast.fork_heads;

      /**
       * Decodes a fork_heads message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns fork_heads
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.broadcast.fork_heads;

      /**
       * Verifies a fork_heads message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a fork_heads message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns fork_heads
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.broadcast.fork_heads;

      /**
       * Creates a plain object from a fork_heads message. Also converts values to other types if specified.
       * @param message fork_heads
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.broadcast.fork_heads,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this fork_heads to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a gossip_status. */
    interface Igossip_status {
      /** gossip_status enabled */
      enabled?: boolean | null;
    }

    /** Represents a gossip_status. */
    class gossip_status implements Igossip_status {
      /**
       * Constructs a new gossip_status.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.broadcast.Igossip_status);

      /** gossip_status enabled. */
      public enabled: boolean;

      /**
       * Creates a new gossip_status instance using the specified properties.
       * @param [properties] Properties to set
       * @returns gossip_status instance
       */
      public static create(
        properties?: koinos.broadcast.Igossip_status,
      ): koinos.broadcast.gossip_status;

      /**
       * Encodes the specified gossip_status message. Does not implicitly {@link koinos.broadcast.gossip_status.verify|verify} messages.
       * @param message gossip_status message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.broadcast.Igossip_status,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified gossip_status message, length delimited. Does not implicitly {@link koinos.broadcast.gossip_status.verify|verify} messages.
       * @param message gossip_status message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.broadcast.Igossip_status,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a gossip_status message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns gossip_status
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.broadcast.gossip_status;

      /**
       * Decodes a gossip_status message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns gossip_status
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.broadcast.gossip_status;

      /**
       * Verifies a gossip_status message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a gossip_status message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns gossip_status
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.broadcast.gossip_status;

      /**
       * Creates a plain object from a gossip_status message. Also converts values to other types if specified.
       * @param message gossip_status
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.broadcast.gossip_status,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this gossip_status to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of an event_parcel. */
    interface Ievent_parcel {
      /** event_parcel blockId */
      blockId?: Uint8Array | null;

      /** event_parcel height */
      height?: number | Long | null;

      /** event_parcel transactionId */
      transactionId?: Uint8Array | null;

      /** event_parcel event */
      event?: koinos.protocol.Ievent_data | null;
    }

    /** Represents an event_parcel. */
    class event_parcel implements Ievent_parcel {
      /**
       * Constructs a new event_parcel.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.broadcast.Ievent_parcel);

      /** event_parcel blockId. */
      public blockId: Uint8Array;

      /** event_parcel height. */
      public height: number | Long;

      /** event_parcel transactionId. */
      public transactionId?: Uint8Array | null;

      /** event_parcel event. */
      public event?: koinos.protocol.Ievent_data | null;

      /** event_parcel _transactionId. */
      public _transactionId?: 'transactionId';

      /**
       * Creates a new event_parcel instance using the specified properties.
       * @param [properties] Properties to set
       * @returns event_parcel instance
       */
      public static create(
        properties?: koinos.broadcast.Ievent_parcel,
      ): koinos.broadcast.event_parcel;

      /**
       * Encodes the specified event_parcel message. Does not implicitly {@link koinos.broadcast.event_parcel.verify|verify} messages.
       * @param message event_parcel message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.broadcast.Ievent_parcel,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified event_parcel message, length delimited. Does not implicitly {@link koinos.broadcast.event_parcel.verify|verify} messages.
       * @param message event_parcel message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.broadcast.Ievent_parcel,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes an event_parcel message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns event_parcel
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.broadcast.event_parcel;

      /**
       * Decodes an event_parcel message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns event_parcel
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.broadcast.event_parcel;

      /**
       * Verifies an event_parcel message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates an event_parcel message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns event_parcel
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.broadcast.event_parcel;

      /**
       * Creates a plain object from an event_parcel message. Also converts values to other types if specified.
       * @param message event_parcel
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.broadcast.event_parcel,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this event_parcel to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }
  }

  /** Properties of a block_topology. */
  interface Iblock_topology {
    /** block_topology id */
    id?: Uint8Array | null;

    /** block_topology height */
    height?: number | Long | null;

    /** block_topology previous */
    previous?: Uint8Array | null;
  }

  /** Represents a block_topology. */
  class block_topology implements Iblock_topology {
    /**
     * Constructs a new block_topology.
     * @param [properties] Properties to set
     */
    constructor(properties?: koinos.Iblock_topology);

    /** block_topology id. */
    public id: Uint8Array;

    /** block_topology height. */
    public height: number | Long;

    /** block_topology previous. */
    public previous: Uint8Array;

    /**
     * Creates a new block_topology instance using the specified properties.
     * @param [properties] Properties to set
     * @returns block_topology instance
     */
    public static create(
      properties?: koinos.Iblock_topology,
    ): koinos.block_topology;

    /**
     * Encodes the specified block_topology message. Does not implicitly {@link koinos.block_topology.verify|verify} messages.
     * @param message block_topology message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: koinos.Iblock_topology,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified block_topology message, length delimited. Does not implicitly {@link koinos.block_topology.verify|verify} messages.
     * @param message block_topology message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: koinos.Iblock_topology,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a block_topology message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns block_topology
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): koinos.block_topology;

    /**
     * Decodes a block_topology message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns block_topology
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): koinos.block_topology;

    /**
     * Verifies a block_topology message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a block_topology message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns block_topology
     */
    public static fromObject(object: {
      [k: string]: any;
    }): koinos.block_topology;

    /**
     * Creates a plain object from a block_topology message. Also converts values to other types if specified.
     * @param message block_topology
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: koinos.block_topology,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this block_topology to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** bytes_type enum. */
  enum bytes_type {
    BASE64 = 0,
    BASE58 = 1,
    HEX = 2,
    BLOCK_ID = 3,
    TRANSACTION_ID = 4,
    CONTRACT_ID = 5,
    ADDRESS = 6,
  }

  /** Namespace protocol. */
  namespace protocol {
    /** Properties of an event_data. */
    interface Ievent_data {
      /** event_data sequence */
      sequence?: number | null;

      /** event_data source */
      source?: Uint8Array | null;

      /** event_data name */
      name?: string | null;

      /** event_data data */
      data?: Uint8Array | null;

      /** event_data impacted */
      impacted?: Uint8Array[] | null;
    }

    /** Represents an event_data. */
    class event_data implements Ievent_data {
      /**
       * Constructs a new event_data.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.protocol.Ievent_data);

      /** event_data sequence. */
      public sequence: number;

      /** event_data source. */
      public source: Uint8Array;

      /** event_data name. */
      public name: string;

      /** event_data data. */
      public data: Uint8Array;

      /** event_data impacted. */
      public impacted: Uint8Array[];

      /**
       * Creates a new event_data instance using the specified properties.
       * @param [properties] Properties to set
       * @returns event_data instance
       */
      public static create(
        properties?: koinos.protocol.Ievent_data,
      ): koinos.protocol.event_data;

      /**
       * Encodes the specified event_data message. Does not implicitly {@link koinos.protocol.event_data.verify|verify} messages.
       * @param message event_data message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.protocol.Ievent_data,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified event_data message, length delimited. Does not implicitly {@link koinos.protocol.event_data.verify|verify} messages.
       * @param message event_data message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.protocol.Ievent_data,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes an event_data message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns event_data
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.protocol.event_data;

      /**
       * Decodes an event_data message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns event_data
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.protocol.event_data;

      /**
       * Verifies an event_data message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates an event_data message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns event_data
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.protocol.event_data;

      /**
       * Creates a plain object from an event_data message. Also converts values to other types if specified.
       * @param message event_data
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.protocol.event_data,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this event_data to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a contract_call_bundle. */
    interface Icontract_call_bundle {
      /** contract_call_bundle contractId */
      contractId?: Uint8Array | null;

      /** contract_call_bundle entryPoint */
      entryPoint?: number | null;
    }

    /** Represents a contract_call_bundle. */
    class contract_call_bundle implements Icontract_call_bundle {
      /**
       * Constructs a new contract_call_bundle.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.protocol.Icontract_call_bundle);

      /** contract_call_bundle contractId. */
      public contractId: Uint8Array;

      /** contract_call_bundle entryPoint. */
      public entryPoint: number;

      /**
       * Creates a new contract_call_bundle instance using the specified properties.
       * @param [properties] Properties to set
       * @returns contract_call_bundle instance
       */
      public static create(
        properties?: koinos.protocol.Icontract_call_bundle,
      ): koinos.protocol.contract_call_bundle;

      /**
       * Encodes the specified contract_call_bundle message. Does not implicitly {@link koinos.protocol.contract_call_bundle.verify|verify} messages.
       * @param message contract_call_bundle message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.protocol.Icontract_call_bundle,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified contract_call_bundle message, length delimited. Does not implicitly {@link koinos.protocol.contract_call_bundle.verify|verify} messages.
       * @param message contract_call_bundle message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.protocol.Icontract_call_bundle,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a contract_call_bundle message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns contract_call_bundle
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.protocol.contract_call_bundle;

      /**
       * Decodes a contract_call_bundle message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns contract_call_bundle
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.protocol.contract_call_bundle;

      /**
       * Verifies a contract_call_bundle message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a contract_call_bundle message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns contract_call_bundle
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.protocol.contract_call_bundle;

      /**
       * Creates a plain object from a contract_call_bundle message. Also converts values to other types if specified.
       * @param message contract_call_bundle
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.protocol.contract_call_bundle,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this contract_call_bundle to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a system_call_target. */
    interface Isystem_call_target {
      /** system_call_target thunkId */
      thunkId?: number | null;

      /** system_call_target systemCallBundle */
      systemCallBundle?: koinos.protocol.Icontract_call_bundle | null;
    }

    /** Represents a system_call_target. */
    class system_call_target implements Isystem_call_target {
      /**
       * Constructs a new system_call_target.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.protocol.Isystem_call_target);

      /** system_call_target thunkId. */
      public thunkId?: number | null;

      /** system_call_target systemCallBundle. */
      public systemCallBundle?: koinos.protocol.Icontract_call_bundle | null;

      /** system_call_target target. */
      public target?: 'thunkId' | 'systemCallBundle';

      /**
       * Creates a new system_call_target instance using the specified properties.
       * @param [properties] Properties to set
       * @returns system_call_target instance
       */
      public static create(
        properties?: koinos.protocol.Isystem_call_target,
      ): koinos.protocol.system_call_target;

      /**
       * Encodes the specified system_call_target message. Does not implicitly {@link koinos.protocol.system_call_target.verify|verify} messages.
       * @param message system_call_target message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.protocol.Isystem_call_target,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified system_call_target message, length delimited. Does not implicitly {@link koinos.protocol.system_call_target.verify|verify} messages.
       * @param message system_call_target message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.protocol.Isystem_call_target,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a system_call_target message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns system_call_target
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.protocol.system_call_target;

      /**
       * Decodes a system_call_target message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns system_call_target
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.protocol.system_call_target;

      /**
       * Verifies a system_call_target message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a system_call_target message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns system_call_target
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.protocol.system_call_target;

      /**
       * Creates a plain object from a system_call_target message. Also converts values to other types if specified.
       * @param message system_call_target
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.protocol.system_call_target,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this system_call_target to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of an upload_contract_operation. */
    interface Iupload_contract_operation {
      /** upload_contract_operation contractId */
      contractId?: Uint8Array | null;

      /** upload_contract_operation bytecode */
      bytecode?: Uint8Array | null;

      /** upload_contract_operation abi */
      abi?: string | null;

      /** upload_contract_operation authorizesCallContract */
      authorizesCallContract?: boolean | null;

      /** upload_contract_operation authorizesTransactionApplication */
      authorizesTransactionApplication?: boolean | null;

      /** upload_contract_operation authorizesUploadContract */
      authorizesUploadContract?: boolean | null;
    }

    /** Represents an upload_contract_operation. */
    class upload_contract_operation implements Iupload_contract_operation {
      /**
       * Constructs a new upload_contract_operation.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.protocol.Iupload_contract_operation);

      /** upload_contract_operation contractId. */
      public contractId: Uint8Array;

      /** upload_contract_operation bytecode. */
      public bytecode: Uint8Array;

      /** upload_contract_operation abi. */
      public abi: string;

      /** upload_contract_operation authorizesCallContract. */
      public authorizesCallContract: boolean;

      /** upload_contract_operation authorizesTransactionApplication. */
      public authorizesTransactionApplication: boolean;

      /** upload_contract_operation authorizesUploadContract. */
      public authorizesUploadContract: boolean;

      /**
       * Creates a new upload_contract_operation instance using the specified properties.
       * @param [properties] Properties to set
       * @returns upload_contract_operation instance
       */
      public static create(
        properties?: koinos.protocol.Iupload_contract_operation,
      ): koinos.protocol.upload_contract_operation;

      /**
       * Encodes the specified upload_contract_operation message. Does not implicitly {@link koinos.protocol.upload_contract_operation.verify|verify} messages.
       * @param message upload_contract_operation message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.protocol.Iupload_contract_operation,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified upload_contract_operation message, length delimited. Does not implicitly {@link koinos.protocol.upload_contract_operation.verify|verify} messages.
       * @param message upload_contract_operation message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.protocol.Iupload_contract_operation,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes an upload_contract_operation message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns upload_contract_operation
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.protocol.upload_contract_operation;

      /**
       * Decodes an upload_contract_operation message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns upload_contract_operation
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.protocol.upload_contract_operation;

      /**
       * Verifies an upload_contract_operation message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates an upload_contract_operation message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns upload_contract_operation
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.protocol.upload_contract_operation;

      /**
       * Creates a plain object from an upload_contract_operation message. Also converts values to other types if specified.
       * @param message upload_contract_operation
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.protocol.upload_contract_operation,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this upload_contract_operation to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a call_contract_operation. */
    interface Icall_contract_operation {
      /** call_contract_operation contractId */
      contractId?: Uint8Array | null;

      /** call_contract_operation entryPoint */
      entryPoint?: number | null;

      /** call_contract_operation args */
      args?: Uint8Array | null;
    }

    /** Represents a call_contract_operation. */
    class call_contract_operation implements Icall_contract_operation {
      /**
       * Constructs a new call_contract_operation.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.protocol.Icall_contract_operation);

      /** call_contract_operation contractId. */
      public contractId: Uint8Array;

      /** call_contract_operation entryPoint. */
      public entryPoint: number;

      /** call_contract_operation args. */
      public args: Uint8Array;

      /**
       * Creates a new call_contract_operation instance using the specified properties.
       * @param [properties] Properties to set
       * @returns call_contract_operation instance
       */
      public static create(
        properties?: koinos.protocol.Icall_contract_operation,
      ): koinos.protocol.call_contract_operation;

      /**
       * Encodes the specified call_contract_operation message. Does not implicitly {@link koinos.protocol.call_contract_operation.verify|verify} messages.
       * @param message call_contract_operation message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.protocol.Icall_contract_operation,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified call_contract_operation message, length delimited. Does not implicitly {@link koinos.protocol.call_contract_operation.verify|verify} messages.
       * @param message call_contract_operation message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.protocol.Icall_contract_operation,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a call_contract_operation message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns call_contract_operation
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.protocol.call_contract_operation;

      /**
       * Decodes a call_contract_operation message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns call_contract_operation
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.protocol.call_contract_operation;

      /**
       * Verifies a call_contract_operation message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a call_contract_operation message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns call_contract_operation
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.protocol.call_contract_operation;

      /**
       * Creates a plain object from a call_contract_operation message. Also converts values to other types if specified.
       * @param message call_contract_operation
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.protocol.call_contract_operation,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this call_contract_operation to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a set_system_call_operation. */
    interface Iset_system_call_operation {
      /** set_system_call_operation callId */
      callId?: number | null;

      /** set_system_call_operation target */
      target?: koinos.protocol.Isystem_call_target | null;
    }

    /** Represents a set_system_call_operation. */
    class set_system_call_operation implements Iset_system_call_operation {
      /**
       * Constructs a new set_system_call_operation.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.protocol.Iset_system_call_operation);

      /** set_system_call_operation callId. */
      public callId: number;

      /** set_system_call_operation target. */
      public target?: koinos.protocol.Isystem_call_target | null;

      /**
       * Creates a new set_system_call_operation instance using the specified properties.
       * @param [properties] Properties to set
       * @returns set_system_call_operation instance
       */
      public static create(
        properties?: koinos.protocol.Iset_system_call_operation,
      ): koinos.protocol.set_system_call_operation;

      /**
       * Encodes the specified set_system_call_operation message. Does not implicitly {@link koinos.protocol.set_system_call_operation.verify|verify} messages.
       * @param message set_system_call_operation message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.protocol.Iset_system_call_operation,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified set_system_call_operation message, length delimited. Does not implicitly {@link koinos.protocol.set_system_call_operation.verify|verify} messages.
       * @param message set_system_call_operation message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.protocol.Iset_system_call_operation,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a set_system_call_operation message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns set_system_call_operation
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.protocol.set_system_call_operation;

      /**
       * Decodes a set_system_call_operation message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns set_system_call_operation
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.protocol.set_system_call_operation;

      /**
       * Verifies a set_system_call_operation message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a set_system_call_operation message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns set_system_call_operation
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.protocol.set_system_call_operation;

      /**
       * Creates a plain object from a set_system_call_operation message. Also converts values to other types if specified.
       * @param message set_system_call_operation
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.protocol.set_system_call_operation,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this set_system_call_operation to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a set_system_contract_operation. */
    interface Iset_system_contract_operation {
      /** set_system_contract_operation contractId */
      contractId?: Uint8Array | null;

      /** set_system_contract_operation systemContract */
      systemContract?: boolean | null;
    }

    /** Represents a set_system_contract_operation. */
    class set_system_contract_operation
      implements Iset_system_contract_operation
    {
      /**
       * Constructs a new set_system_contract_operation.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.protocol.Iset_system_contract_operation);

      /** set_system_contract_operation contractId. */
      public contractId: Uint8Array;

      /** set_system_contract_operation systemContract. */
      public systemContract: boolean;

      /**
       * Creates a new set_system_contract_operation instance using the specified properties.
       * @param [properties] Properties to set
       * @returns set_system_contract_operation instance
       */
      public static create(
        properties?: koinos.protocol.Iset_system_contract_operation,
      ): koinos.protocol.set_system_contract_operation;

      /**
       * Encodes the specified set_system_contract_operation message. Does not implicitly {@link koinos.protocol.set_system_contract_operation.verify|verify} messages.
       * @param message set_system_contract_operation message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.protocol.Iset_system_contract_operation,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified set_system_contract_operation message, length delimited. Does not implicitly {@link koinos.protocol.set_system_contract_operation.verify|verify} messages.
       * @param message set_system_contract_operation message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.protocol.Iset_system_contract_operation,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a set_system_contract_operation message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns set_system_contract_operation
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.protocol.set_system_contract_operation;

      /**
       * Decodes a set_system_contract_operation message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns set_system_contract_operation
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.protocol.set_system_contract_operation;

      /**
       * Verifies a set_system_contract_operation message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a set_system_contract_operation message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns set_system_contract_operation
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.protocol.set_system_contract_operation;

      /**
       * Creates a plain object from a set_system_contract_operation message. Also converts values to other types if specified.
       * @param message set_system_contract_operation
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.protocol.set_system_contract_operation,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this set_system_contract_operation to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of an operation. */
    interface Ioperation {
      /** operation uploadContract */
      uploadContract?: koinos.protocol.Iupload_contract_operation | null;

      /** operation callContract */
      callContract?: koinos.protocol.Icall_contract_operation | null;

      /** operation setSystemCall */
      setSystemCall?: koinos.protocol.Iset_system_call_operation | null;

      /** operation setSystemContract */
      setSystemContract?: koinos.protocol.Iset_system_contract_operation | null;
    }

    /** Represents an operation. */
    class operation implements Ioperation {
      /**
       * Constructs a new operation.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.protocol.Ioperation);

      /** operation uploadContract. */
      public uploadContract?: koinos.protocol.Iupload_contract_operation | null;

      /** operation callContract. */
      public callContract?: koinos.protocol.Icall_contract_operation | null;

      /** operation setSystemCall. */
      public setSystemCall?: koinos.protocol.Iset_system_call_operation | null;

      /** operation setSystemContract. */
      public setSystemContract?: koinos.protocol.Iset_system_contract_operation | null;

      /** operation op. */
      public op?:
        | 'uploadContract'
        | 'callContract'
        | 'setSystemCall'
        | 'setSystemContract';

      /**
       * Creates a new operation instance using the specified properties.
       * @param [properties] Properties to set
       * @returns operation instance
       */
      public static create(
        properties?: koinos.protocol.Ioperation,
      ): koinos.protocol.operation;

      /**
       * Encodes the specified operation message. Does not implicitly {@link koinos.protocol.operation.verify|verify} messages.
       * @param message operation message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.protocol.Ioperation,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified operation message, length delimited. Does not implicitly {@link koinos.protocol.operation.verify|verify} messages.
       * @param message operation message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.protocol.Ioperation,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes an operation message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns operation
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.protocol.operation;

      /**
       * Decodes an operation message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns operation
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.protocol.operation;

      /**
       * Verifies an operation message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates an operation message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns operation
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.protocol.operation;

      /**
       * Creates a plain object from an operation message. Also converts values to other types if specified.
       * @param message operation
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.protocol.operation,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this operation to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a transaction_header. */
    interface Itransaction_header {
      /** transaction_header chainId */
      chainId?: Uint8Array | null;

      /** transaction_header rcLimit */
      rcLimit?: number | Long | null;

      /** transaction_header nonce */
      nonce?: Uint8Array | null;

      /** transaction_header operationMerkleRoot */
      operationMerkleRoot?: Uint8Array | null;

      /** transaction_header payer */
      payer?: Uint8Array | null;

      /** transaction_header payee */
      payee?: Uint8Array | null;
    }

    /** Represents a transaction_header. */
    class transaction_header implements Itransaction_header {
      /**
       * Constructs a new transaction_header.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.protocol.Itransaction_header);

      /** transaction_header chainId. */
      public chainId: Uint8Array;

      /** transaction_header rcLimit. */
      public rcLimit: number | Long;

      /** transaction_header nonce. */
      public nonce: Uint8Array;

      /** transaction_header operationMerkleRoot. */
      public operationMerkleRoot: Uint8Array;

      /** transaction_header payer. */
      public payer: Uint8Array;

      /** transaction_header payee. */
      public payee: Uint8Array;

      /**
       * Creates a new transaction_header instance using the specified properties.
       * @param [properties] Properties to set
       * @returns transaction_header instance
       */
      public static create(
        properties?: koinos.protocol.Itransaction_header,
      ): koinos.protocol.transaction_header;

      /**
       * Encodes the specified transaction_header message. Does not implicitly {@link koinos.protocol.transaction_header.verify|verify} messages.
       * @param message transaction_header message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.protocol.Itransaction_header,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified transaction_header message, length delimited. Does not implicitly {@link koinos.protocol.transaction_header.verify|verify} messages.
       * @param message transaction_header message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.protocol.Itransaction_header,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a transaction_header message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns transaction_header
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.protocol.transaction_header;

      /**
       * Decodes a transaction_header message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns transaction_header
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.protocol.transaction_header;

      /**
       * Verifies a transaction_header message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a transaction_header message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns transaction_header
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.protocol.transaction_header;

      /**
       * Creates a plain object from a transaction_header message. Also converts values to other types if specified.
       * @param message transaction_header
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.protocol.transaction_header,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this transaction_header to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a transaction. */
    interface Itransaction {
      /** transaction id */
      id?: Uint8Array | null;

      /** transaction header */
      header?: koinos.protocol.Itransaction_header | null;

      /** transaction operations */
      operations?: koinos.protocol.Ioperation[] | null;

      /** transaction signatures */
      signatures?: Uint8Array[] | null;
    }

    /** Represents a transaction. */
    class transaction implements Itransaction {
      /**
       * Constructs a new transaction.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.protocol.Itransaction);

      /** transaction id. */
      public id: Uint8Array;

      /** transaction header. */
      public header?: koinos.protocol.Itransaction_header | null;

      /** transaction operations. */
      public operations: koinos.protocol.Ioperation[];

      /** transaction signatures. */
      public signatures: Uint8Array[];

      /**
       * Creates a new transaction instance using the specified properties.
       * @param [properties] Properties to set
       * @returns transaction instance
       */
      public static create(
        properties?: koinos.protocol.Itransaction,
      ): koinos.protocol.transaction;

      /**
       * Encodes the specified transaction message. Does not implicitly {@link koinos.protocol.transaction.verify|verify} messages.
       * @param message transaction message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.protocol.Itransaction,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified transaction message, length delimited. Does not implicitly {@link koinos.protocol.transaction.verify|verify} messages.
       * @param message transaction message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.protocol.Itransaction,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a transaction message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns transaction
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.protocol.transaction;

      /**
       * Decodes a transaction message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns transaction
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.protocol.transaction;

      /**
       * Verifies a transaction message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a transaction message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns transaction
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.protocol.transaction;

      /**
       * Creates a plain object from a transaction message. Also converts values to other types if specified.
       * @param message transaction
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.protocol.transaction,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this transaction to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a transaction_receipt. */
    interface Itransaction_receipt {
      /** transaction_receipt id */
      id?: Uint8Array | null;

      /** transaction_receipt payer */
      payer?: Uint8Array | null;

      /** transaction_receipt maxPayerRc */
      maxPayerRc?: number | Long | null;

      /** transaction_receipt rcLimit */
      rcLimit?: number | Long | null;

      /** transaction_receipt rcUsed */
      rcUsed?: number | Long | null;

      /** transaction_receipt diskStorageUsed */
      diskStorageUsed?: number | Long | null;

      /** transaction_receipt networkBandwidthUsed */
      networkBandwidthUsed?: number | Long | null;

      /** transaction_receipt computeBandwidthUsed */
      computeBandwidthUsed?: number | Long | null;

      /** transaction_receipt reverted */
      reverted?: boolean | null;

      /** transaction_receipt events */
      events?: koinos.protocol.Ievent_data[] | null;

      /** transaction_receipt logs */
      logs?: string[] | null;
    }

    /** Represents a transaction_receipt. */
    class transaction_receipt implements Itransaction_receipt {
      /**
       * Constructs a new transaction_receipt.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.protocol.Itransaction_receipt);

      /** transaction_receipt id. */
      public id: Uint8Array;

      /** transaction_receipt payer. */
      public payer: Uint8Array;

      /** transaction_receipt maxPayerRc. */
      public maxPayerRc: number | Long;

      /** transaction_receipt rcLimit. */
      public rcLimit: number | Long;

      /** transaction_receipt rcUsed. */
      public rcUsed: number | Long;

      /** transaction_receipt diskStorageUsed. */
      public diskStorageUsed: number | Long;

      /** transaction_receipt networkBandwidthUsed. */
      public networkBandwidthUsed: number | Long;

      /** transaction_receipt computeBandwidthUsed. */
      public computeBandwidthUsed: number | Long;

      /** transaction_receipt reverted. */
      public reverted: boolean;

      /** transaction_receipt events. */
      public events: koinos.protocol.Ievent_data[];

      /** transaction_receipt logs. */
      public logs: string[];

      /**
       * Creates a new transaction_receipt instance using the specified properties.
       * @param [properties] Properties to set
       * @returns transaction_receipt instance
       */
      public static create(
        properties?: koinos.protocol.Itransaction_receipt,
      ): koinos.protocol.transaction_receipt;

      /**
       * Encodes the specified transaction_receipt message. Does not implicitly {@link koinos.protocol.transaction_receipt.verify|verify} messages.
       * @param message transaction_receipt message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.protocol.Itransaction_receipt,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified transaction_receipt message, length delimited. Does not implicitly {@link koinos.protocol.transaction_receipt.verify|verify} messages.
       * @param message transaction_receipt message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.protocol.Itransaction_receipt,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a transaction_receipt message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns transaction_receipt
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.protocol.transaction_receipt;

      /**
       * Decodes a transaction_receipt message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns transaction_receipt
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.protocol.transaction_receipt;

      /**
       * Verifies a transaction_receipt message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a transaction_receipt message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns transaction_receipt
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.protocol.transaction_receipt;

      /**
       * Creates a plain object from a transaction_receipt message. Also converts values to other types if specified.
       * @param message transaction_receipt
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.protocol.transaction_receipt,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this transaction_receipt to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a block_header. */
    interface Iblock_header {
      /** block_header previous */
      previous?: Uint8Array | null;

      /** block_header height */
      height?: number | Long | null;

      /** block_header timestamp */
      timestamp?: number | Long | null;

      /** block_header previousStateMerkleRoot */
      previousStateMerkleRoot?: Uint8Array | null;

      /** block_header transactionMerkleRoot */
      transactionMerkleRoot?: Uint8Array | null;

      /** block_header signer */
      signer?: Uint8Array | null;

      /** block_header approvedProposals */
      approvedProposals?: Uint8Array[] | null;
    }

    /** Represents a block_header. */
    class block_header implements Iblock_header {
      /**
       * Constructs a new block_header.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.protocol.Iblock_header);

      /** block_header previous. */
      public previous: Uint8Array;

      /** block_header height. */
      public height: number | Long;

      /** block_header timestamp. */
      public timestamp: number | Long;

      /** block_header previousStateMerkleRoot. */
      public previousStateMerkleRoot: Uint8Array;

      /** block_header transactionMerkleRoot. */
      public transactionMerkleRoot: Uint8Array;

      /** block_header signer. */
      public signer: Uint8Array;

      /** block_header approvedProposals. */
      public approvedProposals: Uint8Array[];

      /**
       * Creates a new block_header instance using the specified properties.
       * @param [properties] Properties to set
       * @returns block_header instance
       */
      public static create(
        properties?: koinos.protocol.Iblock_header,
      ): koinos.protocol.block_header;

      /**
       * Encodes the specified block_header message. Does not implicitly {@link koinos.protocol.block_header.verify|verify} messages.
       * @param message block_header message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.protocol.Iblock_header,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified block_header message, length delimited. Does not implicitly {@link koinos.protocol.block_header.verify|verify} messages.
       * @param message block_header message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.protocol.Iblock_header,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a block_header message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns block_header
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.protocol.block_header;

      /**
       * Decodes a block_header message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns block_header
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.protocol.block_header;

      /**
       * Verifies a block_header message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a block_header message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns block_header
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.protocol.block_header;

      /**
       * Creates a plain object from a block_header message. Also converts values to other types if specified.
       * @param message block_header
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.protocol.block_header,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this block_header to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a block. */
    interface Iblock {
      /** block id */
      id?: Uint8Array | null;

      /** block header */
      header?: koinos.protocol.Iblock_header | null;

      /** block transactions */
      transactions?: koinos.protocol.Itransaction[] | null;

      /** block signature */
      signature?: Uint8Array | null;
    }

    /** Represents a block. */
    class block implements Iblock {
      /**
       * Constructs a new block.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.protocol.Iblock);

      /** block id. */
      public id: Uint8Array;

      /** block header. */
      public header?: koinos.protocol.Iblock_header | null;

      /** block transactions. */
      public transactions: koinos.protocol.Itransaction[];

      /** block signature. */
      public signature: Uint8Array;

      /**
       * Creates a new block instance using the specified properties.
       * @param [properties] Properties to set
       * @returns block instance
       */
      public static create(
        properties?: koinos.protocol.Iblock,
      ): koinos.protocol.block;

      /**
       * Encodes the specified block message. Does not implicitly {@link koinos.protocol.block.verify|verify} messages.
       * @param message block message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.protocol.Iblock,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified block message, length delimited. Does not implicitly {@link koinos.protocol.block.verify|verify} messages.
       * @param message block message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.protocol.Iblock,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a block message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns block
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.protocol.block;

      /**
       * Decodes a block message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns block
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.protocol.block;

      /**
       * Verifies a block message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a block message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns block
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.protocol.block;

      /**
       * Creates a plain object from a block message. Also converts values to other types if specified.
       * @param message block
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.protocol.block,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this block to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a block_receipt. */
    interface Iblock_receipt {
      /** block_receipt id */
      id?: Uint8Array | null;

      /** block_receipt height */
      height?: number | Long | null;

      /** block_receipt diskStorageUsed */
      diskStorageUsed?: number | Long | null;

      /** block_receipt networkBandwidthUsed */
      networkBandwidthUsed?: number | Long | null;

      /** block_receipt computeBandwidthUsed */
      computeBandwidthUsed?: number | Long | null;

      /** block_receipt stateMerkleRoot */
      stateMerkleRoot?: Uint8Array | null;

      /** block_receipt events */
      events?: koinos.protocol.Ievent_data[] | null;

      /** block_receipt transactionReceipts */
      transactionReceipts?: koinos.protocol.Itransaction_receipt[] | null;

      /** block_receipt logs */
      logs?: string[] | null;
    }

    /** Represents a block_receipt. */
    class block_receipt implements Iblock_receipt {
      /**
       * Constructs a new block_receipt.
       * @param [properties] Properties to set
       */
      constructor(properties?: koinos.protocol.Iblock_receipt);

      /** block_receipt id. */
      public id: Uint8Array;

      /** block_receipt height. */
      public height: number | Long;

      /** block_receipt diskStorageUsed. */
      public diskStorageUsed: number | Long;

      /** block_receipt networkBandwidthUsed. */
      public networkBandwidthUsed: number | Long;

      /** block_receipt computeBandwidthUsed. */
      public computeBandwidthUsed: number | Long;

      /** block_receipt stateMerkleRoot. */
      public stateMerkleRoot: Uint8Array;

      /** block_receipt events. */
      public events: koinos.protocol.Ievent_data[];

      /** block_receipt transactionReceipts. */
      public transactionReceipts: koinos.protocol.Itransaction_receipt[];

      /** block_receipt logs. */
      public logs: string[];

      /**
       * Creates a new block_receipt instance using the specified properties.
       * @param [properties] Properties to set
       * @returns block_receipt instance
       */
      public static create(
        properties?: koinos.protocol.Iblock_receipt,
      ): koinos.protocol.block_receipt;

      /**
       * Encodes the specified block_receipt message. Does not implicitly {@link koinos.protocol.block_receipt.verify|verify} messages.
       * @param message block_receipt message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: koinos.protocol.Iblock_receipt,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified block_receipt message, length delimited. Does not implicitly {@link koinos.protocol.block_receipt.verify|verify} messages.
       * @param message block_receipt message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: koinos.protocol.Iblock_receipt,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a block_receipt message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns block_receipt
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): koinos.protocol.block_receipt;

      /**
       * Decodes a block_receipt message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns block_receipt
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): koinos.protocol.block_receipt;

      /**
       * Verifies a block_receipt message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a block_receipt message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns block_receipt
       */
      public static fromObject(object: {
        [k: string]: any;
      }): koinos.protocol.block_receipt;

      /**
       * Creates a plain object from a block_receipt message. Also converts values to other types if specified.
       * @param message block_receipt
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: koinos.protocol.block_receipt,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this block_receipt to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }
  }
}

/** Namespace google. */
export namespace google {
  /** Namespace protobuf. */
  namespace protobuf {
    /** Properties of a FileDescriptorSet. */
    interface IFileDescriptorSet {
      /** FileDescriptorSet file */
      file?: google.protobuf.IFileDescriptorProto[] | null;
    }

    /** Represents a FileDescriptorSet. */
    class FileDescriptorSet implements IFileDescriptorSet {
      /**
       * Constructs a new FileDescriptorSet.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IFileDescriptorSet);

      /** FileDescriptorSet file. */
      public file: google.protobuf.IFileDescriptorProto[];

      /**
       * Creates a new FileDescriptorSet instance using the specified properties.
       * @param [properties] Properties to set
       * @returns FileDescriptorSet instance
       */
      public static create(
        properties?: google.protobuf.IFileDescriptorSet,
      ): google.protobuf.FileDescriptorSet;

      /**
       * Encodes the specified FileDescriptorSet message. Does not implicitly {@link google.protobuf.FileDescriptorSet.verify|verify} messages.
       * @param message FileDescriptorSet message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IFileDescriptorSet,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified FileDescriptorSet message, length delimited. Does not implicitly {@link google.protobuf.FileDescriptorSet.verify|verify} messages.
       * @param message FileDescriptorSet message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IFileDescriptorSet,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a FileDescriptorSet message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns FileDescriptorSet
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.FileDescriptorSet;

      /**
       * Decodes a FileDescriptorSet message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns FileDescriptorSet
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.FileDescriptorSet;

      /**
       * Verifies a FileDescriptorSet message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a FileDescriptorSet message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns FileDescriptorSet
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.FileDescriptorSet;

      /**
       * Creates a plain object from a FileDescriptorSet message. Also converts values to other types if specified.
       * @param message FileDescriptorSet
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.FileDescriptorSet,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this FileDescriptorSet to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a FileDescriptorProto. */
    interface IFileDescriptorProto {
      /** FileDescriptorProto name */
      name?: string | null;

      /** FileDescriptorProto package */
      package?: string | null;

      /** FileDescriptorProto dependency */
      dependency?: string[] | null;

      /** FileDescriptorProto publicDependency */
      publicDependency?: number[] | null;

      /** FileDescriptorProto weakDependency */
      weakDependency?: number[] | null;

      /** FileDescriptorProto messageType */
      messageType?: google.protobuf.IDescriptorProto[] | null;

      /** FileDescriptorProto enumType */
      enumType?: google.protobuf.IEnumDescriptorProto[] | null;

      /** FileDescriptorProto service */
      service?: google.protobuf.IServiceDescriptorProto[] | null;

      /** FileDescriptorProto extension */
      extension?: google.protobuf.IFieldDescriptorProto[] | null;

      /** FileDescriptorProto options */
      options?: google.protobuf.IFileOptions | null;

      /** FileDescriptorProto sourceCodeInfo */
      sourceCodeInfo?: google.protobuf.ISourceCodeInfo | null;

      /** FileDescriptorProto syntax */
      syntax?: string | null;
    }

    /** Represents a FileDescriptorProto. */
    class FileDescriptorProto implements IFileDescriptorProto {
      /**
       * Constructs a new FileDescriptorProto.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IFileDescriptorProto);

      /** FileDescriptorProto name. */
      public name: string;

      /** FileDescriptorProto package. */
      public package: string;

      /** FileDescriptorProto dependency. */
      public dependency: string[];

      /** FileDescriptorProto publicDependency. */
      public publicDependency: number[];

      /** FileDescriptorProto weakDependency. */
      public weakDependency: number[];

      /** FileDescriptorProto messageType. */
      public messageType: google.protobuf.IDescriptorProto[];

      /** FileDescriptorProto enumType. */
      public enumType: google.protobuf.IEnumDescriptorProto[];

      /** FileDescriptorProto service. */
      public service: google.protobuf.IServiceDescriptorProto[];

      /** FileDescriptorProto extension. */
      public extension: google.protobuf.IFieldDescriptorProto[];

      /** FileDescriptorProto options. */
      public options?: google.protobuf.IFileOptions | null;

      /** FileDescriptorProto sourceCodeInfo. */
      public sourceCodeInfo?: google.protobuf.ISourceCodeInfo | null;

      /** FileDescriptorProto syntax. */
      public syntax: string;

      /**
       * Creates a new FileDescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns FileDescriptorProto instance
       */
      public static create(
        properties?: google.protobuf.IFileDescriptorProto,
      ): google.protobuf.FileDescriptorProto;

      /**
       * Encodes the specified FileDescriptorProto message. Does not implicitly {@link google.protobuf.FileDescriptorProto.verify|verify} messages.
       * @param message FileDescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IFileDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified FileDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.FileDescriptorProto.verify|verify} messages.
       * @param message FileDescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IFileDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a FileDescriptorProto message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns FileDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.FileDescriptorProto;

      /**
       * Decodes a FileDescriptorProto message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns FileDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.FileDescriptorProto;

      /**
       * Verifies a FileDescriptorProto message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a FileDescriptorProto message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns FileDescriptorProto
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.FileDescriptorProto;

      /**
       * Creates a plain object from a FileDescriptorProto message. Also converts values to other types if specified.
       * @param message FileDescriptorProto
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.FileDescriptorProto,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this FileDescriptorProto to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a DescriptorProto. */
    interface IDescriptorProto {
      /** DescriptorProto name */
      name?: string | null;

      /** DescriptorProto field */
      field?: google.protobuf.IFieldDescriptorProto[] | null;

      /** DescriptorProto extension */
      extension?: google.protobuf.IFieldDescriptorProto[] | null;

      /** DescriptorProto nestedType */
      nestedType?: google.protobuf.IDescriptorProto[] | null;

      /** DescriptorProto enumType */
      enumType?: google.protobuf.IEnumDescriptorProto[] | null;

      /** DescriptorProto extensionRange */
      extensionRange?: google.protobuf.DescriptorProto.IExtensionRange[] | null;

      /** DescriptorProto oneofDecl */
      oneofDecl?: google.protobuf.IOneofDescriptorProto[] | null;

      /** DescriptorProto options */
      options?: google.protobuf.IMessageOptions | null;

      /** DescriptorProto reservedRange */
      reservedRange?: google.protobuf.DescriptorProto.IReservedRange[] | null;

      /** DescriptorProto reservedName */
      reservedName?: string[] | null;
    }

    /** Represents a DescriptorProto. */
    class DescriptorProto implements IDescriptorProto {
      /**
       * Constructs a new DescriptorProto.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IDescriptorProto);

      /** DescriptorProto name. */
      public name: string;

      /** DescriptorProto field. */
      public field: google.protobuf.IFieldDescriptorProto[];

      /** DescriptorProto extension. */
      public extension: google.protobuf.IFieldDescriptorProto[];

      /** DescriptorProto nestedType. */
      public nestedType: google.protobuf.IDescriptorProto[];

      /** DescriptorProto enumType. */
      public enumType: google.protobuf.IEnumDescriptorProto[];

      /** DescriptorProto extensionRange. */
      public extensionRange: google.protobuf.DescriptorProto.IExtensionRange[];

      /** DescriptorProto oneofDecl. */
      public oneofDecl: google.protobuf.IOneofDescriptorProto[];

      /** DescriptorProto options. */
      public options?: google.protobuf.IMessageOptions | null;

      /** DescriptorProto reservedRange. */
      public reservedRange: google.protobuf.DescriptorProto.IReservedRange[];

      /** DescriptorProto reservedName. */
      public reservedName: string[];

      /**
       * Creates a new DescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns DescriptorProto instance
       */
      public static create(
        properties?: google.protobuf.IDescriptorProto,
      ): google.protobuf.DescriptorProto;

      /**
       * Encodes the specified DescriptorProto message. Does not implicitly {@link google.protobuf.DescriptorProto.verify|verify} messages.
       * @param message DescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified DescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.verify|verify} messages.
       * @param message DescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a DescriptorProto message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns DescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.DescriptorProto;

      /**
       * Decodes a DescriptorProto message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns DescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.DescriptorProto;

      /**
       * Verifies a DescriptorProto message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a DescriptorProto message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns DescriptorProto
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.DescriptorProto;

      /**
       * Creates a plain object from a DescriptorProto message. Also converts values to other types if specified.
       * @param message DescriptorProto
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.DescriptorProto,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this DescriptorProto to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    namespace DescriptorProto {
      /** Properties of an ExtensionRange. */
      interface IExtensionRange {
        /** ExtensionRange start */
        start?: number | null;

        /** ExtensionRange end */
        end?: number | null;
      }

      /** Represents an ExtensionRange. */
      class ExtensionRange implements IExtensionRange {
        /**
         * Constructs a new ExtensionRange.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: google.protobuf.DescriptorProto.IExtensionRange,
        );

        /** ExtensionRange start. */
        public start: number;

        /** ExtensionRange end. */
        public end: number;

        /**
         * Creates a new ExtensionRange instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExtensionRange instance
         */
        public static create(
          properties?: google.protobuf.DescriptorProto.IExtensionRange,
        ): google.protobuf.DescriptorProto.ExtensionRange;

        /**
         * Encodes the specified ExtensionRange message. Does not implicitly {@link google.protobuf.DescriptorProto.ExtensionRange.verify|verify} messages.
         * @param message ExtensionRange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: google.protobuf.DescriptorProto.IExtensionRange,
          writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Encodes the specified ExtensionRange message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.ExtensionRange.verify|verify} messages.
         * @param message ExtensionRange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: google.protobuf.DescriptorProto.IExtensionRange,
          writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes an ExtensionRange message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExtensionRange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number,
        ): google.protobuf.DescriptorProto.ExtensionRange;

        /**
         * Decodes an ExtensionRange message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExtensionRange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array,
        ): google.protobuf.DescriptorProto.ExtensionRange;

        /**
         * Verifies an ExtensionRange message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates an ExtensionRange message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExtensionRange
         */
        public static fromObject(object: {
          [k: string]: any;
        }): google.protobuf.DescriptorProto.ExtensionRange;

        /**
         * Creates a plain object from an ExtensionRange message. Also converts values to other types if specified.
         * @param message ExtensionRange
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: google.protobuf.DescriptorProto.ExtensionRange,
          options?: $protobuf.IConversionOptions,
        ): { [k: string]: any };

        /**
         * Converts this ExtensionRange to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
      }

      /** Properties of a ReservedRange. */
      interface IReservedRange {
        /** ReservedRange start */
        start?: number | null;

        /** ReservedRange end */
        end?: number | null;
      }

      /** Represents a ReservedRange. */
      class ReservedRange implements IReservedRange {
        /**
         * Constructs a new ReservedRange.
         * @param [properties] Properties to set
         */
        constructor(
          properties?: google.protobuf.DescriptorProto.IReservedRange,
        );

        /** ReservedRange start. */
        public start: number;

        /** ReservedRange end. */
        public end: number;

        /**
         * Creates a new ReservedRange instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReservedRange instance
         */
        public static create(
          properties?: google.protobuf.DescriptorProto.IReservedRange,
        ): google.protobuf.DescriptorProto.ReservedRange;

        /**
         * Encodes the specified ReservedRange message. Does not implicitly {@link google.protobuf.DescriptorProto.ReservedRange.verify|verify} messages.
         * @param message ReservedRange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: google.protobuf.DescriptorProto.IReservedRange,
          writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Encodes the specified ReservedRange message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.ReservedRange.verify|verify} messages.
         * @param message ReservedRange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: google.protobuf.DescriptorProto.IReservedRange,
          writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ReservedRange message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReservedRange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number,
        ): google.protobuf.DescriptorProto.ReservedRange;

        /**
         * Decodes a ReservedRange message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReservedRange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array,
        ): google.protobuf.DescriptorProto.ReservedRange;

        /**
         * Verifies a ReservedRange message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a ReservedRange message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReservedRange
         */
        public static fromObject(object: {
          [k: string]: any;
        }): google.protobuf.DescriptorProto.ReservedRange;

        /**
         * Creates a plain object from a ReservedRange message. Also converts values to other types if specified.
         * @param message ReservedRange
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: google.protobuf.DescriptorProto.ReservedRange,
          options?: $protobuf.IConversionOptions,
        ): { [k: string]: any };

        /**
         * Converts this ReservedRange to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
      }
    }

    /** Properties of a FieldDescriptorProto. */
    interface IFieldDescriptorProto {
      /** FieldDescriptorProto name */
      name?: string | null;

      /** FieldDescriptorProto number */
      number?: number | null;

      /** FieldDescriptorProto label */
      label?: google.protobuf.FieldDescriptorProto.Label | null;

      /** FieldDescriptorProto type */
      type?: google.protobuf.FieldDescriptorProto.Type | null;

      /** FieldDescriptorProto typeName */
      typeName?: string | null;

      /** FieldDescriptorProto extendee */
      extendee?: string | null;

      /** FieldDescriptorProto defaultValue */
      defaultValue?: string | null;

      /** FieldDescriptorProto oneofIndex */
      oneofIndex?: number | null;

      /** FieldDescriptorProto jsonName */
      jsonName?: string | null;

      /** FieldDescriptorProto options */
      options?: google.protobuf.IFieldOptions | null;
    }

    /** Represents a FieldDescriptorProto. */
    class FieldDescriptorProto implements IFieldDescriptorProto {
      /**
       * Constructs a new FieldDescriptorProto.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IFieldDescriptorProto);

      /** FieldDescriptorProto name. */
      public name: string;

      /** FieldDescriptorProto number. */
      public number: number;

      /** FieldDescriptorProto label. */
      public label: google.protobuf.FieldDescriptorProto.Label;

      /** FieldDescriptorProto type. */
      public type: google.protobuf.FieldDescriptorProto.Type;

      /** FieldDescriptorProto typeName. */
      public typeName: string;

      /** FieldDescriptorProto extendee. */
      public extendee: string;

      /** FieldDescriptorProto defaultValue. */
      public defaultValue: string;

      /** FieldDescriptorProto oneofIndex. */
      public oneofIndex: number;

      /** FieldDescriptorProto jsonName. */
      public jsonName: string;

      /** FieldDescriptorProto options. */
      public options?: google.protobuf.IFieldOptions | null;

      /**
       * Creates a new FieldDescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns FieldDescriptorProto instance
       */
      public static create(
        properties?: google.protobuf.IFieldDescriptorProto,
      ): google.protobuf.FieldDescriptorProto;

      /**
       * Encodes the specified FieldDescriptorProto message. Does not implicitly {@link google.protobuf.FieldDescriptorProto.verify|verify} messages.
       * @param message FieldDescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IFieldDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified FieldDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.FieldDescriptorProto.verify|verify} messages.
       * @param message FieldDescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IFieldDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a FieldDescriptorProto message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns FieldDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.FieldDescriptorProto;

      /**
       * Decodes a FieldDescriptorProto message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns FieldDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.FieldDescriptorProto;

      /**
       * Verifies a FieldDescriptorProto message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a FieldDescriptorProto message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns FieldDescriptorProto
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.FieldDescriptorProto;

      /**
       * Creates a plain object from a FieldDescriptorProto message. Also converts values to other types if specified.
       * @param message FieldDescriptorProto
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.FieldDescriptorProto,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this FieldDescriptorProto to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    namespace FieldDescriptorProto {
      /** Type enum. */
      enum Type {
        TYPE_DOUBLE = 1,
        TYPE_FLOAT = 2,
        TYPE_INT64 = 3,
        TYPE_UINT64 = 4,
        TYPE_INT32 = 5,
        TYPE_FIXED64 = 6,
        TYPE_FIXED32 = 7,
        TYPE_BOOL = 8,
        TYPE_STRING = 9,
        TYPE_GROUP = 10,
        TYPE_MESSAGE = 11,
        TYPE_BYTES = 12,
        TYPE_UINT32 = 13,
        TYPE_ENUM = 14,
        TYPE_SFIXED32 = 15,
        TYPE_SFIXED64 = 16,
        TYPE_SINT32 = 17,
        TYPE_SINT64 = 18,
      }

      /** Label enum. */
      enum Label {
        LABEL_OPTIONAL = 1,
        LABEL_REQUIRED = 2,
        LABEL_REPEATED = 3,
      }
    }

    /** Properties of an OneofDescriptorProto. */
    interface IOneofDescriptorProto {
      /** OneofDescriptorProto name */
      name?: string | null;

      /** OneofDescriptorProto options */
      options?: google.protobuf.IOneofOptions | null;
    }

    /** Represents an OneofDescriptorProto. */
    class OneofDescriptorProto implements IOneofDescriptorProto {
      /**
       * Constructs a new OneofDescriptorProto.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IOneofDescriptorProto);

      /** OneofDescriptorProto name. */
      public name: string;

      /** OneofDescriptorProto options. */
      public options?: google.protobuf.IOneofOptions | null;

      /**
       * Creates a new OneofDescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns OneofDescriptorProto instance
       */
      public static create(
        properties?: google.protobuf.IOneofDescriptorProto,
      ): google.protobuf.OneofDescriptorProto;

      /**
       * Encodes the specified OneofDescriptorProto message. Does not implicitly {@link google.protobuf.OneofDescriptorProto.verify|verify} messages.
       * @param message OneofDescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IOneofDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified OneofDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.OneofDescriptorProto.verify|verify} messages.
       * @param message OneofDescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IOneofDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes an OneofDescriptorProto message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns OneofDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.OneofDescriptorProto;

      /**
       * Decodes an OneofDescriptorProto message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns OneofDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.OneofDescriptorProto;

      /**
       * Verifies an OneofDescriptorProto message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates an OneofDescriptorProto message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns OneofDescriptorProto
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.OneofDescriptorProto;

      /**
       * Creates a plain object from an OneofDescriptorProto message. Also converts values to other types if specified.
       * @param message OneofDescriptorProto
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.OneofDescriptorProto,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this OneofDescriptorProto to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of an EnumDescriptorProto. */
    interface IEnumDescriptorProto {
      /** EnumDescriptorProto name */
      name?: string | null;

      /** EnumDescriptorProto value */
      value?: google.protobuf.IEnumValueDescriptorProto[] | null;

      /** EnumDescriptorProto options */
      options?: google.protobuf.IEnumOptions | null;
    }

    /** Represents an EnumDescriptorProto. */
    class EnumDescriptorProto implements IEnumDescriptorProto {
      /**
       * Constructs a new EnumDescriptorProto.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IEnumDescriptorProto);

      /** EnumDescriptorProto name. */
      public name: string;

      /** EnumDescriptorProto value. */
      public value: google.protobuf.IEnumValueDescriptorProto[];

      /** EnumDescriptorProto options. */
      public options?: google.protobuf.IEnumOptions | null;

      /**
       * Creates a new EnumDescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns EnumDescriptorProto instance
       */
      public static create(
        properties?: google.protobuf.IEnumDescriptorProto,
      ): google.protobuf.EnumDescriptorProto;

      /**
       * Encodes the specified EnumDescriptorProto message. Does not implicitly {@link google.protobuf.EnumDescriptorProto.verify|verify} messages.
       * @param message EnumDescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IEnumDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified EnumDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.EnumDescriptorProto.verify|verify} messages.
       * @param message EnumDescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IEnumDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes an EnumDescriptorProto message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns EnumDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.EnumDescriptorProto;

      /**
       * Decodes an EnumDescriptorProto message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns EnumDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.EnumDescriptorProto;

      /**
       * Verifies an EnumDescriptorProto message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates an EnumDescriptorProto message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns EnumDescriptorProto
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.EnumDescriptorProto;

      /**
       * Creates a plain object from an EnumDescriptorProto message. Also converts values to other types if specified.
       * @param message EnumDescriptorProto
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.EnumDescriptorProto,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this EnumDescriptorProto to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of an EnumValueDescriptorProto. */
    interface IEnumValueDescriptorProto {
      /** EnumValueDescriptorProto name */
      name?: string | null;

      /** EnumValueDescriptorProto number */
      number?: number | null;

      /** EnumValueDescriptorProto options */
      options?: google.protobuf.IEnumValueOptions | null;
    }

    /** Represents an EnumValueDescriptorProto. */
    class EnumValueDescriptorProto implements IEnumValueDescriptorProto {
      /**
       * Constructs a new EnumValueDescriptorProto.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IEnumValueDescriptorProto);

      /** EnumValueDescriptorProto name. */
      public name: string;

      /** EnumValueDescriptorProto number. */
      public number: number;

      /** EnumValueDescriptorProto options. */
      public options?: google.protobuf.IEnumValueOptions | null;

      /**
       * Creates a new EnumValueDescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns EnumValueDescriptorProto instance
       */
      public static create(
        properties?: google.protobuf.IEnumValueDescriptorProto,
      ): google.protobuf.EnumValueDescriptorProto;

      /**
       * Encodes the specified EnumValueDescriptorProto message. Does not implicitly {@link google.protobuf.EnumValueDescriptorProto.verify|verify} messages.
       * @param message EnumValueDescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IEnumValueDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified EnumValueDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.EnumValueDescriptorProto.verify|verify} messages.
       * @param message EnumValueDescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IEnumValueDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes an EnumValueDescriptorProto message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns EnumValueDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.EnumValueDescriptorProto;

      /**
       * Decodes an EnumValueDescriptorProto message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns EnumValueDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.EnumValueDescriptorProto;

      /**
       * Verifies an EnumValueDescriptorProto message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates an EnumValueDescriptorProto message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns EnumValueDescriptorProto
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.EnumValueDescriptorProto;

      /**
       * Creates a plain object from an EnumValueDescriptorProto message. Also converts values to other types if specified.
       * @param message EnumValueDescriptorProto
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.EnumValueDescriptorProto,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this EnumValueDescriptorProto to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a ServiceDescriptorProto. */
    interface IServiceDescriptorProto {
      /** ServiceDescriptorProto name */
      name?: string | null;

      /** ServiceDescriptorProto method */
      method?: google.protobuf.IMethodDescriptorProto[] | null;

      /** ServiceDescriptorProto options */
      options?: google.protobuf.IServiceOptions | null;
    }

    /** Represents a ServiceDescriptorProto. */
    class ServiceDescriptorProto implements IServiceDescriptorProto {
      /**
       * Constructs a new ServiceDescriptorProto.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IServiceDescriptorProto);

      /** ServiceDescriptorProto name. */
      public name: string;

      /** ServiceDescriptorProto method. */
      public method: google.protobuf.IMethodDescriptorProto[];

      /** ServiceDescriptorProto options. */
      public options?: google.protobuf.IServiceOptions | null;

      /**
       * Creates a new ServiceDescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ServiceDescriptorProto instance
       */
      public static create(
        properties?: google.protobuf.IServiceDescriptorProto,
      ): google.protobuf.ServiceDescriptorProto;

      /**
       * Encodes the specified ServiceDescriptorProto message. Does not implicitly {@link google.protobuf.ServiceDescriptorProto.verify|verify} messages.
       * @param message ServiceDescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IServiceDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified ServiceDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.ServiceDescriptorProto.verify|verify} messages.
       * @param message ServiceDescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IServiceDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a ServiceDescriptorProto message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns ServiceDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.ServiceDescriptorProto;

      /**
       * Decodes a ServiceDescriptorProto message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns ServiceDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.ServiceDescriptorProto;

      /**
       * Verifies a ServiceDescriptorProto message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a ServiceDescriptorProto message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns ServiceDescriptorProto
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.ServiceDescriptorProto;

      /**
       * Creates a plain object from a ServiceDescriptorProto message. Also converts values to other types if specified.
       * @param message ServiceDescriptorProto
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.ServiceDescriptorProto,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this ServiceDescriptorProto to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a MethodDescriptorProto. */
    interface IMethodDescriptorProto {
      /** MethodDescriptorProto name */
      name?: string | null;

      /** MethodDescriptorProto inputType */
      inputType?: string | null;

      /** MethodDescriptorProto outputType */
      outputType?: string | null;

      /** MethodDescriptorProto options */
      options?: google.protobuf.IMethodOptions | null;

      /** MethodDescriptorProto clientStreaming */
      clientStreaming?: boolean | null;

      /** MethodDescriptorProto serverStreaming */
      serverStreaming?: boolean | null;
    }

    /** Represents a MethodDescriptorProto. */
    class MethodDescriptorProto implements IMethodDescriptorProto {
      /**
       * Constructs a new MethodDescriptorProto.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IMethodDescriptorProto);

      /** MethodDescriptorProto name. */
      public name: string;

      /** MethodDescriptorProto inputType. */
      public inputType: string;

      /** MethodDescriptorProto outputType. */
      public outputType: string;

      /** MethodDescriptorProto options. */
      public options?: google.protobuf.IMethodOptions | null;

      /** MethodDescriptorProto clientStreaming. */
      public clientStreaming: boolean;

      /** MethodDescriptorProto serverStreaming. */
      public serverStreaming: boolean;

      /**
       * Creates a new MethodDescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns MethodDescriptorProto instance
       */
      public static create(
        properties?: google.protobuf.IMethodDescriptorProto,
      ): google.protobuf.MethodDescriptorProto;

      /**
       * Encodes the specified MethodDescriptorProto message. Does not implicitly {@link google.protobuf.MethodDescriptorProto.verify|verify} messages.
       * @param message MethodDescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IMethodDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified MethodDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.MethodDescriptorProto.verify|verify} messages.
       * @param message MethodDescriptorProto message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IMethodDescriptorProto,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a MethodDescriptorProto message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns MethodDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.MethodDescriptorProto;

      /**
       * Decodes a MethodDescriptorProto message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns MethodDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.MethodDescriptorProto;

      /**
       * Verifies a MethodDescriptorProto message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a MethodDescriptorProto message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns MethodDescriptorProto
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.MethodDescriptorProto;

      /**
       * Creates a plain object from a MethodDescriptorProto message. Also converts values to other types if specified.
       * @param message MethodDescriptorProto
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.MethodDescriptorProto,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this MethodDescriptorProto to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a FileOptions. */
    interface IFileOptions {
      /** FileOptions javaPackage */
      javaPackage?: string | null;

      /** FileOptions javaOuterClassname */
      javaOuterClassname?: string | null;

      /** FileOptions javaMultipleFiles */
      javaMultipleFiles?: boolean | null;

      /** FileOptions javaGenerateEqualsAndHash */
      javaGenerateEqualsAndHash?: boolean | null;

      /** FileOptions javaStringCheckUtf8 */
      javaStringCheckUtf8?: boolean | null;

      /** FileOptions optimizeFor */
      optimizeFor?: google.protobuf.FileOptions.OptimizeMode | null;

      /** FileOptions goPackage */
      goPackage?: string | null;

      /** FileOptions ccGenericServices */
      ccGenericServices?: boolean | null;

      /** FileOptions javaGenericServices */
      javaGenericServices?: boolean | null;

      /** FileOptions pyGenericServices */
      pyGenericServices?: boolean | null;

      /** FileOptions deprecated */
      deprecated?: boolean | null;

      /** FileOptions ccEnableArenas */
      ccEnableArenas?: boolean | null;

      /** FileOptions objcClassPrefix */
      objcClassPrefix?: string | null;

      /** FileOptions csharpNamespace */
      csharpNamespace?: string | null;

      /** FileOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;
    }

    /** Represents a FileOptions. */
    class FileOptions implements IFileOptions {
      /**
       * Constructs a new FileOptions.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IFileOptions);

      /** FileOptions javaPackage. */
      public javaPackage: string;

      /** FileOptions javaOuterClassname. */
      public javaOuterClassname: string;

      /** FileOptions javaMultipleFiles. */
      public javaMultipleFiles: boolean;

      /** FileOptions javaGenerateEqualsAndHash. */
      public javaGenerateEqualsAndHash: boolean;

      /** FileOptions javaStringCheckUtf8. */
      public javaStringCheckUtf8: boolean;

      /** FileOptions optimizeFor. */
      public optimizeFor: google.protobuf.FileOptions.OptimizeMode;

      /** FileOptions goPackage. */
      public goPackage: string;

      /** FileOptions ccGenericServices. */
      public ccGenericServices: boolean;

      /** FileOptions javaGenericServices. */
      public javaGenericServices: boolean;

      /** FileOptions pyGenericServices. */
      public pyGenericServices: boolean;

      /** FileOptions deprecated. */
      public deprecated: boolean;

      /** FileOptions ccEnableArenas. */
      public ccEnableArenas: boolean;

      /** FileOptions objcClassPrefix. */
      public objcClassPrefix: string;

      /** FileOptions csharpNamespace. */
      public csharpNamespace: string;

      /** FileOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new FileOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns FileOptions instance
       */
      public static create(
        properties?: google.protobuf.IFileOptions,
      ): google.protobuf.FileOptions;

      /**
       * Encodes the specified FileOptions message. Does not implicitly {@link google.protobuf.FileOptions.verify|verify} messages.
       * @param message FileOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IFileOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified FileOptions message, length delimited. Does not implicitly {@link google.protobuf.FileOptions.verify|verify} messages.
       * @param message FileOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IFileOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a FileOptions message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns FileOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.FileOptions;

      /**
       * Decodes a FileOptions message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns FileOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.FileOptions;

      /**
       * Verifies a FileOptions message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a FileOptions message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns FileOptions
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.FileOptions;

      /**
       * Creates a plain object from a FileOptions message. Also converts values to other types if specified.
       * @param message FileOptions
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.FileOptions,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this FileOptions to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    namespace FileOptions {
      /** OptimizeMode enum. */
      enum OptimizeMode {
        SPEED = 1,
        CODE_SIZE = 2,
        LITE_RUNTIME = 3,
      }
    }

    /** Properties of a MessageOptions. */
    interface IMessageOptions {
      /** MessageOptions messageSetWireFormat */
      messageSetWireFormat?: boolean | null;

      /** MessageOptions noStandardDescriptorAccessor */
      noStandardDescriptorAccessor?: boolean | null;

      /** MessageOptions deprecated */
      deprecated?: boolean | null;

      /** MessageOptions mapEntry */
      mapEntry?: boolean | null;

      /** MessageOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;
    }

    /** Represents a MessageOptions. */
    class MessageOptions implements IMessageOptions {
      /**
       * Constructs a new MessageOptions.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IMessageOptions);

      /** MessageOptions messageSetWireFormat. */
      public messageSetWireFormat: boolean;

      /** MessageOptions noStandardDescriptorAccessor. */
      public noStandardDescriptorAccessor: boolean;

      /** MessageOptions deprecated. */
      public deprecated: boolean;

      /** MessageOptions mapEntry. */
      public mapEntry: boolean;

      /** MessageOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new MessageOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns MessageOptions instance
       */
      public static create(
        properties?: google.protobuf.IMessageOptions,
      ): google.protobuf.MessageOptions;

      /**
       * Encodes the specified MessageOptions message. Does not implicitly {@link google.protobuf.MessageOptions.verify|verify} messages.
       * @param message MessageOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IMessageOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified MessageOptions message, length delimited. Does not implicitly {@link google.protobuf.MessageOptions.verify|verify} messages.
       * @param message MessageOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IMessageOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a MessageOptions message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns MessageOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.MessageOptions;

      /**
       * Decodes a MessageOptions message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns MessageOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.MessageOptions;

      /**
       * Verifies a MessageOptions message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a MessageOptions message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns MessageOptions
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.MessageOptions;

      /**
       * Creates a plain object from a MessageOptions message. Also converts values to other types if specified.
       * @param message MessageOptions
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.MessageOptions,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this MessageOptions to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a FieldOptions. */
    interface IFieldOptions {
      /** FieldOptions ctype */
      ctype?: google.protobuf.FieldOptions.CType | null;

      /** FieldOptions packed */
      packed?: boolean | null;

      /** FieldOptions jstype */
      jstype?: google.protobuf.FieldOptions.JSType | null;

      /** FieldOptions lazy */
      lazy?: boolean | null;

      /** FieldOptions deprecated */
      deprecated?: boolean | null;

      /** FieldOptions weak */
      weak?: boolean | null;

      /** FieldOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;

      /** FieldOptions .koinos.btype */
      '.koinos.btype'?: koinos.bytes_type | null;
    }

    /** Represents a FieldOptions. */
    class FieldOptions implements IFieldOptions {
      /**
       * Constructs a new FieldOptions.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IFieldOptions);

      /** FieldOptions ctype. */
      public ctype: google.protobuf.FieldOptions.CType;

      /** FieldOptions packed. */
      public packed: boolean;

      /** FieldOptions jstype. */
      public jstype: google.protobuf.FieldOptions.JSType;

      /** FieldOptions lazy. */
      public lazy: boolean;

      /** FieldOptions deprecated. */
      public deprecated: boolean;

      /** FieldOptions weak. */
      public weak: boolean;

      /** FieldOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new FieldOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns FieldOptions instance
       */
      public static create(
        properties?: google.protobuf.IFieldOptions,
      ): google.protobuf.FieldOptions;

      /**
       * Encodes the specified FieldOptions message. Does not implicitly {@link google.protobuf.FieldOptions.verify|verify} messages.
       * @param message FieldOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IFieldOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified FieldOptions message, length delimited. Does not implicitly {@link google.protobuf.FieldOptions.verify|verify} messages.
       * @param message FieldOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IFieldOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a FieldOptions message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns FieldOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.FieldOptions;

      /**
       * Decodes a FieldOptions message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns FieldOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.FieldOptions;

      /**
       * Verifies a FieldOptions message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a FieldOptions message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns FieldOptions
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.FieldOptions;

      /**
       * Creates a plain object from a FieldOptions message. Also converts values to other types if specified.
       * @param message FieldOptions
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.FieldOptions,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this FieldOptions to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    namespace FieldOptions {
      /** CType enum. */
      enum CType {
        STRING = 0,
        CORD = 1,
        STRING_PIECE = 2,
      }

      /** JSType enum. */
      enum JSType {
        JS_NORMAL = 0,
        JS_STRING = 1,
        JS_NUMBER = 2,
      }
    }

    /** Properties of an OneofOptions. */
    interface IOneofOptions {
      /** OneofOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;
    }

    /** Represents an OneofOptions. */
    class OneofOptions implements IOneofOptions {
      /**
       * Constructs a new OneofOptions.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IOneofOptions);

      /** OneofOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new OneofOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns OneofOptions instance
       */
      public static create(
        properties?: google.protobuf.IOneofOptions,
      ): google.protobuf.OneofOptions;

      /**
       * Encodes the specified OneofOptions message. Does not implicitly {@link google.protobuf.OneofOptions.verify|verify} messages.
       * @param message OneofOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IOneofOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified OneofOptions message, length delimited. Does not implicitly {@link google.protobuf.OneofOptions.verify|verify} messages.
       * @param message OneofOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IOneofOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes an OneofOptions message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns OneofOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.OneofOptions;

      /**
       * Decodes an OneofOptions message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns OneofOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.OneofOptions;

      /**
       * Verifies an OneofOptions message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates an OneofOptions message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns OneofOptions
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.OneofOptions;

      /**
       * Creates a plain object from an OneofOptions message. Also converts values to other types if specified.
       * @param message OneofOptions
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.OneofOptions,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this OneofOptions to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of an EnumOptions. */
    interface IEnumOptions {
      /** EnumOptions allowAlias */
      allowAlias?: boolean | null;

      /** EnumOptions deprecated */
      deprecated?: boolean | null;

      /** EnumOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;
    }

    /** Represents an EnumOptions. */
    class EnumOptions implements IEnumOptions {
      /**
       * Constructs a new EnumOptions.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IEnumOptions);

      /** EnumOptions allowAlias. */
      public allowAlias: boolean;

      /** EnumOptions deprecated. */
      public deprecated: boolean;

      /** EnumOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new EnumOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns EnumOptions instance
       */
      public static create(
        properties?: google.protobuf.IEnumOptions,
      ): google.protobuf.EnumOptions;

      /**
       * Encodes the specified EnumOptions message. Does not implicitly {@link google.protobuf.EnumOptions.verify|verify} messages.
       * @param message EnumOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IEnumOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified EnumOptions message, length delimited. Does not implicitly {@link google.protobuf.EnumOptions.verify|verify} messages.
       * @param message EnumOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IEnumOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes an EnumOptions message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns EnumOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.EnumOptions;

      /**
       * Decodes an EnumOptions message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns EnumOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.EnumOptions;

      /**
       * Verifies an EnumOptions message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates an EnumOptions message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns EnumOptions
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.EnumOptions;

      /**
       * Creates a plain object from an EnumOptions message. Also converts values to other types if specified.
       * @param message EnumOptions
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.EnumOptions,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this EnumOptions to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of an EnumValueOptions. */
    interface IEnumValueOptions {
      /** EnumValueOptions deprecated */
      deprecated?: boolean | null;

      /** EnumValueOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;
    }

    /** Represents an EnumValueOptions. */
    class EnumValueOptions implements IEnumValueOptions {
      /**
       * Constructs a new EnumValueOptions.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IEnumValueOptions);

      /** EnumValueOptions deprecated. */
      public deprecated: boolean;

      /** EnumValueOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new EnumValueOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns EnumValueOptions instance
       */
      public static create(
        properties?: google.protobuf.IEnumValueOptions,
      ): google.protobuf.EnumValueOptions;

      /**
       * Encodes the specified EnumValueOptions message. Does not implicitly {@link google.protobuf.EnumValueOptions.verify|verify} messages.
       * @param message EnumValueOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IEnumValueOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified EnumValueOptions message, length delimited. Does not implicitly {@link google.protobuf.EnumValueOptions.verify|verify} messages.
       * @param message EnumValueOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IEnumValueOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes an EnumValueOptions message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns EnumValueOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.EnumValueOptions;

      /**
       * Decodes an EnumValueOptions message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns EnumValueOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.EnumValueOptions;

      /**
       * Verifies an EnumValueOptions message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates an EnumValueOptions message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns EnumValueOptions
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.EnumValueOptions;

      /**
       * Creates a plain object from an EnumValueOptions message. Also converts values to other types if specified.
       * @param message EnumValueOptions
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.EnumValueOptions,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this EnumValueOptions to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a ServiceOptions. */
    interface IServiceOptions {
      /** ServiceOptions deprecated */
      deprecated?: boolean | null;

      /** ServiceOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;
    }

    /** Represents a ServiceOptions. */
    class ServiceOptions implements IServiceOptions {
      /**
       * Constructs a new ServiceOptions.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IServiceOptions);

      /** ServiceOptions deprecated. */
      public deprecated: boolean;

      /** ServiceOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new ServiceOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ServiceOptions instance
       */
      public static create(
        properties?: google.protobuf.IServiceOptions,
      ): google.protobuf.ServiceOptions;

      /**
       * Encodes the specified ServiceOptions message. Does not implicitly {@link google.protobuf.ServiceOptions.verify|verify} messages.
       * @param message ServiceOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IServiceOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified ServiceOptions message, length delimited. Does not implicitly {@link google.protobuf.ServiceOptions.verify|verify} messages.
       * @param message ServiceOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IServiceOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a ServiceOptions message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns ServiceOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.ServiceOptions;

      /**
       * Decodes a ServiceOptions message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns ServiceOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.ServiceOptions;

      /**
       * Verifies a ServiceOptions message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a ServiceOptions message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns ServiceOptions
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.ServiceOptions;

      /**
       * Creates a plain object from a ServiceOptions message. Also converts values to other types if specified.
       * @param message ServiceOptions
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.ServiceOptions,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this ServiceOptions to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of a MethodOptions. */
    interface IMethodOptions {
      /** MethodOptions deprecated */
      deprecated?: boolean | null;

      /** MethodOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;
    }

    /** Represents a MethodOptions. */
    class MethodOptions implements IMethodOptions {
      /**
       * Constructs a new MethodOptions.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IMethodOptions);

      /** MethodOptions deprecated. */
      public deprecated: boolean;

      /** MethodOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new MethodOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns MethodOptions instance
       */
      public static create(
        properties?: google.protobuf.IMethodOptions,
      ): google.protobuf.MethodOptions;

      /**
       * Encodes the specified MethodOptions message. Does not implicitly {@link google.protobuf.MethodOptions.verify|verify} messages.
       * @param message MethodOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IMethodOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified MethodOptions message, length delimited. Does not implicitly {@link google.protobuf.MethodOptions.verify|verify} messages.
       * @param message MethodOptions message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IMethodOptions,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a MethodOptions message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns MethodOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.MethodOptions;

      /**
       * Decodes a MethodOptions message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns MethodOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.MethodOptions;

      /**
       * Verifies a MethodOptions message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a MethodOptions message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns MethodOptions
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.MethodOptions;

      /**
       * Creates a plain object from a MethodOptions message. Also converts values to other types if specified.
       * @param message MethodOptions
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.MethodOptions,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this MethodOptions to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    /** Properties of an UninterpretedOption. */
    interface IUninterpretedOption {
      /** UninterpretedOption name */
      name?: google.protobuf.UninterpretedOption.INamePart[] | null;

      /** UninterpretedOption identifierValue */
      identifierValue?: string | null;

      /** UninterpretedOption positiveIntValue */
      positiveIntValue?: number | Long | null;

      /** UninterpretedOption negativeIntValue */
      negativeIntValue?: number | Long | null;

      /** UninterpretedOption doubleValue */
      doubleValue?: number | null;

      /** UninterpretedOption stringValue */
      stringValue?: Uint8Array | null;

      /** UninterpretedOption aggregateValue */
      aggregateValue?: string | null;
    }

    /** Represents an UninterpretedOption. */
    class UninterpretedOption implements IUninterpretedOption {
      /**
       * Constructs a new UninterpretedOption.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IUninterpretedOption);

      /** UninterpretedOption name. */
      public name: google.protobuf.UninterpretedOption.INamePart[];

      /** UninterpretedOption identifierValue. */
      public identifierValue: string;

      /** UninterpretedOption positiveIntValue. */
      public positiveIntValue: number | Long;

      /** UninterpretedOption negativeIntValue. */
      public negativeIntValue: number | Long;

      /** UninterpretedOption doubleValue. */
      public doubleValue: number;

      /** UninterpretedOption stringValue. */
      public stringValue: Uint8Array;

      /** UninterpretedOption aggregateValue. */
      public aggregateValue: string;

      /**
       * Creates a new UninterpretedOption instance using the specified properties.
       * @param [properties] Properties to set
       * @returns UninterpretedOption instance
       */
      public static create(
        properties?: google.protobuf.IUninterpretedOption,
      ): google.protobuf.UninterpretedOption;

      /**
       * Encodes the specified UninterpretedOption message. Does not implicitly {@link google.protobuf.UninterpretedOption.verify|verify} messages.
       * @param message UninterpretedOption message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IUninterpretedOption,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified UninterpretedOption message, length delimited. Does not implicitly {@link google.protobuf.UninterpretedOption.verify|verify} messages.
       * @param message UninterpretedOption message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IUninterpretedOption,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes an UninterpretedOption message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns UninterpretedOption
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.UninterpretedOption;

      /**
       * Decodes an UninterpretedOption message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns UninterpretedOption
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.UninterpretedOption;

      /**
       * Verifies an UninterpretedOption message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates an UninterpretedOption message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns UninterpretedOption
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.UninterpretedOption;

      /**
       * Creates a plain object from an UninterpretedOption message. Also converts values to other types if specified.
       * @param message UninterpretedOption
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.UninterpretedOption,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this UninterpretedOption to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    namespace UninterpretedOption {
      /** Properties of a NamePart. */
      interface INamePart {
        /** NamePart namePart */
        namePart: string;

        /** NamePart isExtension */
        isExtension: boolean;
      }

      /** Represents a NamePart. */
      class NamePart implements INamePart {
        /**
         * Constructs a new NamePart.
         * @param [properties] Properties to set
         */
        constructor(properties?: google.protobuf.UninterpretedOption.INamePart);

        /** NamePart namePart. */
        public namePart: string;

        /** NamePart isExtension. */
        public isExtension: boolean;

        /**
         * Creates a new NamePart instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NamePart instance
         */
        public static create(
          properties?: google.protobuf.UninterpretedOption.INamePart,
        ): google.protobuf.UninterpretedOption.NamePart;

        /**
         * Encodes the specified NamePart message. Does not implicitly {@link google.protobuf.UninterpretedOption.NamePart.verify|verify} messages.
         * @param message NamePart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: google.protobuf.UninterpretedOption.INamePart,
          writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Encodes the specified NamePart message, length delimited. Does not implicitly {@link google.protobuf.UninterpretedOption.NamePart.verify|verify} messages.
         * @param message NamePart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: google.protobuf.UninterpretedOption.INamePart,
          writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a NamePart message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NamePart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number,
        ): google.protobuf.UninterpretedOption.NamePart;

        /**
         * Decodes a NamePart message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NamePart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array,
        ): google.protobuf.UninterpretedOption.NamePart;

        /**
         * Verifies a NamePart message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a NamePart message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NamePart
         */
        public static fromObject(object: {
          [k: string]: any;
        }): google.protobuf.UninterpretedOption.NamePart;

        /**
         * Creates a plain object from a NamePart message. Also converts values to other types if specified.
         * @param message NamePart
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: google.protobuf.UninterpretedOption.NamePart,
          options?: $protobuf.IConversionOptions,
        ): { [k: string]: any };

        /**
         * Converts this NamePart to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
      }
    }

    /** Properties of a SourceCodeInfo. */
    interface ISourceCodeInfo {
      /** SourceCodeInfo location */
      location?: google.protobuf.SourceCodeInfo.ILocation[] | null;
    }

    /** Represents a SourceCodeInfo. */
    class SourceCodeInfo implements ISourceCodeInfo {
      /**
       * Constructs a new SourceCodeInfo.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.ISourceCodeInfo);

      /** SourceCodeInfo location. */
      public location: google.protobuf.SourceCodeInfo.ILocation[];

      /**
       * Creates a new SourceCodeInfo instance using the specified properties.
       * @param [properties] Properties to set
       * @returns SourceCodeInfo instance
       */
      public static create(
        properties?: google.protobuf.ISourceCodeInfo,
      ): google.protobuf.SourceCodeInfo;

      /**
       * Encodes the specified SourceCodeInfo message. Does not implicitly {@link google.protobuf.SourceCodeInfo.verify|verify} messages.
       * @param message SourceCodeInfo message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.ISourceCodeInfo,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified SourceCodeInfo message, length delimited. Does not implicitly {@link google.protobuf.SourceCodeInfo.verify|verify} messages.
       * @param message SourceCodeInfo message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.ISourceCodeInfo,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a SourceCodeInfo message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns SourceCodeInfo
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.SourceCodeInfo;

      /**
       * Decodes a SourceCodeInfo message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns SourceCodeInfo
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.SourceCodeInfo;

      /**
       * Verifies a SourceCodeInfo message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a SourceCodeInfo message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns SourceCodeInfo
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.SourceCodeInfo;

      /**
       * Creates a plain object from a SourceCodeInfo message. Also converts values to other types if specified.
       * @param message SourceCodeInfo
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.SourceCodeInfo,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this SourceCodeInfo to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    namespace SourceCodeInfo {
      /** Properties of a Location. */
      interface ILocation {
        /** Location path */
        path?: number[] | null;

        /** Location span */
        span?: number[] | null;

        /** Location leadingComments */
        leadingComments?: string | null;

        /** Location trailingComments */
        trailingComments?: string | null;

        /** Location leadingDetachedComments */
        leadingDetachedComments?: string[] | null;
      }

      /** Represents a Location. */
      class Location implements ILocation {
        /**
         * Constructs a new Location.
         * @param [properties] Properties to set
         */
        constructor(properties?: google.protobuf.SourceCodeInfo.ILocation);

        /** Location path. */
        public path: number[];

        /** Location span. */
        public span: number[];

        /** Location leadingComments. */
        public leadingComments: string;

        /** Location trailingComments. */
        public trailingComments: string;

        /** Location leadingDetachedComments. */
        public leadingDetachedComments: string[];

        /**
         * Creates a new Location instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Location instance
         */
        public static create(
          properties?: google.protobuf.SourceCodeInfo.ILocation,
        ): google.protobuf.SourceCodeInfo.Location;

        /**
         * Encodes the specified Location message. Does not implicitly {@link google.protobuf.SourceCodeInfo.Location.verify|verify} messages.
         * @param message Location message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: google.protobuf.SourceCodeInfo.ILocation,
          writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Encodes the specified Location message, length delimited. Does not implicitly {@link google.protobuf.SourceCodeInfo.Location.verify|verify} messages.
         * @param message Location message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: google.protobuf.SourceCodeInfo.ILocation,
          writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a Location message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Location
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number,
        ): google.protobuf.SourceCodeInfo.Location;

        /**
         * Decodes a Location message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Location
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array,
        ): google.protobuf.SourceCodeInfo.Location;

        /**
         * Verifies a Location message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a Location message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Location
         */
        public static fromObject(object: {
          [k: string]: any;
        }): google.protobuf.SourceCodeInfo.Location;

        /**
         * Creates a plain object from a Location message. Also converts values to other types if specified.
         * @param message Location
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: google.protobuf.SourceCodeInfo.Location,
          options?: $protobuf.IConversionOptions,
        ): { [k: string]: any };

        /**
         * Converts this Location to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
      }
    }

    /** Properties of a GeneratedCodeInfo. */
    interface IGeneratedCodeInfo {
      /** GeneratedCodeInfo annotation */
      annotation?: google.protobuf.GeneratedCodeInfo.IAnnotation[] | null;
    }

    /** Represents a GeneratedCodeInfo. */
    class GeneratedCodeInfo implements IGeneratedCodeInfo {
      /**
       * Constructs a new GeneratedCodeInfo.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IGeneratedCodeInfo);

      /** GeneratedCodeInfo annotation. */
      public annotation: google.protobuf.GeneratedCodeInfo.IAnnotation[];

      /**
       * Creates a new GeneratedCodeInfo instance using the specified properties.
       * @param [properties] Properties to set
       * @returns GeneratedCodeInfo instance
       */
      public static create(
        properties?: google.protobuf.IGeneratedCodeInfo,
      ): google.protobuf.GeneratedCodeInfo;

      /**
       * Encodes the specified GeneratedCodeInfo message. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.verify|verify} messages.
       * @param message GeneratedCodeInfo message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IGeneratedCodeInfo,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified GeneratedCodeInfo message, length delimited. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.verify|verify} messages.
       * @param message GeneratedCodeInfo message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IGeneratedCodeInfo,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a GeneratedCodeInfo message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns GeneratedCodeInfo
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): google.protobuf.GeneratedCodeInfo;

      /**
       * Decodes a GeneratedCodeInfo message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns GeneratedCodeInfo
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): google.protobuf.GeneratedCodeInfo;

      /**
       * Verifies a GeneratedCodeInfo message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a GeneratedCodeInfo message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns GeneratedCodeInfo
       */
      public static fromObject(object: {
        [k: string]: any;
      }): google.protobuf.GeneratedCodeInfo;

      /**
       * Creates a plain object from a GeneratedCodeInfo message. Also converts values to other types if specified.
       * @param message GeneratedCodeInfo
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.GeneratedCodeInfo,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this GeneratedCodeInfo to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };
    }

    namespace GeneratedCodeInfo {
      /** Properties of an Annotation. */
      interface IAnnotation {
        /** Annotation path */
        path?: number[] | null;

        /** Annotation sourceFile */
        sourceFile?: string | null;

        /** Annotation begin */
        begin?: number | null;

        /** Annotation end */
        end?: number | null;
      }

      /** Represents an Annotation. */
      class Annotation implements IAnnotation {
        /**
         * Constructs a new Annotation.
         * @param [properties] Properties to set
         */
        constructor(properties?: google.protobuf.GeneratedCodeInfo.IAnnotation);

        /** Annotation path. */
        public path: number[];

        /** Annotation sourceFile. */
        public sourceFile: string;

        /** Annotation begin. */
        public begin: number;

        /** Annotation end. */
        public end: number;

        /**
         * Creates a new Annotation instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Annotation instance
         */
        public static create(
          properties?: google.protobuf.GeneratedCodeInfo.IAnnotation,
        ): google.protobuf.GeneratedCodeInfo.Annotation;

        /**
         * Encodes the specified Annotation message. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.Annotation.verify|verify} messages.
         * @param message Annotation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: google.protobuf.GeneratedCodeInfo.IAnnotation,
          writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Encodes the specified Annotation message, length delimited. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.Annotation.verify|verify} messages.
         * @param message Annotation message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: google.protobuf.GeneratedCodeInfo.IAnnotation,
          writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes an Annotation message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Annotation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number,
        ): google.protobuf.GeneratedCodeInfo.Annotation;

        /**
         * Decodes an Annotation message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Annotation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array,
        ): google.protobuf.GeneratedCodeInfo.Annotation;

        /**
         * Verifies an Annotation message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates an Annotation message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Annotation
         */
        public static fromObject(object: {
          [k: string]: any;
        }): google.protobuf.GeneratedCodeInfo.Annotation;

        /**
         * Creates a plain object from an Annotation message. Also converts values to other types if specified.
         * @param message Annotation
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: google.protobuf.GeneratedCodeInfo.Annotation,
          options?: $protobuf.IConversionOptions,
        ): { [k: string]: any };

        /**
         * Converts this Annotation to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
      }
    }
  }
}
