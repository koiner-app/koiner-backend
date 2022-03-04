import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export abstract class EntityBaseSchema {
  constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @PrimaryColumn({ update: false })
  readonly id: string;

  @CreateDateColumn({ type: 'timestamp', update: false })
  readonly created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  readonly updated_at: Date;
}
