import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseModel extends BaseEntity {
	@CreateDateColumn({ type: 'timestamp', name: 'create_at' })
	createAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
	updateAt: Date;

}